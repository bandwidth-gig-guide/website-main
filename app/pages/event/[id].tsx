import { useRouter } from "next/router";
import React, { useState, useEffect } from "react"
import axios from "axios"
import { Event } from "../../types/Event"
import apiUrl from "../../api.config"

const EventDetail = () => {
  const [event, setEvent] = useState<Event>({} as Event); 
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      setIsError(true);
      alert("Could not find event")
      router.push('/event');
      return;
    }

    axios.get(`${apiUrl}/event/${id}`)
      .then(response => {
        setEvent(response.data);
      })
      .catch(error => {
        console.error(error);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });

    }, [id]);
  
  if (isError) {
    return (
      <div>
        <p>Could not load event: {id}</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div>
        <p>Loading event: {id}</p>
      </div>
    )
  }

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{JSON.stringify(event)}</p>
    </div>
  );
};

export default EventDetail;
