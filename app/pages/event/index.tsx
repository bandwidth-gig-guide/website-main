import Link from "next/link";
import React, { useState, useEffect } from "react"
import axios from "axios"

const Event = () => {
  const [events, setEvents] = useState([]);

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
      <h1>Event</h1>
      <ul>
        <li>
          <Link href="/event/1">Event 1</Link>
        </li>
        <li>
          <Link href="/event/2">Event 2</Link>
        </li>
        <li>
            <Link href="/">Home</Link>
        </li>
      </ul>
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

export default Event;
