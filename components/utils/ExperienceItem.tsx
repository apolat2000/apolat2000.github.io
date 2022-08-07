import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
  description: string;
  dateText?: string;
  imgPaddingX?: number;
  imgPaddingY?: number;
  isOnLeftSide: boolean;
}

const ExperienceItem: React.FC<Props> = ({
  children,
  description,
  dateText,
  imgPaddingX,
  imgPaddingY,
  isOnLeftSide,
}) => {
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

  return (
    <Flex
      alignItems="center"
      backgroundColor="gray.700"
      borderRadius={12}
      zIndex={1}
      marginLeft={isOnLeftSide && !isSmallScreen ? 0 : 4}
      marginRight={isOnLeftSide && !isSmallScreen ? 4 : 0}
      position="relative"
      marginY={4}
    >
      {!isSmallScreen && (
        <>
          <Box
            style={{
              position: "absolute",
              left: isOnLeftSide ? undefined : "-64px",
              right: isOnLeftSide ? "-64px" : undefined,
              width: "64px",
              height: "2px",
            }}
            background="gray.200"
          />
          <Box
            style={{
              position: "absolute",
              left: isOnLeftSide ? undefined : "-80px",
              right: isOnLeftSide ? "-80px" : undefined,
              width: "16px",
              height: "2px",
            }}
            background="gray.200"
          />
          <Box
            style={{
              position: "absolute",
              left: isOnLeftSide ? undefined : "-248px",
              right: isOnLeftSide ? "-248px" : undefined,
            }}
            borderRadius={4}
            background="#363b3e"
            color="white"
            padding={2}
          >
            <Text>{dateText}</Text>
          </Box>
        </>
      )}
      <Center
        margin={2}
        backgroundColor="white"
        width="128px"
        paddingX={imgPaddingX ? imgPaddingX : 2}
        paddingY={imgPaddingY ? imgPaddingY : 0}
      >
        {children}
      </Center>
      <Center paddingY={4} paddingRight={2}>
        <Text as="p" fontSize="sm">
          {isSmallScreen && <Text>{dateText}</Text>}
          {description}
        </Text>
      </Center>
    </Flex>
  );
};

export default ExperienceItem;
