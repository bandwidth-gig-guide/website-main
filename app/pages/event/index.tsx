import React, { useState, useEffect } from "react"
import axios from "axios"
import { Event as EventType } from "../../types/Event"
import apiUrl from "../../api.config"
import Card from "../../components/Card/Card";
import camelcaseKeys from "camelcase-keys";

const Event = () => {
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    axios.get(`${apiUrl}/event/`)
      .then(response => { setEvents(camelcaseKeys(response.data, { deep: true }))})
      .catch(error => { console.error(error); });
  }, []);

  return (
    <div>
      <h1>All Events</h1>
        {events.map(event => (
            <Card 
              key={event.eventId}
              eventId={event.eventId} 
            />
        ))}
    </div>
  );
};

export default Event;
