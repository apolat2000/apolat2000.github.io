import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import Image from "next/image";
import ProjectCard from "../utils/ProjectCard";
import nisabaImage from "../../public/project-images/_nisaba.png";
import m3Image from "../../public/project-images/m3connect.png";
import uniklinikImage from "../../public/project-images/uniklinik.svg";
import dynamicGraphExplorationImage from "../../public/project-images/dynamic-graph-exploration.png";
import threeDGridSceneImage from "../../public/project-images/3d-grid-scene.png";
import researchImage from "../../public/project-images/research.png";

interface Props {
  title: string;
  description?: string;
}

const MyProjects: React.FC<Props> = ({ title, description }) => {
  return (
    <Box paddingX={[4, 8, 32, 48]} paddingTop={12}>
      <Text as="h2" fontSize="4xl" textTransform="uppercase">
        {title}
      </Text>
      {description && (
        <Text as="p" fontSize="md">
          {description}
        </Text>
      )}
      <SimpleGrid columns={[1, 2, 2, 3]} gap={4}>
        <ProjectCard
          title="Nisaba"
          description="A SaaS with the target group as the organizations that help certain communities for the improvement of their life communities, i.e. development collaboration (aid). It is open source. I am the (honorary) tech lead and also develop the 'Admin-App'. Nisaba is currently used by 3 different organizations in Ruanda, Malawi and Bolivia."
          learnMoreLink="https://www.linkedin.com/company/nisaba-by-aktion-sodis/"
          tryLink="https://eloquent-euler-24a677.netlify.app/"
        >
          <Image
            src={nisabaImage}
            alt="Logo of the SaaS 'Nisaba by Aktion Sodis'."
            layout="responsive"
            width="256"
            height="158"
          />
        </ProjectCard>
        <ProjectCard
          title="m3connect"
          description="I work here as a 'working student' since August 2021. I am in the software team and we develop back-end, devops and highly generic client-side solutions."
          learnMoreLink="https://www.m3connect.de/"
        >
          <Image
            src={m3Image}
            alt="Logo of m3connect."
            layout="responsive"
            width="256"
            height="152"
          />
        </ProjectCard>
        <ProjectCard
          title="RWTH Uniklinik"
          description="I worked at the 'Klinik für Psychiatrie, Psychosomatik und Psychotherapie des Kindes- und Jugendalters' between 04/2020-04/2021 as a general-purpose IT guy. I did mainly front-end web development and data processing."
          learnMoreLink="https://www.ukaachen.de/en/clinics-institutes/klinik-fuer-psychiatrie-psychosomatik-und-psychotherapie-des-kindes-und-jugendalters/"
        >
          <Image
            src={uniklinikImage}
            alt="Logo of Uniklinik RWTH Aachen."
            width="256"
            height="72"
            layout="responsive"
          />
        </ProjectCard>
        <ProjectCard
          title="Dynamic Graph Exploration"
          description="A Web tool for exploring the Web dynamically and immersively. It is open source. If you want to try this and you are on phone, you will need VR glasses with one button (for example Google Cardboard)."
          tryLink="https://elegant-knuth-6a6b98.netlify.app/"
          learnMoreLink="https://www.linkedin.com/posts/ahmet-polat-profile_rwth-science-egocentrism-activity-6901555859835412481-KK3E?utm_source=linkedin_share&utm_medium=member_desktop_web"
        >
          <Image
            src={dynamicGraphExplorationImage}
            alt="An image from the web tool for exploring dynamic graphs egocentrically."
            width="256"
            height="256"
            layout="responsive"
          />
        </ProjectCard>
        <ProjectCard
          title="3-D Grid Scene"
          description="A 3-D scene where you can create objects, move, rotate or delete them."
          tryLink="https://apolat2000.github.io/3d-grid-scene/"
          learnMoreLink="https://github.com/apolat2000/3d-grid-scene#readme"
        >
          <Image
            src={threeDGridSceneImage}
            alt="An image from a web tool for manipulating 3-D objects on a grid scene."
            width="256"
            height="158"
            layout="responsive"
          />
        </ProjectCard>
        <ProjectCard
          title="Research"
          description='I wrote two research papers throughout my studies at RWTH Aachen University (Computer Science B. Sc.). They have the titles "A Review on Music Structure Analysis Methods
          Concerning Music Genres" and "Egocentric Exploratory Interfaces and Dynamic Network Visualization". I am not sure whether I am allowed to publish them by myself, so I will not put the papers here.'
        >
          <Image
            src={researchImage}
            alt="A collage of two research papers put on each other."
            width="256"
            height="256"
            layout="responsive"
          />
        </ProjectCard>
      </SimpleGrid>
    </Box>
  );
};

export default MyProjects;
