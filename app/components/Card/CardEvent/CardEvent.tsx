import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import getConfig from "next/config";
import { CardBase, CardLoading } from '@/components'
import { EventBrief } from '@/types'
import { formatDateShort } from '@/utils'
import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'


const CardEvent: React.FC<{ eventId: uuid }> = ({ eventId }) => {
	const [event, setEvent] = useState<EventBrief>({} as EventBrief)
	const [isLoading, setIsLoading] = useState(true)

	const api = getConfig().publicRuntimeConfig.SERVICE_PUBLIC_API_URL

	useEffect(() => {
		const fetchEvent = async () => {
			try {
				const response = await axios.get(`${api}/event/brief/${eventId}`)
				setEvent(camelcaseKeys(response.data, { deep: true }))
			} catch (error) {
				return
			} finally {
				setIsLoading(false)
			}
		}

		fetchEvent()
	}, [eventId])

	if (isLoading) return <CardLoading />

	return (
		<Link href={`/event/${eventId}`}>
			<CardBase
				topLeft={event.venueTitle}
				topRight={formatDateShort(event.startDateTime)}
				title={event.title}
				bottom={event.artistTitles.join(' · ')}
				imgUrl={event.imageUrl}
			/>
		</Link>
	)
}

export default CardEvent
