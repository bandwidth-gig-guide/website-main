import React, { useState } from "react"
import { SectionHeader, CardGrid, FilterVenue, CityMap, Hero, MetaInfo } from '@/components';


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

      <MetaInfo
        pageType="search"
        title="Discover Melbourne Artists and Bands"
        description="Discover the best live music venues in Melbourne. Explore gig locations, bars, clubs, and iconic spaces hosting concerts and events — all on Bandwidth."
        url="https://bandwidthmelbourne.com/venue"
      />
    </>
  );
};

export default Venue;
