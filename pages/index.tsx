import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/sections/Footer";
import Header from "../components/sections/Header";
import MyCollection from "../components/sections/MyCollection";
import MyProjects from "../components/sections/MyProjects";
import WhoIAm from "../components/sections/WhoIAm";

const Home: NextPage = () => {
  return (
    <Box color="white" backgroundColor="#181a1b">
      <Head>
        <title>Ahmet Polat | The Portfolio</title>
        <meta
          name="description"
          content="Ahmet Polat software developer portfolio"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header welcomeMessage="Hi! Glad you are here." />
      <WhoIAm
        title="Who I Am"
        description="I am Ahmet Polat, I love programming, languages, tabletop games and jazz. Currently, I am studying Computer
        Science B. Sc. at RWTH Aachen University. I enjoy building things and sharing it with others."
      />
      <MyProjects title="Projects & Occupations" />
      <MyCollection title="My Collection" subtitle="I like expanding it." />
      <Footer />
    </Box>
  );
};

export default Home;