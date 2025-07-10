import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArtistCard } from '../../../types/ArtistCard'
import { ArtistImage } from '../../../types/Image'
import axios from "axios"
import camelcaseKeys from "camelcase-keys";
import apiUrl from '../../../api.config';
import CardBase from '../CardBase/CardBase';

interface Props {
	artistId: uuid;
}

const CardArtist: React.FC<Props> = ({ artistId }) => {
	const [artist, setArtist] = useState<ArtistCard>({} as ArtistCard); 
	const [isError, setIsError] = useState<boolean>(false);

	useEffect(() => {
    axios
			.get(`${apiUrl}/artist/card/${artistId}`)
      .then(response => { setArtist(camelcaseKeys(response.data, { deep: true }))})
      .catch(() => { setIsError(true)})

	}, [artistId]);
	
  return (
    <div>
			<Link href={`/artist/${artistId}`}>
				<CardBase
					topLeft={`${artist.city}, ${artist.country}`}
					title={artist.title}
					bottom={`${artist.upcomingEvents} Upcoming Events`}
					imgUrl={artist.imageUrl || ""}
				>
				</CardBase>
			</Link>
		</div>
  )
}

export default CardArtist