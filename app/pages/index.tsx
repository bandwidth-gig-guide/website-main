import React, { useState, useEffect } from 'react'
import { SectionHeader, CardGrid, Hero, EmbedsLocalScene, MetaInfo } from '@/components';
import getConfig from 'next/config';
import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';


const Home = () => {

  // State
  const [events, setEvents] = useState<uuid[]>([]);
  const [artists, setArtists] = useState<uuid[]>([]);
  const [venues, setVenues] = useState<uuid[]>([]);

  const api = getConfig().publicRuntimeConfig.SERVICE_PUBLIC_API_URL

  // Fetch IDs
  useEffect(() => {
    const fetch = async (type: string) => {
      try {
        const url = `${api}/${type}/`
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

    ['event', 'artist', 'venue'].map(record => fetch(record));
  }, []);


  return (
    <>
      <Hero />
      <div style={{ marginBottom: 20, marginTop: 40 }}>
        <SectionHeader title='Events' route='/event' />
        <CardGrid eventIds={events} />
      </div>
      <div style={{ marginBottom: 20 }}>
        <SectionHeader title='Artists' route='/artist' />
        <CardGrid artistIds={artists} />
      </div>
      <div>
        <SectionHeader title='Venues' route='/venue' />
        <CardGrid venueIds={venues} />
      </div>
      <EmbedsLocalScene />

      <MetaInfo
        pageType="homepage"
        title="Melbourne Gig Guide"
        description="Discover live music in Melbourne with Bandwidth. Explore upcoming gigs, local artists, and venues across the city."
        url="https://bandwidthmelbourne.com"
      />
    </>
  );
};

export default Home;
