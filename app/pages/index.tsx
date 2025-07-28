// React / Next
import React, {useState, useEffect} from "react"
import Head from 'next/head';

// External libraries
import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';

// Components
import SectionHeader from "../components/SectionHeader/SectionHeader";
import CardGrid from "../components/CardGrid/CardGrid";

// Config
import apiUrl from '../api.config';
import { CardGridType } from "@/types/enums/CardGridType";


const Home = () => {

  // State
  const [events, setEvents] = useState<uuid[]>([]);
  const [artists, setArtists] = useState<uuid[]>([]);
  const [venues, setVenues] = useState<uuid[]>([]);

  // Fetch IDs
  useEffect(() => {
    const fetch = async (type: string) => {
      try {
        const url = `${apiUrl}/${type}`
        const response = await axios.get(url);

        switch (type) {
          case 'event': setEvents(camelcaseKeys(response.data, { deep: true })); break;
          case 'artist': setArtists(camelcaseKeys(response.data, { deep: true })); break;
          case 'venue': setVenues(camelcaseKeys(response.data, { deep: true })); break;
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

      <div style={{ marginBottom: 60 }}>
        <SectionHeader title='Events' route='/event' />
        <CardGrid eventIds={events} cardGridType={CardGridType.Grid}/>
      </div>
      
      <div style={{ marginBottom: 60 }}>
        <SectionHeader title='Artists' route='/artist' />
        <CardGrid  artistIds={artists} cardGridType={CardGridType.Grid}/>
      </div>

      <div style={{ marginBottom: 60 }}>
        <SectionHeader title='Venues' route='/venue' />
        <CardGrid  venueIds={venues} cardGridType={CardGridType.Grid}/>
      </div>
      
    </>
  );
};

export default Home;
