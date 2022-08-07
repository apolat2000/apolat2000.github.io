import { Box, Link, Text } from "@chakra-ui/react";

interface Props {
  title: string;
  subtitle?: string;
  description?: string;
}

const MyCollectionHeader: React.FC<Props> = ({ subtitle, title }) => {
  return (
    <Box
      style={{
        padding: "25px 0",
        marginTop: "2rem",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "300px",
        textAlign: "center",
        backgroundImage: "url(/boardgame-collection.jpg)",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        zIndex: 1,
      }}
    >
      <Link
        position="absolute"
        right="1rem"
        bottom="1rem"
        href="https://www.reddit.com/r/oddlysatisfying/comments/ceb5wi/this_board_game_collection_a_friend_of_mine_has/"
        style={{
          backgroundColor: "#b3b3b3",
          color: "black",
        }}
        fontSize={["x-small", "small", "md"]}
      >
        © Reddit, u/xyloben1
      </Link>
      <Box
        style={{
          position: "absolute",
          top: "25%",
          left: "50%",
          transform: "translate(-50%,-25%)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          as="h1"
          fontSize="5xl"
          textTransform="uppercase"
          backgroundColor="#b3b3b3"
          color="black"
          fontWeight="bold"
        >
          {title}
        </Text>
        <Text
          as="h1"
          fontSize="3xl"
          backgroundColor="#b3b3b3"
          color="black"
          fontWeight="bold"
        >
          {subtitle}
        </Text>
      </Box>
    </Box>
  );
};

export default MyCollectionHeader;
