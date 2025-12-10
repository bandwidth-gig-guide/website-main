import React, { useState } from 'react';
import { SectionHeader, CardGrid, FilterArtist, Hero, MetaInfo } from '@/components';


const Artist = () => {
  const [artistIds, setArtistIds] = useState<uuid[]>([]);

  return (
    <>
      <div>
        <Hero />
        <SectionHeader title="Search Artists" />
        <FilterArtist setArtistIds={setArtistIds} />
        <CardGrid
          artistIds={artistIds}
          rowsPerPageDesktop={4}
          rowsPerPageTablet={6}
          rowsPerPageMobile={12}
          allowLoadMore={true}
          showTally={true} 
        />
      </div>

      <MetaInfo
        pageType="search"
        title="Discover Melbourne Gigs, Events & Concerts"
        description="Browse Melbourne artists and bands across every genre. Discover local talent, explore profiles, and find your next favourite act with Bandwidth."
        url="https://bandwidthmelbourne.com/artist"
      />
    </>
  );
};

export default Artist;
