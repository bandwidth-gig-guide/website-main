import Link from "next/link";

const routes = [
  { href: "/event", label: "Event" },
  { href: "/artist", label: "Artist" },
  { href: "/venue", label: "Venue" },
];

const Home = () => {

  return (
    <div>
      <h1>Home</h1>
      <ul>
        {routes.map(route => (
          <li key={route.label} >
            <Link href={route.href}>{route.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
