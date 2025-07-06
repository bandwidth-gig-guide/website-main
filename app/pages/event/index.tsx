import Link from "next/link";
import React, { useState, useEffect } from "react"
import axios from "axios"
import { Event as EventType } from "../../types/Event"
import apiUrl from "../../api.config"

const Event = () => {
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    axios.get(`${apiUrl}/event/`)
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>All Events</h1>
      <ul>
        {events.map(event => (
          <li key={event.eventId}>
            <Link href={`/event/${event.eventId}`}>
              {event.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Event;
