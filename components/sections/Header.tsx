import {
  Box,
  Center,
  Image,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";

interface Props {
  welcomeMessage: string;
}

const Header: React.FC<Props> = ({ welcomeMessage }) => {
  return (
    <Center
      style={{
        height: "calc(100vh - 100px)",
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
          backgroundColor="#656c71"
          color="white"
          fontWeight="bold"
          userSelect="none"
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
              src="/github_logo.png"
              width="32px"
              height="32px"
              alt="GitHub logo"
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
              src="/lin_logo.png"
              width="32px"
              height="32px"
              alt="LinkedIn logo"
            />
          </a>
        </Box>
      </VStack>
    </Center>
  );
};

export default Header;
