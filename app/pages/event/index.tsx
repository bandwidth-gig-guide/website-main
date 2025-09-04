// React / Next
import React, { useState } from "react"
import Head from 'next/head';

// Custom
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import CardGrid from "../../components/CardGrid/CardGrid";
import { CardGridType } from "../../types/enums/CardGridType";
import FilterEvent from "../../components/Filter/FilterEvent/FilterEvent"
import Hero from "../../components/Hero/Hero";

function formatDate(date: string): string {
  // date: "YYYYMMDD" (e.g. "20251002")
  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);
  const dateIso = new Date(`${year}-${month}-${day}`);
  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', weekday: 'long' };

  // formattedInitial: "Monday, October 20"
  const formattedInitial = dateIso.toLocaleDateString('en-US', options);

  // formattedFinal: "October 20, Monday"
  const [weekday, rest] = formattedInitial.split(', ');
  const formattedFinal = `${rest}, ${weekday}`

  return formattedFinal;
}

const Event = () => {
  const [eventIdsByDate, setEventIdsByDate] = useState<Record<string, uuid[]>>({});

  return (
    <>
      <Head>
        <title>Bandwidth | Events</title>
        <meta name="description" content="" />
      </Head>

      <div>
        <Hero />
        <SectionHeader title="Events" />
        <FilterEvent setEventIdsByDate={setEventIdsByDate} />
        {Object.entries(eventIdsByDate).map(([date, ids]) => (
          <div key={date}>
            <SectionHeader title={formatDate(date)} />
            <CardGrid eventIds={ids} cardGridType={CardGridType.Grid} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Event;
