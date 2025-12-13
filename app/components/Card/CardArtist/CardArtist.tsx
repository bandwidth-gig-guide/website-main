import React, { useState, useEffect } from 'react'
import { CardBase, CardLoading } from '@/components'
import { ArtistBrief } from '@/types'
import { formatUpcomingEvents } from '@/utils';
import Link from 'next/link'
import getConfig from "next/config";
import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'


interface Props {
	artistId: uuid
}

const CardArtist: React.FC<Props> = ({ artistId }) => {
	const [artist, setArtist] = useState<ArtistBrief>({} as ArtistBrief)
	const [isLoading, setIsLoading] = useState(true)
	const [isError, setIsError] = useState(false)
	const [hasImage, setHasImage] = useState(true)

	const api = getConfig().publicRuntimeConfig.SERVICE_PUBLIC_API_URL

	useEffect(() => {
		const fetchArtist = async () => {
			try {
				const response = await axios.get(`${api}/artist/brief/${artistId}`)
				const artistData = camelcaseKeys(response.data, { deep: true })
				setArtist(artistData)

				if (artistData.imageUrl) {
					const img = new Image()
					img.src = artistData.imageUrl
					let timeoutId: NodeJS.Timeout
					img.onload = () => {
						clearTimeout(timeoutId)
						setIsLoading(false)
					}
					timeoutId = setTimeout(() => {
						setHasImage(false)
						setIsLoading(false)
					}, 5000)
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

	return (
		<div>
			<Link href={`/artist/${artistId}`}>
				<CardBase
					topLeft={`${artist.city}, ${artist.country}`}
					title={artist.title}
					bottom={formatUpcomingEvents(artist.upcomingEvents)}
					imgUrl={artist.imageUrl}
				/>
			</Link>
		</div>
	)
}

export default CardArtist
