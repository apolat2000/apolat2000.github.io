---
author: Ahmet Polat
pubDatetime: 2023-05-10T19:18:00.000Z
title: "I Deleted My Users Table, Part I: Why and How"
postSlug: i-deleted-my-users-table-part-1
featured: true
draft: false
tags:
  - NestJS
  - microservices
  - clerkjs
  - psql
  - users
ogImage: ""
description: Be inspired by my reflection on whether I should manage the users of my application myself or use a third-party service.
---

## TL;DR

I decided that managing the sign-in, sign-up, and password reset processes was not worthwhile. Also, I found it to be too big of a responsibility to store personal data such as email, address and password of my users. For this purpose, I delegated the whole thing to a third-party service specialized in this, which will do a much better job regarding security and data privacy than me. I chose [Clerk](https://clerk.dev) for this purpose. In this article, you can read more about the steps needed for the migration.

## Table of contents

## Why did I create a users table in the first place?

I asked this question to myself when I realized how scary it is to manage my users' credentials. I had a users table named `user` with the usual columns in it, namely `firstName`, `lastName`, `bio`, `address`, `email`, `locale` and so on. In the same database, I had a `password` table in a one-to-one relationship with the `user` table and the passwords were encrypted. The passwords were kept in a separate table and not a column in the `user` table since I didn't want them to be picked up by `SELECT * ...` queries.

As you might have realized, this is a very naive solution and will not conform to many crucial authentication operations due to a lack of complexity. As a comparison, look at [the properties of the user object of auth0](https://auth0.com/docs/manage-users/user-accounts/user-profiles/user-profile-structure#user-profile-attributes). And assuming what they have is the right way to handle authentication, I am neither willing to implement it myself, nor be short on best practices. I am not a security expert, nor have I a security team, and I would instead focus on the features that make my application unique and my users happy with my resources instead of bikeshedding. This realization led me to search for a third-party service for outsourcing the authentication process.

After deciding to use a third-party authentication provider, the user objects that different providers curate made me reflect on my user table. The user objects that they hold and my users table had many attributes in common. I did not want to have two separate sources of truth, e. g. for `bio`, `phoneNumber` and others. Since authentication providers necessarily come with these fields, I allowed their user objects to replace mine.

I chose [Clerk](https://clerk.com/) as the provider. There is also [Auth0](https://auth0.com/), which offers 7000 monthly active users in its free tier, which is more than Clerk's 5000, but after that, Clerk's pricing is more merciful on the increasing number of users. Moreover, Clerk provides prebuilt UI components, which saves me further work.

## Possible regressions after deleting the users table

### Relations

In the same database as the `user` table, I have another table called `config` in a 1-1 relation. This table holds data regarding users' preferences, such as `preferredTheme`, or `showTutorialOnLogin`. The SQL joins will break, and the merging logic will have to be handled in the application server instead of the SQL server.

### DTO Validation

For CRUD operations such as `updateUser`, I validate whether the DTO payload has a UUID attribute `id`. I need to update this validation to comply with how the authentication provider stores the ids.

### CRUD Operations

I need to update the CRUD operations on the `user` table and turn them into network calls to the REST API endpoints of the provider (`getAllUsers`, `getUserById`, `updateUser`, `deleteUser`...).

### Full Text Search

I supported text search on my `user` table leveraging [PostgreSQL's full-text search](https://www.postgresql.org/docs/current/textsearch.html) run on an auto-generated column. Now I need to cover this search functionality on an application level.

### Time complexity

I must be careful about the time complexity of the operations I run on the user objects. For example, I ran a `SELECT * FROM user WHERE email = '...'` query to find a user by email. However, now, to get real-time information, I would need to run a `GET /users?email=...` request to the authentication provider and then filter the response on the application level. This would probably lead to a linear time complexity on top of the network call overhead and is worse than the logarithmic time complexity of an indexed SQL query.

## How did I migrate from a table

For the sake of simplicity, I will explain the steps for a simplified user microservice implemented in [NestJS](https://nestjs.com/). It has the following initial controller and service:

```ts
// user.controller.ts
import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { Config } from "./config.entity";
import { ConfigCreateDto } from "./dto/config.dto.create";
import { ConfigUpdateDto } from "./dto/config.dto.update";
import { UserService } from "./user.service";
import { User as ClerkUser } from "@clerk/clerk-sdk-node";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ role: "user", cmd: "search/config" })
  search(searchText: string) {
    return this.userService.search(searchText);
  }

  @MessagePattern({ role: "user", cmd: "update" })
  update(dto: any): Promise<ClerkUser> {
    return this.userService.update(dto);
  }

  @MessagePattern({ role: "user", cmd: "update-config" })
  updateConfig(dto: ConfigUpdateDto): Promise<Config> {
    return this.userService.updateConfig(dto);
  }

  @MessagePattern({ role: "user", cmd: "create-config" })
  createConfig(dto: ConfigCreateDto): Promise<Config> {
    return this.userService.createConfig(dto);
  }

  @MessagePattern({ role: "user", cmd: "get-by-id" })
  getById(id: string) {
    return this.userService.findOne(id);
  }

  @MessagePattern({ role: "user", cmd: "get-all" })
  getAll() {
    return this.userService.findAll();
  }

  @MessagePattern({ role: "user", cmd: "get-all-configs" })
  getAllConfigs() {
    return this.userService.findAllConfigs();
  }
}
```

```ts
// user.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Config } from "./config.entity";
import { UserUpdateDto } from "./dto/user.dto.update";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Config)
    private configsRepository: Repository<Config>
  ) {}

  search(searchText: string) {
    const query = this.usersRepository
      .createQueryBuilder("user")
      .addSelect("name_and_bio_ts");
    query.where(
      `name_and_bio_ts @@ plainto_tsquery(:searchText) ORDER BY user.id`,
      {
        searchText,
      }
    );
    return query.getMany();
  }

  async update(user: UserUpdateDto): Promise<User> {
    return this.usersRepository.save(user);
  }

  async delete(id: string): Promise<number | null> {
    return (await this.usersRepository.delete(id)).affected;
  }

  findById(id: string) {
    return this.usersRepository.findOne({
      where: { id },
      relations: ["config"],
    });
  }

  findAll() {
    return this.usersRepository.find({
      relations: ["config"],
    });
  }
}
```

I created a Clerk account and installed the SDK in my user microservice:

`yarn add @clerk/clerk-sdk-node`

I integrated it into my configuration service and instantiated it in the constructor of the `UserService` as follows:

```ts
// user.service.ts
...
import Clerk from '@clerk/clerk-sdk-node/esm/instance';
import clerkClient from '@clerk/clerk-sdk-node';
...
export class UserService {
  constructor(
    ...
    private configsRepository: Repository<Config>,
  ) {
    this.clerk = new Clerk({
      secretKey: this.configService.get<string>('CLERK.SECRET_KEY'),
    });
  }
  ...
  private clerk: typeof clerkClient;
  ...
}
```

Then I wrote a script that fetches all users in my table and calls Clerk's [CreateUser](https://clerk.com/docs/reference/backend-api/tag/Users#operation/CreateUser) endpoint for each of them to initialize them in Clerk's database, providing in the payload every attribute that Clerk supports in its schema, e. g. `first_name` and `last_name`, and passing the others such as `address` into the `public_metadata` object. In the `public_metadata` object, I also added the information on the SQL relation with the config table by adding the key `configId` and the corresponding id. In the end, for a user **John Doe** with id **6ae54147-8991-4786-a1a3-d409c92cd9e8**, I have an entry in Clerk with the same name and id `user_1GHDJS44u1wb85kDRefebM3kUXL`.

I didn't want the microservice to communicate with Clerk's API for every query, so I implemented a simple caching strategy in the `UserService` as follows:

```ts
// user.service.ts
...
import Clerk from '@clerk/clerk-sdk-node/esm/instance';
import {
  default as clerkClient,
  User as ClerkUser,
} from '@clerk/clerk-sdk-node';
import { Cron, CronExpression } from '@nestjs/schedule';
...
export class UserService {
  constructor(
    ...
    private configsRepository: Repository<Config>,
  ) {
    this.clerk = new Clerk({
      secretKey: this.configService.get<string>('CLERK.SECRET_KEY'),
    });
    this.clerk.users.getCount().then((nUsers) => {
      this.updateCacheRange(nUsers);
      this.clerk.users
        .getUserList({
          limit: nUsers,
        })
        .then((clerkUsersFromApi) => {
          this.setClerkUsers(clerkUsersFromApi);
        });
    });
  }
  ...
  private clerk: typeof clerkClient;
  private cachedClerkUsers: ClerkUser[] = [];
  ...
  @Cron(CronExpression.EVERY_10_MINUTES)
  synchronizeClerkUsers() {
    try {
      this.clerk.users.getUserList().then((clerkUsersFromApi) => {
        this.cachedClerkUsers = clerkUsersFromApi;
      });
    } catch {
      // Network fetch failed. Keep the old cache and do nothing.
    }
  }
}
```

It stores a variable `cachedClerkUsers`, which is updated regularly, and all other queries use this cached variable. E.g. the method

```ts
findById(id: string) {
  return this.usersRepository.findOne({
    where: { id },
    relations: ['config'],
  });
}
```

becomes:

```ts
findById(id: string) {
  return this.cachedClerkUsers.find((clerkUser) => clerkUser.id === id)
}
```

This query can be further improved by asking the Clerk's API directly in case the user with the given id is not found in the cache:

```ts
async findById(id: string) {
  let found = this.cachedClerkUsers.find((clerkUser) => clerkUser.id === id);
  if (!found) {
    try {
      found = await this.clerk.users.getUser(id);
    } catch {
      found = null;
    }
  }
  return found;
}
```

The existing passwords of users still require further configuration in Clerk. To read more on how you can keep users' current passwords after migration, read the [migration guide by Clerk](https://clerk.com/docs/deployments/overview).

After initializing a maintenance window, I followed these steps and introduced the changes in production.

## Conclusion

I deleted my users table because it was too big of a responsibility, and all the user flows regarding authentication are a lot of work that can be outsorced. To avoid data redundancy, I integrated Clerk's user database into the data I store and treated Clerk as a single source of truth.

Nevertheless, the caching is kept simple in this article, and I discourage the usage of such a naively implemented strategy. So, in [Part II](https://apolat2000.github.io/posts/i-deleted-my-users-table-part-2), you can read more about how I implemented a smarter cache that is cruel on memory but comforts time complexity.

What do you think about my decision? As much as I would love to hear your thoughts, I am too lazy to implement commenting and discussion support in this blog, so please tell me your thoughts as a response to [my tweet](https://twitter.com/acomathes/status/1656365976978354181).
