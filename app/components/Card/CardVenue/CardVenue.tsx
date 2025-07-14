import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import { VenueBrief } from '../../../types/models/VenueBrief'
import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import apiUrl from '../../../api.config'
import CardBase from '../CardBase/CardBase'
import CardLoading from '../CardLoading/CardLoading'

interface Props {
	venueId: uuid
}

const CardVenue: React.FC<Props> = ({ venueId }) => {
	const [venue, setVenue] = useState<VenueBrief>({} as VenueBrief)
	const [isLoading, setIsLoading] = useState(true)
	const [isError, setIsError] = useState(false)
	const [hasImage, setHasImage] = useState(true)

	useEffect(() => {
		const fetchVenue = async () => {
			try {
				const response = await axios.get(`${apiUrl}/venue/brief/${venueId}`)
				const venueData = camelcaseKeys(response.data, { deep: true })
				setVenue(venueData)

				if (venueData.imageUrl) {
					const img = new Image()
					img.src = venueData.imageUrl
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

		fetchVenue()
	}, [venueId])

	if (isLoading) return <CardLoading />
	if (isError) return <div>Error loading venue.</div>

	return (
		<div>
			<Link href={`/venue/${venueId}`}>
				<CardBase
					topLeft={`${venue.streetAddress}, ${venue.city} ${venue.stateCode} ${venue.postCode}`}
					title={venue.title}
					bottom={`${venue.upcomingEventCount} Upcoming Events`}
					imgUrl={hasImage && venue.imageUrl ? venue.imageUrl : ''}
				/>
			</Link>
		</div>
	)
}

export default CardVenue
