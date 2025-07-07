import Head from "next/head"
import SectionHeader from "../components/SectionHeader/SectionHeader";

const routes = [
  { title: "Events", route: "/event" },
  { title: "Artists", route: "/artist" },
  { title: "Venues", route: "/venue" },
  { title: "Articles" },
  { title: "Teachers" },
  { title: "Stores" },
];

const Home = () => {
  return (
    <>
      <Head>
        <title>Bandwidth</title>
        <meta name="description" content="Welcome to my website" />
      </Head>
      {routes.map(route => (
        <SectionHeader title={route.title} route={route.route || undefined} />
      ))}

    </>
  );
};

export default Home;
