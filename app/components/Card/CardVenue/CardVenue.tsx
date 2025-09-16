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
	if (isError) return

	let addressString = `${venue.streetAddress ?? ''}${venue.streetAddress ? ',' : ''} ${venue.city ?? ''} ${venue.stateCode ?? ''} ${venue.postCode ?? ''}`

	let upcomingEventsString = ""
	switch (venue.upcomingEventCount) {
		case 0:
			upcomingEventsString = ""
			break
		case 1:
			upcomingEventsString = "1 Upcoming Event"
			break
		default:
			upcomingEventsString = `${venue.upcomingEventCount} Upcoming Events`
			break
	}

	return (
		<div>
			<Link href={`/venue/${venueId}`}>
				<CardBase
					topLeft={addressString}
					title={venue.title}
					bottom={upcomingEventsString}
					imgUrl={hasImage && venue.imageUrl ? venue.imageUrl : ''}
				/>
			</Link>
		</div>
	)
}

export default CardVenue
