import React, { useState, useEffect } from 'react'
import { CardBase, CardLoading } from '@/components'
import { VenueBrief } from '@/types'
import Link from 'next/link'
import getConfig from "next/config";
import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'


interface Props {
	venueId: uuid
}

const CardVenue: React.FC<Props> = ({ venueId }) => {
	const [venue, setVenue] = useState<VenueBrief>({} as VenueBrief)
	const [isLoading, setIsLoading] = useState(true)
	const [isError, setIsError] = useState(false)
	const [hasImage, setHasImage] = useState(true)

  const api = getConfig().publicRuntimeConfig.SERVICE_PUBLIC_API_URL

	useEffect(() => {
		const fetchVenue = async () => {
			try {
				const response = await axios.get(`${api}/venue/brief/${venueId}`)
				const venueData = camelcaseKeys(response.data, { deep: true })
				setVenue(venueData)

				if (venueData.imageUrl) {
					const img = new Image()
					img.src = venueData.imageUrl
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
