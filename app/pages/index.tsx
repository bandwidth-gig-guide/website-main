// React / Next
import React, {useState, useEffect} from "react"
import Head from 'next/head';

// External libraries
import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';

// Components
import SectionHeader from "../components/SectionHeader/SectionHeader";
import CardGrid from "../components/CardGrid/CardGrid";
import Hero from "../components/Hero/Hero"
import CardRow from "../components/CardRow/CardRow";
import EmbedsLocalScene from "../components/Embeds/EmbedsLocalScene";

// Config
import { getServicePublicApiUrl } from "../util/runtime_vars/getServicePublicApiUrl";
import { CardGridType } from "../types/enums/CardGridType";


const Home = () => {

  // State
  const [events, setEvents] = useState<uuid[]>([]);
  const [artists, setArtists] = useState<uuid[]>([]);
  const [venues, setVenues] = useState<uuid[]>([]);

  // Fetch IDs
  useEffect(() => {
    const fetch = async (type: string) => {
      try {
        const api = await getServicePublicApiUrl();
        const url = `${api}/${type}`
        const response = await axios.get(url);

        switch (type) {
            case 'event': setEvents(camelcaseKeys(response.data, { deep: true }).slice(0, 24)); break;
            case 'artist': setArtists(camelcaseKeys(response.data, { deep: true }).slice(0, 24)); break;
            case 'venue': setVenues(camelcaseKeys(response.data, { deep: true }).slice(0, 24)); break;
          default: break;
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetch('event');
    fetch('artist');
    fetch('venue');

  }, []);


  return (
    <>
      <Head>
        <title>Bandwidth</title>
        <meta name="description" content="Welcome to my website" />
      </Head>

      <Hero />

      <div style={{ marginBottom: 20, marginTop: 40 }}>
        <SectionHeader title='Events' route='/event' />
        <CardGrid eventIds={events} limit={8} isPaginated={true}/>
      </div>
      
      <div style={{ marginBottom: 20 }}>
        <SectionHeader title='Artists' route='/artist' />
        <CardGrid artistIds={artists} limit={8} isPaginated={true}/>
      </div>

      <div>
        <SectionHeader title='Venues' route='/venue' />
        <CardGrid venueIds={venues} limit={8} isPaginated={true}/>
      </div>

      <EmbedsLocalScene />
      
    </>
  );
};

export default Home;
