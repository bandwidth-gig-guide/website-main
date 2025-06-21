import Link from "next/link";
import React, { useState, useEffect } from "react"
import axios from "axios"
import { Event } from "../types/Event"

const Home = () => {
  const [events, setEvents] = useState<Event[]>([]);
  
  useEffect(() => {
    axios.get('http://localhost:80/event/')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <Link href="/event">Event</Link>
      <h2>Test</h2>
      <ul>
        {events.map(event => (
          <li key={event.EventID}>
            {event.Title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
