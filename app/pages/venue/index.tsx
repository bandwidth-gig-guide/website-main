// React / Next
import React, { useState } from "react"
import Head from 'next/head';

import { SectionHeader, CardGrid, FilterVenue, CityMap, Hero } from '@/components';
import { CardGridType } from "@/enums";



const Venue = () => {
  const [venueIds, setVenueIds] = useState<uuid[]>([]);

  return (
    <>
      <div>
        <Hero />
        <SectionHeader title="Search Venues" />
        <FilterVenue setVenueIds={setVenueIds} />
        <CardGrid venueIds={venueIds} cardGridType={CardGridType.Grid} isPaginated={true} limit={24} />
        <CityMap />
      </div>

      <Head>
        {/* Title & Meta */}
        <title>Bandwidth | Venues in Melbourne</title>
        <meta
          name="description"
          content="Discover the best live music venues in Melbourne. Explore gig locations, bars, clubs, and iconic spaces hosting concerts and events — all on Bandwidth."
        />

        {/* Open Graph */}
        <meta property="og:site_name" content="Bandwidth Melbourne Gig Guide" />
        <meta property="og:title" content="Bandwidth | Venues in Melbourne" />
        <meta
          property="og:description"
          content="Discover the best live music venues in Melbourne. Explore gig locations, bars, clubs, and iconic spaces hosting concerts and events — all on Bandwidth."
        />
        <meta property="og:image" content="/default-venue.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bandwidth.melbourne/venue" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bandwidth | Venues in Melbourne" />
        <meta
          name="twitter:description"
          content="Discover the best live music venues in Melbourne. Explore gig locations, bars, clubs, and iconic spaces hosting concerts and events — all on Bandwidth."
        />
        <meta name="twitter:image" content="/default-venue.jpg" />
        <meta name="twitter:site" content="@BandwidthMelb" />

        {/* Canonical */}
        <link rel="canonical" href="https://bandwidth.melbourne/venue" />

        {/* JSON-LD Structured Data (CollectionPage of MusicVenues) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "Melbourne Music Venues",
              description:
                "Discover the best live music venues in Melbourne. Explore gig locations, bars, clubs, and iconic spaces hosting concerts and events — all on Bandwidth.",
              url: "https://bandwidth.melbourne/venue",
              isPartOf: {
                "@type": "WebSite",
                name: "Bandwidth Melbourne Gig Guide",
                url: "https://bandwidth.melbourne",
              },
              about: {
                "@type": "MusicVenue",
                name: "Live Music Venues in Melbourne",
              },
            }),
          }}
        />
      </Head>
    </>
  );
};

export default Venue;
