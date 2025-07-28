// React / Next
import React, { useState } from "react"
import Head from 'next/head';

import SectionHeader from "../../components/SectionHeader/SectionHeader";
import CardGrid from "../../components/CardGrid/CardGrid";
import { CardGridType } from "../../types/enums/CardGridType";
import FilterVenue from "../../components/Filter/FilterVenue/FilterVenue";

const Venue = () => {
  const [venueIds, setVenueIds] = useState<uuid[]>([]);

  return (
    <>
      <Head>
        <title>Bandwidth | Venues</title>
        <meta name="description" content="" />
      </Head>
      
      <div>
        <SectionHeader title="Venues" />
        <FilterVenue setVenueIds={setVenueIds} />
        <CardGrid venueIds={venueIds} cardGridType={CardGridType.Grid} />
      </div>
    </>
  );
};

export default Venue;
