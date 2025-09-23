import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArtistBrief } from '../../../types/models/ArtistBrief'
import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import { getServicePublicApiUrl } from "../../../util/runtime_vars/getServicePublicApiUrl";
import CardBase from '../CardBase/CardBase'
import CardLoading from '../CardLoading/CardLoading'

interface Props {
	artistId: uuid
}

const CardArtist: React.FC<Props> = ({ artistId }) => {
	const [artist, setArtist] = useState<ArtistBrief>({} as ArtistBrief)
	const [isLoading, setIsLoading] = useState(true)
	const [isError, setIsError] = useState(false)
	const [hasImage, setHasImage] = useState(true)


	useEffect(() => {
		const fetchArtist = async () => {
			try {
				const api = await getServicePublicApiUrl();
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
	if (isError) return

	let upcomingEventsString = ""
	switch (artist.upcomingEvents) {
		case 0:
			upcomingEventsString = ""
			break
		case 1:
			upcomingEventsString = "1 Upcoming Event"
			break
		default:
			upcomingEventsString = `${artist.upcomingEvents} Upcoming Events`
			break
	}

	return (
		<div>
			<Link href={`/artist/${artistId}`}>
				<CardBase
					topLeft={`${artist.city}, ${artist.country}`}
					title={artist.title}
					bottom={upcomingEventsString}
					imgUrl={hasImage && artist.imageUrl ? artist.imageUrl : ''}
				/>
			</Link>
		</div>
	)
}

export default CardArtist
