---
author: Ahmet Polat
pubDatetime: 2023-03-05T21:01:52.737Z
title: "Write an Email Microservice: Localized, Automated, Scalable & Testable"
postSlug: write-an-email-microservice
featured: true
draft: false
tags:
  - NestJS
  - microservices
  - localization
  - Handlebars
description:
  Learn the general requirements for an email microservice and modularly ship it
  into your existing system. Covering localization, templating and personalization.
---

## TL;DR

Use NestJS with Redis, Handlebars and Joi to create a microservice.

Employ two rounds of template resolution: the first for localization and the second for personalization. Find the source code on [GitHub](https://github.com/apolat2000/mail-microservice).

## Table of contents

## Requirements for the Microservice

Below is my list of requirements for an email microservice.

### Business Logic Requirements

#### **Personalized**

##### **"Emails should be sent with the recipient's name."**

Well, in a real-world setting, your boss will very probably be at least 30+ years of age and like the idea of addressing the clients by their first names. I can imagine why people tend to believe that this is a good idea. After all, when writing a heartfelt letter to a friend, we write their names. It is supposed to bear the meaning that we care about the person. But let's be honest. Neither are the clients our friends, nor do they like us. We literally just caused an extra unwanted email in their mailbox. And we are one of the many companies that do the same. At this point, it has become the norm.

> [Some smart people who realized this](https://www.trymaverick.com) have even brought this further by founding a startup for generating deepfake videos of some employee of the company heartfully thanking the customer Adam, 张伟, محمد or Lisa for buying an extra pair of shoes, or a t-shirt, using the same video.
>
> So, overall, we want to ensure that our email microservice is capable of this and that your boss will be content.

##### User's Interests

Understandably. Entertain your users with relevant stuff.

##### **Localized**

Localization falls under the personalization umbrella. Visiting a website with `en` set as my accepted language in the browser but still getting the content in German gives me a feeling of personal addressing. Besides this "caring" feeling, localizing is also crucial for many users since [40% of the world's population can speak only one language](https://www.researchgate.net/figure/Percentage-of-Monolingual-Bilingual-and-Multilingual-Websites-a-Non-English-Speaking_fig2_340868171). We don't want to miss out on them.

#### **Automated**

In some emails, we need workflow-relevant actions from the user (e. g. verifying email address). Therefore, email sending should be **triggerable by other services** in the system.

Another type of automation is the ability to send emails in bulk. For example, we want to send weekly recommendations to the users who opted in. Another example of different nature is when a new product is released, and we want to make our users now. The difference is that the prior is a trıggered, while the latter is **scheduled**. We want to allow both.

#### **Manually Triggerable**

Automation won't cover all cases. Sometimes, we want to send an email following an incident that is not part of any existing workflow. For example, we might fall victim to a data breach and need to notify our users. Make sure that the email microservice is also capable of this.

### Development Requirements

#### **Scalable**

This is why we are designing it as a microservice.

#### **Testable**

Before we send the emails in production, we want to ensure they are correct. To do this, we will need a **preview logic**.

#### **Modular**

Email is an essential component of many systems. We want to reuse this with minimal effort. Therefore, we make it generic & modular.

#### **Enjoyable**

There is not much I can do about this. It really depends on you. I hope you like what you are doing.

## Concept

In our microservice, we will have only one relevant controller function for the business logic. This function will handle the requests for mail sending. It will take the following parameters:

- `attachments`: The attachments of the email.
- `context`: Key-value couples that will be passed into the email template.
- `locale`: The abbreviation of the language of the email.
- `recipients`: Email addresses to send to.
- `type`: Determines which template will be used for the email.

The microservice will contain several templates for different types of emails. For each template, When a request comes in, the controller will decide which language to use for the email. This decision is made simply by using a fallback logic if the locale from the request object is not supported for the given email type. With the context dictionary of the decided language, the template will be rendered and saved as an intermediate value. Then, the actual context from the request object will be used to render the intermediate template for a final result. This final result with the attachments will be sent to the recipients.

## Realization

### Tech Stack

We use [Redis Pub/Sub](https://redis.io/docs/manual/pubsub) and let the microservice subscribe to messages from outside. The microservice itself is written in [NestJS](https://nestjs.com) and uses [Handlebars](https://handlebarsjs.com) for templating. [Joi](https://joi.dev) is used for validation.

### Code Structure

The `/src/` file of the microservice has the following structure:

- `constants/...`
- `dto/...`: Contains the TypeScript interfaces for DTOs.
- `pipes/...`: Contains the custom pipes for validation.
- `schemas/...`: Contains the Joi schemas for validation.
- `templates/`
  - `TEMPLATE_1/`
    - `dict/`
      - `en.json`
      - `de.json`
    - `content.hbs`
  - `TEMPLATE_2/...`
- `mail.controller.ts`
- `mail.module.ts`
- `mail.service.ts`
- `main.ts`: The entry point of the microservice.

Below is the workflow for the calculation of the email's body.

![The workflow for the calculation of the mail's body.](https://res.cloudinary.com/dgbreyevx/image/upload/v1678033744/workflow_rubv8j.png)

In the diagram, we see the two service functions `i18nResolver` and `contextResolver` as given below:

```ts
// mail.service.ts
import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { readFile } from "fs/promises";
import { compile } from "handlebars";
import * as path from "path";
import { MailType } from "./constants/mail_type.enum";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  i18nResolver = async (
    type: MailType,
    locale: string,
    target: "subject" | "content"
  ): Promise<string> => {
    try {
      let dictRaw;
      try {
        dictRaw = await readFile(
          path.join(
            process.cwd(),
            `/src/templates/${type}/dict/${locale}.json`
          ),
          "utf8"
        );
      } catch {
        dictRaw = await readFile(
          path.join(process.cwd(), `/src/${type}/dict/en.json`),
          "utf8"
        );
      }
      if (!dictRaw) return null;
      const dict = JSON.parse(dictRaw);
      if (target === "subject") return dict["subject"];
      const templateFile = await readFile(
        path.join(process.cwd(), `/src/templates/${type}/content.hbs`),
        "utf8"
      );
      const template = compile(templateFile);
      return template(dict["content"]);
    } catch {
      return null;
    }
  };

  contextResolver = async (
    input: string,
    type: MailType,
    context: Record<string, string>
  ) => {
    if (!context["locale"]) context["locale"] = "en";
    try {
      return compile(input)(context);
    } catch {
      return null;
    }
  };

  async sendMail(
    recipients: string[],
    type: MailType,
    subjectText: string,
    contentText: string,
    attachments: {
      filename: string;
      content: string;
      cid: string;
      encoding: string;
    }[]
  ): Promise<[boolean, Error]> {
    try {
      await this.mailerService.sendMail({
        to: recipients,
        from: `postmaster@${process.env.MAILGUN_DOMAIN}`,
        subject: subjectText,
        html: contentText,
        attachments,
      });
      return [true, null];
    } catch (error) {
      return [false, error];
    }
  }
}
```

The `sendMail` service function is where the mail is actually sent. This function can be integrated with the mail service of your choice. In our case, we use [Mailgun](https://www.mailgun.com).

The flow from the diagram is realized in the function `sendMail` given below in the microservice's controller:

```ts
// mail.controller.ts
import { Controller, UsePipes } from "@nestjs/common";
import { MessagePattern, RpcException } from "@nestjs/microservices";
import { MailService } from "./mail.service";
import { JoiValidationPipe } from "./pipes/mail.pipe.joi";
import { mailSendDtoSchema } from "./schemas/mail.schema.send";
import { MailSendDto } from "./dto/mail.dto.send";
import { ContextIntegrityPipe } from "./pipes/mail.pipe.ctx_integrity";

@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @MessagePattern({ role: "mail", cmd: "is-alive" })
  getHello() {
    return true;
  }

  @MessagePattern({ role: "mail", cmd: "send" })
  @UsePipes(new ContextIntegrityPipe())
  @UsePipes(new JoiValidationPipe(mailSendDtoSchema))
  async sendMail({
    type,
    recipients,
    context,
    locale = "en",
    attachments,
  }: MailSendDto): Promise<boolean> {
    const contentI18nResolved = await this.mailService.i18nResolver(
      type,
      locale,
      "content"
    );
    if (!contentI18nResolved) {
      throw new RpcException(
        `No content found for type ${type} and locale ${locale}`
      );
    }

    const content = await this.mailService.contextResolver(
      contentI18nResolved,
      type,
      context
    );
    if (!content) {
      throw new RpcException(
        `Context didn't resolve for type ${type} and locale ${locale}`
      );
    }

    const subjectI18nResolved = await this.mailService.i18nResolver(
      type,
      locale,
      "subject"
    );
    if (!subjectI18nResolved) {
      throw new RpcException(
        `No subject found for type ${type} and locale ${locale}`
      );
    }
    const subject = await this.mailService.contextResolver(
      subjectI18nResolved,
      type,
      context
    );

    if (!subject) {
      throw new RpcException(
        `Context didn't resolve for type ${type} and locale ${locale}`
      );
    }

    const [success, error] = await this.mailService.sendMail(
      recipients,
      type,
      subject,
      content,
      attachments.map(a => ({ ...a, encoding: "base64" }))
    );
    if (!success) throw new RpcException(error);

    return true;
  }
}
```

The decorators of `sendMail` for validation are given below:

```ts
// pipes/mail.pipe.joi.ts
import { PipeTransform, Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { ObjectSchema } from "joi";

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any) {
    const { error } = this.schema.validate(value);
    if (error) throw new RpcException("Validation failed");
    return value;
  }
}
```

```ts
// pipes/mail.pipe.ctx_integrity.ts
import { PipeTransform, Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { contextKeys } from "../constants/context_keys.record";
import { MailSendDto } from "../dto/mail.dto.send";

@Injectable()
export class ContextIntegrityPipe implements PipeTransform {
  transform(value: MailSendDto) {
    const { context, type } = value;
    const contextKeysOfThisType = contextKeys[type];
    for (const key of Object.keys(context)) {
      if (!contextKeysOfThisType.includes(key)) {
        delete context[key];
      }
    }
    for (const key of contextKeysOfThisType) {
      if (!Object.keys(context).includes(key)) {
        throw new RpcException(`Key ${key} is missing in subject payload`);
      }
    }
    return value;
  }
}
```

Thus far, the functionality highly relies on the assumption that the files in the templates folder are uniform and structurally correct. Our throughput rate will be affected if we fail to satisfy this assumption. We can improve this by making it possible to test the folder and JSON structures. We can do this by adding a test file `mail.templates.spec.ts` in `src/`:

```ts
// mail.templates.spec.ts
import { existsSync, readdirSync } from "fs";
import { join } from "path";
import { Locale } from "./constants/locale.enum";
import { MailType } from "./constants/mail_type.enum";

describe("templates directory", () => {
  let templateFolders = readdirSync(join(__dirname, "templates"));
  templateFolders = templateFolders.filter(
    folder => !folder.startsWith("TEST_")
  );
  const mailTypes = Object.values(MailType);
  const locales = Object.values(Locale);

  it("should exist", () => {
    expect(existsSync(join(__dirname, "templates"))).toBeTruthy();
  });

  // Bijection between mail types and folder names under templates
  it("Mail types include template folders", () => {
    for (const folder of templateFolders) {
      expect(mailTypes.includes(folder as MailType)).toBeTruthy();
    }
  });
  it("Template folders include mail types", () => {
    for (const mailType of mailTypes) {
      expect(templateFolders.includes(mailType)).toBeTruthy();
    }
  });
  it("Template folders all have the expected structure", () => {
    /*
     * - dict
     *  \_ [locale in locales].json
     * - content.hbs
     */
    for (const folder of templateFolders) {
      expect(
        existsSync(join(__dirname, "templates", folder, "content.hbs"))
      ).toBeTruthy();
      expect(
        existsSync(join(__dirname, "templates", folder, "dict"))
      ).toBeTruthy();
      const dictFiles = readdirSync(
        join(__dirname, "templates", folder, "dict")
      );
      for (const dictFile of dictFiles) {
        expect(dictFile.endsWith(".json")).toBeTruthy();
        const locale = dictFile.split(".")[0] as Locale;
        expect(locales.includes(locale)).toBeTruthy();
      }
      for (const locale of locales) {
        expect(dictFiles.includes(`${locale}.json`)).toBeTruthy();
      }
    }
  });
  it("All .json files under template/ have the correct structure", () => {
    for (const folder of templateFolders) {
      const dictFiles = readdirSync(
        join(__dirname, "templates", folder, "dict")
      );
      for (const dictFile of dictFiles) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const dict = require(join(
          __dirname,
          "templates",
          folder,
          "dict",
          dictFile
        ));
        expect(dict).toHaveProperty("subject");
        expect(dict).toHaveProperty("content");
        expect(typeof dict.subject).toBe("string");
        expect(typeof dict.content).toBe("object");
        // Expect it to have no other property
        expect(Object.keys(dict).length).toBe(2);
      }
    }
  });
});
```

Now, when we run `yarn test` and see that `mail.templates.spec.ts` fails, we can be sure that the templates folder is not in the correct structure.

## Conclusion

This microservice can be expanded to maintain statistics about the emails sent and allow sending mails without templates. This would allow us to manually resend the emails that failed for some reason by looking into the template that was meant, the context from the request object and the recipients' list.

If you feel like you can improve [this microservice](https://github.com/apolat2000/mail-microservice), feel free to fork it and send a pull request.
