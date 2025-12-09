import React, { useEffect, useState } from 'react'
import { GoogleMapsEmbed } from '@/components';
import { formatOpeningHours } from '@/utils';
import { OpeningHours, areAllOpeningHoursEqual } from '@/types';
import styles from './VenueLocation.module.css'


interface Props {
	location: string
	websiteUrl: url;
	phoneNumber: string;
	googleMapsEmbedUrl?: url;
	openingHours?: OpeningHours;
}

const VenueLocation: React.FC<Props> = ({
	location,
	websiteUrl,
	phoneNumber,
	googleMapsEmbedUrl,
	openingHours
}) => {
	const mapDefault = "https://www.google.com/maps/d/embed?mid=1XnFb-G5D2UeK2wSUFVqxgBii8aeZ_lQ&ehbc=2E312F"

	const [openingHoursFlag, setOpeningHoursFlag] = useState<string>("hasRegularHours");

	useEffect(() => {
		if (!openingHours) return;

		if (areAllOpeningHoursEqual(openingHours, "23:57:00")) { setOpeningHoursFlag("openForEvents") };
		if (areAllOpeningHoursEqual(openingHours, "23:56:00")) { setOpeningHoursFlag("hoursUnknown") };

	}, [openingHours])

	return (
		<div className={styles.wrapper}>
			<div className={styles.mapWrapper}>
				<GoogleMapsEmbed embedUrl={googleMapsEmbedUrl || mapDefault} />
			</div>
			<div className={styles.infoWrapper}>
				<div className={styles.info}>
					<img src="/icons/location-pin.svg" alt="Location Icon" />
					<span>{location}</span>
				</div>
				<div className={styles.info}>
					<img src="/icons/website.svg" alt="Website Icon" />
					<a href={websiteUrl} target='_blank'>{websiteUrl}</a>
				</div>
				<div className={styles.info}>
					<img src="/icons/mobile.svg" alt="Phone Icon" />
					<span>{phoneNumber}</span>
				</div>
				<div className={styles.info}>
					<img className={styles.selfAlignStart} src="/icons/date.svg" alt="Date Icon" />
					<div className={styles.hoursWrapper}>
						{openingHoursFlag == "openForEvents" && <p>Open for Events</p>}
						{openingHoursFlag == "hoursUnknown" && <p>Opening Hours Unknown</p>}
						{openingHours && openingHoursFlag == "hasRegularHours" &&
							<>
								{[
									{ day: 'Monday', open: openingHours.monOpen, close: openingHours.monClose },
									{ day: 'Tuesday', open: openingHours.tueOpen, close: openingHours.tueClose },
									{ day: 'Wednesday', open: openingHours.wedOpen, close: openingHours.wedClose },
									{ day: 'Thursday', open: openingHours.thurOpen, close: openingHours.thurClose },
									{ day: 'Friday', open: openingHours.friOpen, close: openingHours.friClose },
									{ day: 'Saturday', open: openingHours.satOpen, close: openingHours.satClose },
									{ day: 'Sunday', open: openingHours.sunOpen, close: openingHours.sunClose }
								].map(({ day, open, close }) => (
									<div key={day} className={styles.hours}>
										<span>{day}</span>
										<span className={styles.ellipse}></span>
										<span>{formatOpeningHours(open, close)}</span>
									</div>
								))}
							</>
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default VenueLocation