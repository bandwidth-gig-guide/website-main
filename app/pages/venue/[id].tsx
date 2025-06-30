import { useRouter } from "next/router";
import React, { useState, useEffect } from "react"
import axios from "axios"
import { Venue } from "../../types/Venue"
import apiUrl from "../../api.config"

const VenueDetail = () => {
  const [venue, setVenue] = useState<Venue>({} as Venue); 
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      setIsError(true);
      alert("Could not find venue")
      router.push('/venue');
      return;
    }

    axios.get(`${apiUrl}/venue/${id}`)
      .then(response => {
        setVenue(response.data);
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
        <p>Could not load venue: {id}</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div>
        <p>Loading venue: {id}</p>
      </div>
    )
  }

  return (
    <div>
      <h1>{venue.Title}</h1>
      <p>{JSON.stringify(venue)}</p>
    </div>
  );
};

export default VenueDetail;
