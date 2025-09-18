import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { EventBrief } from '../../../types/models/EventBrief'
import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import apiUrl from '../../../api.config'
import CardBase from '../CardBase/CardBase'
import CardLoading from '../CardLoading/CardLoading'
import { formatDateShort } from '../../../util/formatDateShort'

interface Props {
	eventId: uuid
}

const CardEvent: React.FC<Props> = ({ eventId }) => {
	const [event, setEvent] = useState<EventBrief>({} as EventBrief)
	const [isLoading, setIsLoading] = useState(true)
	const [isError, setIsError] = useState(false)
	const [hasImage, setHasImage] = useState(true)

	useEffect(() => {
		const fetchEvent = async () => {
			try {
				const response = await axios.get(`${apiUrl}/event/brief/${eventId}`)
				const eventData = camelcaseKeys(response.data, { deep: true })
				setEvent(eventData)

				if (eventData.imageUrl) {
					const img = new Image()
					img.src = eventData.imageUrl
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

		fetchEvent()
	}, [eventId])

	if (isLoading) return <CardLoading />
	if (isError) return

	return (
		<div>
			<Link href={`/event/${eventId}`}>
				<CardBase
					topLeft={event.venueTitle}
					topRight={formatDateShort(event.startDateTime)}
					title={event.title}
					bottom={event.artistTitles.join(' · ')}
					imgUrl={hasImage && event.imageUrl ? event.imageUrl : ''}
				/>
			</Link>
		</div>
	)
}

export default CardEvent
