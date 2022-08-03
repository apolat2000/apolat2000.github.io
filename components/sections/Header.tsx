import {
  Box,
  Center,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import githubLogo from "../../public/github_logo.png";
import linLogo from "../../public/lin_logo.png";

interface Props {
  welcomeMessage: string;
}

const Header: React.FC<Props> = ({ welcomeMessage }) => {
  const left = useBreakpointValue(
    {
      base: 25,
      md: 50,
    },
    {
      fallback: "md",
    }
  ) as number;

  return (
    <Center
      style={{
        height: "calc(100vh + 100px)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: "url(/head-background.jpg)",
      }}
      textAlign="center"
      position="relative"
      paddingX={[8, 16, 32, 48]}
    >
      <Box>
        <Text
          as="h1"
          fontSize="5xl"
          textTransform="uppercase"
          backgroundColor="#b3b3b3"
          color="black"
          fontWeight="bold"
        >
          {welcomeMessage}
        </Text>
      </Box>
      <VStack position="absolute" top={4} right={4}>
        <Box width="32px" height="32px" marginBottom={2}>
          <a
            href="https://github.com/apolat2000"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src={githubLogo}
              width="32"
              height="32"
              alt="GitHub logo"
              layout="responsive"
            />
          </a>
        </Box>
        <Box width="32px" height="32px">
          <a
            href="https://www.linkedin.com/in/ahmet-polat-profile/"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src={linLogo}
              width="32"
              height="32"
              alt="LinkedIn logo"
              layout="responsive"
            />
          </a>
        </Box>
      </VStack>
    </Center>
  );
};

export default Header;
