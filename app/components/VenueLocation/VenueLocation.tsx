import React from 'react'
import { GoogleMapsEmbed } from '@/components';
import { formatOpeningHours } from '@/utils';
import { OpeningHours } from '@/types';
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
				{openingHours && 
					<div className={styles.info}>
						<img className={styles.selfAlignStart} src="/icons/date.svg" alt="Date Icon" />
						<div className={styles.hoursWrapper}>
							<div className={styles.hours}>
								<span>Monday</span>
								<span className={styles.ellipse}></span>
								<span>{`${formatOpeningHours(openingHours.monOpen, openingHours.monClose)}`}</span>
							</div>
							<div className={styles.hours}>
								<span>Tuesday</span>
								<span className={styles.ellipse}></span>
								<span>{`${formatOpeningHours(openingHours.tueOpen, openingHours.tueClose)}`}</span>
							</div>
							<div className={styles.hours}>
								<span>Wednesday</span>
								<span className={styles.ellipse}></span>
								<span>{`${formatOpeningHours(openingHours.wedOpen, openingHours.wedClose)}`}</span>
							</div>
							<div className={styles.hours}>
								<span>Thursday</span>
								<span className={styles.ellipse}></span>
								<span>{`${formatOpeningHours(openingHours.thurOpen, openingHours.thurClose)}`}</span>
							</div>
							<div className={styles.hours}>
								<span>Friday</span>
								<span className={styles.ellipse}></span>
								<span>{`${formatOpeningHours(openingHours.friOpen, openingHours.friClose)}`}</span>
							</div>
							<div className={styles.hours}>
								<span>Saturday</span>
								<span className={styles.ellipse}></span>
								<span>{`${formatOpeningHours(openingHours.satOpen, openingHours.satClose)}`}</span>
							</div>
							<div className={styles.hours}>
								<span>Sunday</span>
								<span className={styles.ellipse}></span>
								<span>{`${formatOpeningHours(openingHours.sunOpen, openingHours.sunClose)}`}</span>
							</div>
						</div>
					</div>
				}
			</div>
		</div>
	)
}

export default VenueLocation