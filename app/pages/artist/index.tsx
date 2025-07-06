import Link from "next/link";
import React, { useState, useEffect } from "react"
import axios from "axios"
import { Artist as ArtistType } from "../../types/Artist"
import apiUrl from "../../api.config"
import Card from "./../../components/Card/Card"

const Artist = () => {
  const [artists, setArtists] = useState<ArtistType[]>([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/artist/`)
      .then(response => { setArtists(response.data); })
      .catch(error => { console.error(error); });
  }, []);

  return (
    <div>
      <h1>All Artists</h1>
      <ul>
        {artists.map(artist => (
          <li key={artist.artistId}>
            <Card ArtistID={artist.artistId} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Artist;
