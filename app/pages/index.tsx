// React / Next
import React, { useState, useEffect } from "react"
import Head from 'next/head';

// External
import axios from "axios"
import camelcaseKeys from "camelcase-keys";

// Custom
import apiUrl from "../api.config"
import SectionHeader from "../components/SectionHeader/SectionHeader";
import CardGrid from "../components/CardGrid/CardGrid";
import { CardGridType } from "../types/enums/CardGridType";

const routes = [
  { title: "Events", route: "/event" },
  { title: "Artists", route: "/artist" },
  { title: "Venues", route: "/venue" },
  { title: "Articles" },
  { title: "Teachers" },
  { title: "Stores" },
];

const Home = () => {
  const [artistIds, setArtistIds] = useState<uuid[]>([]);
  const [venueIds, setVenueIds] = useState<uuid[]>([]);

  useEffect(() => {
    axios.get(`${apiUrl}/artist`)
         .then(response => { setArtistIds(camelcaseKeys(response.data, { deep: true }))})
         .catch(error => { console.error(error); });

    axios.get(`${apiUrl}/venue`)
         .then(response => { setVenueIds(camelcaseKeys(response.data, { deep: true }))})
         .catch(error => { console.error(error); });


  }, []);

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
