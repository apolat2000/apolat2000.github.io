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
        'I worked at m3connect as a "working student". I was in the software team and we developed back-end, devops and highly generic client-side solutions on an agile basis.',
      dateText: "August 2021 - November 2022",
      image: <Image src={m3Image} alt="Logo of m3connect." />,
      imgPaddingY: 4,
    },
    {
      id: 1,
      description:
        "I worked in the psychiatry clinic as a general-purpose IT person. I did mainly web development and data processing. My work also involved reading & understanding and acting on some papers on the field.",
      dateText: "April 2020 - April 2021",
      image: (
        <Image src={uniklinikImage} alt="Logo of Uniklinik RWTH Aachen." />
      ),
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