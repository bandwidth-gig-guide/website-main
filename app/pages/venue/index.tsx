// React / Next
import React, { useState } from "react"
import Head from 'next/head';

import SectionHeader from "../../components/SectionHeader/SectionHeader";
import CardGrid from "../../components/CardGrid/CardGrid";
import { CardGridType } from "../../types/enums/CardGridType";
import FilterVenue from "../../components/Filter/FilterVenue/FilterVenue";
import Hero from "../../components/Hero/Hero";
import CityMap from "../../components/CityMap/CityMap";


const Venue = () => {
  const [venueIds, setVenueIds] = useState<uuid[]>([]);

  return (
    <>
      <Head>
        <title>Bandwidth | Venues</title>
        <meta name="description" content="" />
      </Head>
      
      <div>
        <Hero />
        <SectionHeader title="Venues" />
        <FilterVenue setVenueIds={setVenueIds} />
        <CardGrid venueIds={venueIds} cardGridType={CardGridType.Grid} isPaginated={true} limit={24}/>
        <CityMap />
      </div>
    </>
  );
};

export default Venue;
