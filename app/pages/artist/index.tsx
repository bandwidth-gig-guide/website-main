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

const Artist = () => {
  const [artistIds, setArtistIds] = useState<uuid[]>([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/artist/ids`)
      .then(response => { setArtistIds(camelcaseKeys(response.data, { deep: true }))})
      .catch(error => { console.error(error); });
  }, []);

  return (
    <>
      <Head>
        <title>Bandwidth | Artists</title>
        <meta name="description" content="" />
      </Head>
      
      <div>
        <SectionHeader title="Artists" />
        <CardGrid artistIds={artistIds} cardGridType={CardGridType.Grid}/>
      </div>
    </>
   
  );
};

export default Artist;
