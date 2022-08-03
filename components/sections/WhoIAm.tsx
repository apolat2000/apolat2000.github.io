import { Box, Text } from "@chakra-ui/react";

interface Props {
  title: string;
  description: string;
}

const WhoIAm: React.FC<Props> = ({ title, description }) => {
  return (
    <Box paddingX={[4, 8, 32, 48]} paddingTop={12}>
      <Text as="h2" fontSize="4xl" textTransform="uppercase">
        {title}
      </Text>
      <Text as="p" fontSize="md">
        {description}
      </Text>
    </Box>
  );
};

export default WhoIAm;
