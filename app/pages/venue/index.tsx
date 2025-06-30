import Link from "next/link";
import React, { useState, useEffect } from "react"
import axios from "axios"
import { Venue as VenueType } from "../../types/Venue"
import apiUrl from "../../api.config"

const Venue = () => {
  const [venues, setVenues] = useState<VenueType[]>([]);

  useEffect(() => {
    axios.get(`${apiUrl}/venue/`)
      .then(response => {
        setVenues(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>All Venues</h1>
      <ul>
        {venues.map(venue => (
          <li key={venue.VenueID}>
            <Link href={`/venue/${venue.VenueID}`}>
              {JSON.stringify(venue)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Venue;
