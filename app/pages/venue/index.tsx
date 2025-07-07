// React / Next
import React, { useState, useEffect } from "react"
import Head from 'next/head';

// External
import axios from "axios"
import camelcaseKeys from "camelcase-keys";

// Custom
import apiUrl from "../../api.config"
import { Venue as VenueType } from "../../types/Venue"
import Card from "../../components/Card/Card"
import SectionHeader from "../../components/SectionHeader/SectionHeader";

const Venue = () => {
  const [venues, setVenues] = useState<VenueType[]>([]);

  useEffect(() => {
    axios.get(`${apiUrl}/venue/`)
      .then(response => { setVenues(camelcaseKeys(response.data, { deep: true })) })
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
        {venues.map(venue => (
          <Card
            key={venue.venueId}
            venueId={venue.venueId}
          />
        ))}
      </div>
    </>
  );
};

export default Venue;
