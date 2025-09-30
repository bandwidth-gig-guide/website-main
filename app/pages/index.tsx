// React / Next
import React, { useState, useEffect } from "react"
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
import getConfig from "next/config";
import { CardGridType } from "../types/enums/CardGridType";


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

    fetch('event');
    fetch('artist');
    fetch('venue');

  }, []);


  return (
    <>
      <Hero />
      <div style={{ marginBottom: 20, marginTop: 40 }}>
        <SectionHeader title='Events' route='/event' />
        <CardGrid eventIds={events} limit={8} isPaginated={true} />
      </div>
      <div style={{ marginBottom: 20 }}>
        <SectionHeader title='Artists' route='/artist' />
        <CardGrid artistIds={artists} limit={8} isPaginated={true} />
      </div>
      <div>
        <SectionHeader title='Venues' route='/venue' />
        <CardGrid venueIds={venues} limit={8} isPaginated={true} />
      </div>
      <EmbedsLocalScene />

      <Head>
        {/* Title & Meta */}
        <title>Bandwidth | Melbourne Gig Guide – Live Music, Artists & Venues</title>
        <meta
          name="description"
          content="Discover live music in Melbourne with Bandwidth. Explore upcoming gigs, local artists, and venues across the city. Your ultimate Melbourne gig guide."
        />

        {/* Open Graph */}
        <meta property="og:site_name" content="Bandwidth Melbourne Gig Guide" />
        <meta
          property="og:title"
          content="Bandwidth | Melbourne Gig Guide – Live Music, Artists & Venues"
        />
        <meta
          property="og:description"
          content="Discover live music in Melbourne with Bandwidth. Explore upcoming gigs, local artists, and venues across the city. Your ultimate Melbourne gig guide."
        />
        <meta property="og:image" content="/default-hero.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bandwidth.melbourne" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Bandwidth | Melbourne Gig Guide – Live Music, Artists & Venues"
        />
        <meta
          name="twitter:description"
          content="Discover live music in Melbourne with Bandwidth. Explore upcoming gigs, local artists, and venues across the city. Your ultimate Melbourne gig guide."
        />
        <meta name="twitter:image" content="/default-hero.jpg" />
        <meta name="twitter:site" content="@BandwidthMelb" />

        {/* Canonical */}
        <link rel="canonical" href="https://bandwidth.melbourne" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Bandwidth Melbourne Gig Guide",
              url: "https://bandwidth.melbourne",
              description:
                "Discover live music in Melbourne with Bandwidth. Explore upcoming gigs, local artists, and venues across the city.",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://bandwidth.melbourne/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </Head>

    </>
  );
};

export default Home;
