// React / Next
import React, { useState, useEffect } from "react"
import Head from 'next/head';

// External
import axios from "axios"
import camelcaseKeys from "camelcase-keys";

// Custom
import apiUrl from "../../api.config"
import { Event as EventType } from "../../types/Event"
import SectionHeader from "../../components/SectionHeader/SectionHeader";

const Event = () => {
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    axios.get(`${apiUrl}/event/`)
         .then(response => { setEvents(camelcaseKeys(response.data, { deep: true }))})
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
        <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", padding: "1em", borderRadius: "4px" }}>
          {JSON.stringify(events, null, 2)}
        </pre>
      </div>
    </>
  );
};

export default Event;
