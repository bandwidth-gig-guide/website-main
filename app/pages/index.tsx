import Head from "next/head"

const routes = [
  { href: "/event", label: "Event" },
  { href: "/artist", label: "Artist" },
  { href: "/venue", label: "Venue" },
];

const Home = () => {
  return (
    <>
      <Head>
        <title>Bandwidth</title>
        <meta name="description" content="Welcome to my website" />
      </Head>

      <div>
        <h1>Home</h1>
      </div>
    </>
  );
};

export default Home;
