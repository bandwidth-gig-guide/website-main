import React, { useEffect, useState } from "react";
import Head from "next/head";

import SectionHeader from "../../components/SectionHeader/SectionHeader";
import CardGrid from "../../components/CardGrid/CardGrid";
import { CardGridType } from "@/enums";
import FilterArtist from "../../components/Filter/FilterArtist/FilterArtist";
import Hero from "../../components/Hero/Hero"



const Artist = () => {
  const [artistIds, setArtistIds] = useState<uuid[]>([]);

  return (
    <>
      <div>
        <Hero />
        <SectionHeader title="Search Artists" />
        <FilterArtist setArtistIds={setArtistIds} />
        <CardGrid artistIds={artistIds} cardGridType={CardGridType.Grid} isPaginated={true} limit={12} />
      </div>

      <Head>
        {/* Title & Meta */}
        <title>Bandwidth | Discover Melbourne Artists & Bands</title>
        <meta
          name="description"
          content="Browse Melbourne artists and bands across every genre. Discover local talent, explore profiles, and find your next favourite act with Bandwidth."
        />

        {/* Open Graph */}
        <meta property="og:site_name" content="Bandwidth Melbourne Gig Guide" />
        <meta property="og:title" content="Bandwidth | Discover Melbourne Artists & Bands" />
        <meta
          property="og:description"
          content="Browse Melbourne artists and bands across every genre. Discover local talent, explore profiles, and find your next favourite act with Bandwidth."
        />
        <meta property="og:image" content="/default-artist.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bandwidth.melbourne/artist" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bandwidth | Discover Melbourne Artists & Bands" />
        <meta
          name="twitter:description"
          content="Browse Melbourne artists and bands across every genre. Discover local talent, explore profiles, and find your next favourite act with Bandwidth."
        />
        <meta name="twitter:image" content="/default-artist.jpg" />
        <meta name="twitter:site" content="@BandwidthMelb" />

        {/* Canonical */}
        <link rel="canonical" href="https://bandwidth.melbourne/artist" />

        {/* JSON-LD Structured Data (CollectionPage of MusicGroup) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "Melbourne Artists & Bands",
              description:
                "Browse Melbourne artists and bands across every genre. Discover local talent, explore profiles, and find your next favourite act with Bandwidth.",
              url: "https://bandwidth.melbourne/artist",
              isPartOf: {
                "@type": "WebSite",
                name: "Bandwidth Melbourne Gig Guide",
                url: "https://bandwidth.melbourne",
              },
              about: {
                "@type": "MusicGroup",
                name: "Melbourne Artists & Bands",
              },
            }),
          }}
        />
      </Head>

    </>
  );
};

export default Artist;
