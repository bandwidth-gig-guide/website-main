// React / Next
import React, { useState, useEffect } from "react"
import Head from 'next/head';
import { useRouter } from "next/router";

// External
import axios from "axios"
import camelcaseKeys from "camelcase-keys";

// Custom
import apiUrl from "../../api.config"
import { Event } from "../../types/Event"

// Styling
import styles from "../../styles/page.module.css"

const EventDetail = () => {

  // State
  const [event, setEvent] = useState<Event>({} as Event); 
  const [isError, setIsError] = useState<boolean>(false);

  // Router
  const router = useRouter();
  const { id } = router.query;

  // Get Event Details
  useEffect(() => {
    axios.get(`${apiUrl}/event/${id}`)
      .then(response => { setEvent(camelcaseKeys(response.data, { deep: true }))})
      .catch(() => { setIsError(true)})
    }, [id]);

  // Handle Error
  useEffect(() => {
    if (isError) {
      // Display a snackbar.
      router.push('/event');
    }
  }, [isError]);
  
  // Return
  return (
    <>
      <Head>
        <title>Bandwidth | {event.title}</title>
        <meta name="description" content="" />
      </Head>

      <div className={styles.pageWrapper}>
        <h1>{event.title}</h1>
        <p>{JSON.stringify(event)}</p>
      </div>
    </>
  );
};

export default EventDetail;
