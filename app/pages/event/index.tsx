// React / Next
import React, { useState, useEffect } from "react"
import Head from 'next/head';

// External
import axios from "axios"
import camelcaseKeys from "camelcase-keys";

// Custom
import apiUrl from "../../api.config"
import { Event as EventType } from "../../types/Event"
import Card from "../../components/Card/Card"
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
        {events.map(event => (
            <Card 
              key={event.eventId}
              eventId={event.eventId} 
            />
        ))}
      </div>
    </>
  );
};

export default Event;
