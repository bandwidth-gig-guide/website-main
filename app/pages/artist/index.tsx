import React, { useEffect, useState } from "react";
import Head from "next/head";

import SectionHeader from "../../components/SectionHeader/SectionHeader";
import CardGrid from "../../components/CardGrid/CardGrid";
import { CardGridType } from "../../types/enums/CardGridType";
import FilterArtist from "../../components/Filter/FilterArtist/FilterArtist";


const Artist = () => {
  const [artistIds, setArtistIds] = useState<uuid[]>([]);

  return (
    <>
      <Head>
        <title>Bandwidth | Artists</title>
        <meta name="description" content="" />
      </Head>

      <div>
        <SectionHeader title="Artists" />
        <FilterArtist setArtistIds={setArtistIds}/>
        <CardGrid artistIds={artistIds} cardGridType={CardGridType.Grid} isPaginated={true} limit={24}/>
      </div>
    </>
  );
};

export default Artist;
