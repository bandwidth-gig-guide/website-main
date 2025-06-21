import { useRouter } from "next/router";
import React, { useState, useEffect } from "react"
import axios from "axios"
import { Event } from "../../types/Event"

const EventDetail = () => {
  const [event, setEvent] = useState<Event>({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    axios.get('http://localhost:80/event/{id}')
      .then(response => {
        setEvent(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Event {id} Details</h1>
      <p>More information about Event {id}...</p>
      <p>{event.Title}</p>
    </div>
  );
};

export default EventDetail;
