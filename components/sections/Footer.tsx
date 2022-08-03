import { Image, Text, VStack } from "@chakra-ui/react";
// import Image from "next/image";
import linLogo from "../../public/lin_logo.png";

interface Props {}

const Footer: React.FC<Props> = ({}) => {
  return (
    <VStack paddingX={[2, 8, 32, 48]} paddingTop={32}>
      <VStack
        borderTopWidth={1}
        borderColor="gray.600"
        width="full"
        paddingTop={4}
      >
        <Text as="h2" fontSize="2xl" align="center">
          I would like to get to know you. How about a coffee? Reach me via
          LinkedIn.
        </Text>
        <a
          href="https://www.linkedin.com/in/ahmet-polat-profile/"
          target="_blank"
          rel="noreferrer"
        >
          <Text as="h2" fontSize="5xl">
            ☕ 🥐
          </Text>
        </a>
        <a
          href="https://www.linkedin.com/in/ahmet-polat-profile/"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src={"/lin_logo.png"}
            width="48px"
            height="48px"
            alt="Logo of LinkedIn"
          />
        </a>
      </VStack>
      <Text fontSize="smaller" paddingBottom={2}>
        2022
      </Text>
    </VStack>
  );
};

export default Footer;
