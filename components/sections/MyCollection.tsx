import { Box, SimpleGrid } from "@chakra-ui/react";
import Image from "next/image";
import CollectionItem from "../utils/CollectionItem";
import MyCollectionHeader from "../utils/MyCollectionHeader";

import cssLogo from "../../public/logos/css_logo.png";
import djangoLogo from "../../public/logos/django_logo.png";
import gitLogo from "../../public/logos/git_logo.png";
import htmlLogo from "../../public/logos/html_logo.png";
import kerasLogo from "../../public/logos/keras_logo.png";
import linuxLogo from "../../public/logos/linux_logo.png";
import matlabLogo from "../../public/logos/matlab_logo.png";
import mongoLogo from "../../public/logos/mongo_logo.png";
import nodeLogo from "../../public/logos/node_logo.png";
import pandasLogo from "../../public/logos/pandas_logo.png";
import phpLogo from "../../public/logos/php_logo.png";
import postgresLogo from "../../public/logos/postgres_logo.png";
import pythonLogo from "../../public/logos/python_logo.png";
import tensorLogo from "../../public/logos/tensor_logo.png";
import vueLogo from "../../public/logos/vue_logo.png";

interface Props {
  title: string;
  subtitle?: string;
}

const MyCollection: React.FC<Props> = ({ subtitle, title }) => {
  return (
    <>
      <MyCollectionHeader subtitle={subtitle} title={title} />
      <Box paddingX={[2, 8, 48, 64]} paddingTop={12}>
        <SimpleGrid columns={[2, 2, 2, 3, 4]} gap={4} rowGap={16}>
          <CollectionItem
            confidence="confident"
            description="I am really confident in Vue.js and I can pull of big-scaled projects with our without team collab. I am quite fluent in it. To see an example, you can refer to the Admin-App, which is a component of the software Project Nisaba."
            name="Vue.js"
          >
            <Image
              src={vueLogo}
              width={150}
              height={130}
              layout="responsive"
              alt="Logo of Vue.js"
            />
          </CollectionItem>
          <CollectionItem
            confidence="satisfactory"
            description="I use Ubuntu as my main operating system, because it is particularly handy for server connections and development in general. It also helps me keep focused and prevents me from playing computer games."
            name="Linux"
          >
            <Image
              src={linuxLogo}
              width={150}
              height={150}
              layout="responsive"
              alt="Logo of Linux (the penguin)"
            />
          </CollectionItem>
          <CollectionItem
            confidence="confident"
            description="I actively use git on a regular basis for basically anything that i develop -- this website too, for example."
            name="git"
          >
            <Image
              src={gitLogo}
              width={150}
              height={150}
              layout="responsive"
              alt="Logo of git"
            />
          </CollectionItem>
          <CollectionItem
            confidence="confident"
            description="I've used and currently using HTML in numerous projects."
            name="HTML"
          >
            <Image
              src={htmlLogo}
              width={150}
              height={150}
              layout="responsive"
              alt="Logo of HTML"
            />
          </CollectionItem>
          <CollectionItem
            confidence="confident"
            description="I feel I have a generally satisfactory knowledge of CSS, since i've used it in numerous projects and actively use it."
            name="CSS"
          >
            <Image
              src={cssLogo}
              width={150}
              height={150}
              layout="responsive"
              alt="Logo of CSS"
            />
          </CollectionItem>
          <CollectionItem
            confidence="confident"
            description="Node.js is my weapon of choice when it comes to writing handy scripts (yes, I actually usually prefer it over Python) and back-ends."
            name="Node.js"
          >
            <Image
              src={nodeLogo}
              width={150}
              height={150}
              layout="responsive"
              alt="Logo of Node.js"
            />
          </CollectionItem>
          <CollectionItem
            confidence="confident"
            description="I enjoy using SQL in every possible project."
            name="SQL"
          >
            <Image
              src={postgresLogo}
              width={150}
              height={150}
              layout="responsive"
              alt="Logo of django"
            />
          </CollectionItem>
          <CollectionItem
            confidence="satisfactory"
            description="I actively used django for my job at RWTH-Uniklinik, where i helped record the data of the subjects in our database and create a small API for our three experiments."
            name="django"
          >
            <Image
              src={djangoLogo}
              width={150}
              height={150}
              layout="responsive"
              alt="Logo of django"
            />
          </CollectionItem>
          <CollectionItem
            confidence="confident"
            description="I actively used MATLAB for implementing psychological experiments and data processing for my job at RWTH-Uniklinik."
            name="Matlab"
          >
            <Image
              src={matlabLogo}
              width={150}
              height={135}
              layout="responsive"
              alt="Logo of Matlab"
            />
          </CollectionItem>
          <CollectionItem
            leftMarginInPx={78}
            confidence="confident"
            description="I am using MongoDB for some personal projects, and Amazon DynamoDB at Nisaba. I occasionally prefer NoSQL over SQL because it offers many additional functionalities such as text queries, and I like their query builders."
            name="NoSQL"
          >
            <Image
              src={mongoLogo}
              width={72}
              height={150}
              layout="fixed"
              alt="Logo of MongoDB"
            />
          </CollectionItem>
          <CollectionItem
            confidence="satisfactory"
            description="I actively used pandas for data processing purposes for my job at RWTH-Uniklinik. I am also willing to use it for creating my first recommender system."
            name="pandas"
          >
            <Image
              src={pandasLogo}
              width={150}
              height={150}
              layout="responsive"
              alt="Logo of Pandas"
            />
          </CollectionItem>
          <CollectionItem
            confidence="satisfactory"
            description='I am affiliated to php, since i help the development of the intern dormitory "app" ESGIntern of ESG Aachen. I am also exposed it quite often at my job at m3connect. I have a general understanding of php. It would take me a lot of time to create a project from scratch, but if there is an existing project, i could contribute with ease.'
            name="php"
          >
            <Image
              src={phpLogo}
              width={150}
              height={78}
              layout="responsive"
              alt="Logo of php"
            />
          </CollectionItem>
          <CollectionItem
            confidence="confident"
            description="I actively used Python for data processing purposes for my job at RWTH-Uniklinik. Also, at my job at m3connect, I sometimes develop intern tools for automating things, for example time tracking, or batch file generation etc."
            name="Python"
          >
            <Image
              src={pythonLogo}
              width={150}
              height={150}
              layout="responsive"
              alt="Logo of Python"
            />
          </CollectionItem>
          <CollectionItem
            confidence="learning"
            description="I am really looking forward to get a good grasp of deep learning. I am currently particularly interested in building my first own recommender system."
            name="TensorFlow"
          >
            <Image
              src={tensorLogo}
              width={150}
              height={150}
              layout="responsive"
              alt="Logo of TensorFlow"
            />
          </CollectionItem>
          <CollectionItem
            confidence="learning"
            description="I am really looking forward to get a good grasp of deep learning. I am currently particularly interested in building my first own recommender system."
            name="Keras"
          >
            <Image
              src={kerasLogo}
              width={150}
              height={150}
              layout="responsive"
              alt="Logo of Keras"
            />
          </CollectionItem>
        </SimpleGrid>
      </Box>
    </>
  );
};

export default MyCollection;
