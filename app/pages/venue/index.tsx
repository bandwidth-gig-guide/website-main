import React, { useState, useEffect } from "react"
import axios from "axios"
import { Venue as VenueType } from "../../types/Venue"
import apiUrl from "../../api.config"
import Card from "../../components/Card/Card"
import camelcaseKeys from "camelcase-keys"

const Venue = () => {
  const [venues, setVenues] = useState<VenueType[]>([]);

  useEffect(() => {
    axios.get(`${apiUrl}/venue/`)
      .then(response => { setVenues(camelcaseKeys(response.data, { deep: true }))})
      .catch(error => { console.error(error); });
  }, []);

  return (
    <div>
      <h1>All Venues</h1>
        {venues.map(venue => (
            <Card 
              key={venue.venueId}
              venueId={venue.venueId}
            />
        ))}
    </div>
  );
};

export default Venue;
