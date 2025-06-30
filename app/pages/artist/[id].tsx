import { useRouter } from "next/router";
import React, { useState, useEffect } from "react"
import axios from "axios"
import { Artist } from "../../types/Artist"
import apiUrl from "../../api.config"

const ArtistDetail = () => {
  const [artist, setArtist] = useState<Artist>({} as Artist); 
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      setIsError(true);
      alert("Could not find artist")
      router.push('/artist');
      return;
    }

    axios.get(`${apiUrl}/artist/${id}`)
      .then(response => {
        setArtist(response.data);
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
        <p>Could not load artist: {id}</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div>
        <p>Loading artist: {id}</p>
      </div>
    )
  }

  return (
    <div>
      <h1>{artist.Title}</h1>
      <p>{JSON.stringify(artist)}</p>
    </div>
  );
};

export default ArtistDetail;
