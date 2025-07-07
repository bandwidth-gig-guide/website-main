// React / Next
import React, { useState, useEffect } from "react"
import Head from 'next/head';

// External
import axios from "axios"
import camelcaseKeys from "camelcase-keys";

// Custom
import apiUrl from "../../api.config"
import { Artist as ArtistType } from "../../types/Artist"
import Card from "../../components/Card/Card"
import SectionHeader from "../../components/SectionHeader/SectionHeader";

const Artist = () => {
  const [artists, setArtists] = useState<ArtistType[]>([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/artist/`)
      .then(response => { setArtists(camelcaseKeys(response.data, { deep: true }))})
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
        {artists.map(artist => (
            <Card 
              key={artist.artistId}
              artistId={artist.artistId} 
            />
        ))}
      </div>
    </>
   
  );
};

export default Artist;
