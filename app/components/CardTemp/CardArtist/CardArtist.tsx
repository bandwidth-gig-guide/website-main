import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Artist } from '../../../types/Artist'
import { ArtistImage } from '../../../types/Image'
import axios from "axios"
import camelcaseKeys from "camelcase-keys";
import apiUrl from '../../../api.config';
import CardBase from '../CardBase/CardBase';

interface Props {
	artistId: uuid;
}

const CardArtist: React.FC<Props> = ({ artistId }) => {
	const [artist, setArtist] = useState<Artist>({} as Artist); 
	const [image, setImage] = useState<ArtistImage>({} as ArtistImage);
	const [isError, setIsError] = useState<boolean>(false);

	useEffect(() => {
    axios
			.get(`${apiUrl}/artist/${artistId}`)
      .then(response => { setArtist(camelcaseKeys(response.data, { deep: true }))})
      .catch(() => { setIsError(true)})

    axios
			.get(`${apiUrl}/artist/image/${artistId}`)
      .then(response => { setImage(camelcaseKeys(response.data, { deep: true }))})
      .catch(() => { setIsError(true)})
		
	}, [artistId]);
	
  return (
    <div>
			<Link href={`/artist/${artistId}`}>
				<CardBase
					topLeft={`${artist.city}, ${artist.country}`}
					title={artist.title}
					bottom={artist.artistId}
					imgUrl={image.imageId}
				>
				</CardBase>
			</Link>
		</div>
  )
}

export default CardArtist