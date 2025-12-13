import React, { useState, useEffect } from 'react'
import { CardBase, CardLoading } from '@/components'
import { ArtistBrief } from '@/types'
import { formatUpcomingEvents } from '@/utils';
import Link from 'next/link'
import getConfig from "next/config";
import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'


const CardArtist: React.FC<{ artistId: uuid }> = ({ artistId }) => {
	const [artist, setArtist] = useState<ArtistBrief>({} as ArtistBrief)
	const [isLoading, setIsLoading] = useState(true)

	const api = getConfig().publicRuntimeConfig.SERVICE_PUBLIC_API_URL

	useEffect(() => {
		const fetchArtist = async () => {
			try {
				const response = await axios.get(`${api}/artist/brief/${artistId}`)
				setArtist(camelcaseKeys(response.data, { deep: true }))
			} catch (error) {
				return
			} finally {
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
