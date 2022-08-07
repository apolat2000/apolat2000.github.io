import {
  Box,
  Flex,
  SimpleGrid,
  Text,
  useBreakpoint,
  useBreakpointValue,
} from "@chakra-ui/react";
import ExperienceItem from "../utils/ExperienceItem";

import nisabaImage from "../../public/project-images/_nisaba.png";
import m3Image from "../../public/project-images/m3connect.png";
import uniklinikImage from "../../public/project-images/uniklinik.svg";
import dynamicGraphExplorationImage from "../../public/project-images/dynamic-graph-exploration.png";
import researchImage from "../../public/project-images/research.png";
import Image from "next/image";

interface Props {
  title: string;
  description?: string;
}

interface Experience {
  id: number;
  description: string;
  dateText: string;
  image: React.ReactNode;
  imgPaddingX?: number;
  imgPaddingY?: number;
}

const WorkingExperience: React.FC<Props> = ({ title, description }) => {
  const isSmallScreen = useBreakpointValue<boolean>(
    {
      sm: true,
      base: true,
      md: false,
      lg: false,
      xl: false,
      "2xl": false,
    },
    { fallback: "md" }
  );

  const experiences: Experience[] = [
    {
      id: 0,
      description:
        'I work at m3connect as a "working student". I am in the software team and we develop back-end, devops and highly generic client-side solutions.',
      dateText: "August 2021 - Present",
      image: (
        <Image
          src="/project-images/m3connect.png"
          layout="fixed"
          width="256"
          height="72"
          alt="Logo of m3connect."
        />
      ),
    },
    {
      id: 1,
      description:
        "I worked at the 'Klinik für Psychiatrie, Psychosomatik und Psychotherapie des Kindes- und Jugendalters' between 04/2020-04/2021 as a general-purpose IT guy. I did mainly front-end web development and data processing.",
      dateText: "April 2020 - April 2021",
      image: (
        <Image
          src="/project-images/uniklinik.svg"
          layout="fixed"
          width="185"
          height="52"
          alt="Logo of Uniklinik RWTH Aachen."
        />
      ),
      imgPaddingX: 4,
      imgPaddingY: 3,
    },
  ];

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
      <Box height="fit-content" position="relative">
        <Box
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            marginLeft: "auto",
            marginRight: "auto",
            width: "2px",
            height: "100%",
          }}
          background="gray.200"
          display={isSmallScreen ? "none" : "block"}
        />
        <SimpleGrid columns={[1, 2]}>
          {experiences
            .sort((a, b) => a.id - b.id)
            .map((experience, index) => (
              <>
                <ExperienceItem
                  imgPaddingX={experience.imgPaddingX}
                  imgPaddingY={experience.imgPaddingY}
                  key={experience.id}
                  description={experience.description}
                  dateText={experience.dateText}
                  isOnLeftSide={index % 2 === 0}
                >
                  {experience.image}
                </ExperienceItem>
                {index % 2 === 0 && !isSmallScreen && (
                  <>
                    <Box />
                    <Box />
                  </>
                )}
              </>
            ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default WorkingExperience;
