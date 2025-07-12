// React / Next
import React, { useState, useEffect } from "react"
import Head from 'next/head';

// External
import axios from "axios"
import camelcaseKeys from "camelcase-keys";

// Custom
import apiUrl from "../../api.config"
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import CardGrid from "../../components/CardGrid/CardGrid";
import { CardGridType } from "../../types/enums/CardGridType";

const Event = () => {
  const [eventIds, setEventIds] = useState<uuid[]>([]);

  useEffect(() => {
    axios.get(`${apiUrl}/event/`)
         .then(response => { setEventIds(camelcaseKeys(response.data, { deep: true }))})
         .catch(error => { console.error(error); });
  }, []);

  return (
    <>
      <Head>
        <title>Bandwidth | Events</title>
        <meta name="description" content="" />
      </Head>
      
      <div>
        <SectionHeader title="Events" />
        <CardGrid eventIds={eventIds} cardGridType={CardGridType.Grid} />

      </div>
    </>
  );
};

export default Event;
