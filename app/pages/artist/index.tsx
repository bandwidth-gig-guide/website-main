import React, { useState } from 'react';
import { SectionHeader, CardGrid, FilterArtist, Hero, MetaInfo } from '@/components';
import { CardGridType } from '@/enums';


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
