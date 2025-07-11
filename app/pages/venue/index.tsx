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

const Venue = () => {
  const [venueIds, setVenueIds] = useState<uuid[]>([]);

  useEffect(() => {
    axios.get(`${apiUrl}/venue/`)
      .then(response => { setVenueIds(camelcaseKeys(response.data, { deep: true })) })
      .catch(error => { console.error(error); });
  }, []);

  return (
    <>
      <Head>
        <title>Bandwidth | Venues</title>
        <meta name="description" content="" />
      </Head>
      
      <div>
        <SectionHeader title="Venues" />
        <CardGrid venueIds={venueIds} cardGridType={CardGridType.Grid}/>
      </div>
    </>
  );
};

export default Venue;
