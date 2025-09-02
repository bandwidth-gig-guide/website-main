// React / Next
import React, { useState } from "react"
import Head from 'next/head';

// Custom
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import CardGrid from "../../components/CardGrid/CardGrid";
import { CardGridType } from "../../types/enums/CardGridType";
import FilterEvent from "../../components/Filter/FilterEvent/FilterEvent"
import Hero from "../../components/Hero/Hero";

const Event = () => {
  const [eventIds, setEventIds] = useState<uuid[]>([]);

  return (
    <>
      <Head>
        <title>Bandwidth | Events</title>
        <meta name="description" content="" />
      </Head>
      
      <div>
        <Hero />
        <SectionHeader title="Events" />
        <FilterEvent setEventIds={setEventIds}/>
        <CardGrid eventIds={eventIds} cardGridType={CardGridType.Grid} />

      </div>
    </>
  );
};

export default Event;
