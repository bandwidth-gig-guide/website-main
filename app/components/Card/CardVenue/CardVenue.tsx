import React, { useState, useEffect } from 'react'
import { CardBase, CardLoading } from '@/components'
import { VenueBrief } from '@/types'
import { formatLocation, formatUpcomingEvents } from '@/utils';
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

	return (
				bottom={formatUpcomingEvents(venue.upcomingEventCount)}
				imgUrl={venue.imageUrl}
	)
}

export default CardVenue
