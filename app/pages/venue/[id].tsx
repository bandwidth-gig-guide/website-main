// React / Next
import React, { useState, useEffect } from "react"
import Head from 'next/head';
import { useRouter } from "next/router";

// External
import axios from "axios"
import camelcaseKeys from "camelcase-keys";

// Custom
import apiUrl from "../../api.config"
import { Venue } from "../../types/Venue"


const VenueDetail = () => {

  // State
  const [venue, setVenue] = useState<Venue>({} as Venue); 
  const [isError, setIsError] = useState<boolean>(false);

  // Router
  const router = useRouter();
  const { id } = router.query;

  // Get Venue Details
  useEffect(() => {
    axios.get(`${apiUrl}/venue/${id}`)
      .then(response => { setVenue(camelcaseKeys(response.data, { deep: true }))})
      .catch(() => { setIsError(true)})
    }, [id]);

  // Handle Error
  useEffect(() => {
    if (isError) {
      // Display a snackbar.
      router.push('/venue');
    }
  }, [isError]);
  
  // Return
  return (
    <>
      <Head>
        <title>Bandwidth | {venue.title}</title>
        <meta name="description" content="" />
      </Head>
      <div>
        <h1>{venue.title}</h1>
        <p>{JSON.stringify(venue)}</p>
      </div>
    </>
  );
};

export default VenueDetail;
