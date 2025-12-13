import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import getConfig from "next/config";
import { CardBase, CardLoading } from '@/components'
import { VenueBrief } from '@/types'
import { formatLocation, formatUpcomingEvents } from '@/utils';
import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'


const CardVenue: React.FC<{ venueId: string }> = ({ venueId }) => {
	const [venue, setVenue] = useState<VenueBrief>({} as VenueBrief)
	const [isLoading, setIsLoading] = useState(true)
	
	const api = getConfig().publicRuntimeConfig.SERVICE_PUBLIC_API_URL

	useEffect(() => {
		const fetchVenue = async () => {
			try {
				const response = await axios.get(`${api}/venue/brief/${venueId}`)
				setVenue(camelcaseKeys(response.data, { deep: true }))
			} catch (error) {
				return
			} finally {
				setIsLoading(false)
			}
		}

		fetchVenue()
	}, [venueId])

	if (isLoading) return <CardLoading />

	return (
		<Link href={`/venue/${venueId}`}>
			<CardBase
				topLeft={formatLocation(venue.streetAddress, venue.city, venue.stateCode, venue.postCode)}
				title={venue.title}
				bottom={formatUpcomingEvents(venue.upcomingEventCount)}
				imgUrl={venue.imageUrl}
			/>
		</Link>
	)
}

export default CardVenue
