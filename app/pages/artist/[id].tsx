// React / Next
import React, { useState, useEffect } from "react"
import Head from 'next/head';
import { useRouter } from "next/router";

// External
import axios from "axios"
import camelcaseKeys from "camelcase-keys";

// Custom
import apiUrl from "../../api.config"
import { Artist } from "../../types/Artist"


const ArtistDetail = () => {

  // State
  const [artist, setArtist] = useState<Artist>({} as Artist); 
  const [isError, setIsError] = useState<boolean>(false);

  // Router
  const router = useRouter();
  const { id } = router.query;

  // Get Artist Details
  useEffect(() => {
    axios.get(`${apiUrl}/artist/${id}`)
      .then(response => { setArtist(camelcaseKeys(response.data, { deep: true }))})
      .catch(() => { setIsError(true)})
    }, [id]);

  // Handle Error
  useEffect(() => {
    if (isError) {
      // Display a snackbar.
      router.push('/Artist');
    }
  }, [isError]);
  
  // Return
  return (
    <>
      <Head>
        <title>Bandwidth | {artist.title}</title>
        <meta name="description" content="" />
      </Head>
      <div>
        <h1>{artist.title}</h1>
        <p>{JSON.stringify(artist)}</p>
      </div>
    </>
  );
};

export default ArtistDetail;
