import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
  description: string;
  title: string;
  learnMoreLink?: string;
  tryLink?: string;
}

const ProjectCard: React.FC<Props> = ({
  children,
  description,
  learnMoreLink,
  title,
  tryLink,
}) => {
  return (
    <Box backgroundColor="gray.700" borderBottomRadius={12}>
      <Box margin={4} padding={4} backgroundColor="white">
        {children}
      </Box>
      <VStack paddingX={4} paddingBottom={4} height="full">
        <Box>
          <Text width="full" as="h3" fontSize="3xl" fontWeight="bold">
            {title}
          </Text>
          <Text as="p" fontSize="sm">
            {description}
          </Text>
        </Box>
        <Flex width="full" justify="space-between">
          {learnMoreLink && (
            <a href={learnMoreLink} target="_blank" rel="noreferrer">
              <Button
                rightIcon={<ExternalLinkIcon />}
                colorScheme="green"
                marginRight={2}
              >
                Learn more
              </Button>
            </a>
          )}
          {tryLink && (
            <a href={tryLink} target="_blank" rel="noreferrer">
              <Button rightIcon={<ExternalLinkIcon />} colorScheme="orange">
                Try
              </Button>
            </a>
          )}
        </Flex>
      </VStack>
    </Box>
  );
};

export default ProjectCard;
