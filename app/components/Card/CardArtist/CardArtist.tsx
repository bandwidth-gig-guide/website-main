import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArtistCard } from '../../../types/ArtistCard'
import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import apiUrl from '../../../api.config'
import CardBase from '../CardBase/CardBase'
import CardLoading from '../CardLoading/CardLoading'

interface Props {
	artistId: uuid
}

const CardArtist: React.FC<Props> = ({ artistId }) => {
	const [artist, setArtist] = useState<ArtistCard>({} as ArtistCard)
	const [isLoading, setIsLoading] = useState(true)
	const [isError, setIsError] = useState(false)
	const [hasImage, setHasImage] = useState(true)

	useEffect(() => {
		const fetchArtist = async () => {
			try {
				const response = await axios.get(`${apiUrl}/artist/card/${artistId}`)
				const artistData = camelcaseKeys(response.data, { deep: true })
				setArtist(artistData)

				if (artistData.imageUrl) {
					const img = new Image()
					img.src = artistData.imageUrl
					img.onload = () => setIsLoading(false)
					img.onerror = () => setHasImage(false)
				} else {
					setIsLoading(false)
					setHasImage(false)
				}
			} catch (error) {
				setIsError(true)
				setIsLoading(false)
			}
		}

		fetchArtist()
	}, [artistId])

	if (isLoading) return <CardLoading />
	if (isError) return <div>Error loading artist.</div>

	return (
		<div>
			<Link href={`/artist/${artistId}`}>
				<CardBase
					topLeft={`${artist.city}, ${artist.country}`}
					title={artist.title}
					bottom={`${artist.upcomingEvents} Upcoming Events`}
					imgUrl={hasImage && artist.imageUrl ? artist.imageUrl : ''}
				/>
			</Link>
		</div>
	)
}

export default CardArtist
