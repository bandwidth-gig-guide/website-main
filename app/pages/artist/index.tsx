import React, { useState, useEffect } from "react"
import axios from "axios"
import { Artist as ArtistType } from "../../types/Artist"
import apiUrl from "../../api.config"
import Card from "./../../components/Card/Card"
import camelcaseKeys from "camelcase-keys"

const Artist = () => {
  const [artists, setArtists] = useState<ArtistType[]>([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/artist/`)
      .then(response => { setArtists(camelcaseKeys(response.data, { deep: true }))})
      .catch(error => { console.error(error); });
  }, []);

  return (
    <div>
      <h1>All Artists</h1>
      {artists.map(artist => (
          <Card 
            key={artist.artistId}
            artistId={artist.artistId} 
          />
      ))}
    </div>
  );
};

export default Artist;
