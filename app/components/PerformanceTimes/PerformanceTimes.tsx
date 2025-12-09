import React from 'react'
import { Chip } from "@/components"
import { PageType } from '@/enums';
import { EventPerformance, EventVenue } from '@/types'
import { formatDateToTime } from '@/utils';
import styles from './PerformanceTimes.module.css'


interface Props {
    eventPerformances: EventPerformance[];
    eventVenue: EventVenue;
    doorsTime: Date;
}

const PerformanceTimes: React.FC<Props> = ({ eventPerformances = [], eventVenue, doorsTime}) => {

  const sortedPerformances = [...eventPerformances].sort(
    (a, b) => new Date(b.startDateTime).getTime() - new Date(a.startDateTime).getTime()
  );

  const getArtistSubtitle = (performer: EventPerformance, index: number): string => {
    const time = formatDateToTime(performer.startDateTime);
    const displayedTime = time != "12:01am" ? ` | ${time}` : '';
    const title = `${index === 0 ? 'Headliner' : 'Support'}`

    return `${title}${displayedTime}`;
  };

    const getVenueSubtitle = (): string => {
    const time = formatDateToTime(doorsTime);
    const displayedTime = time != "12:01am" ? ` | ${time}` : '';

    return `Venue${displayedTime}`;
  };

  return (
    <div className={styles.wrapper}>

      {sortedPerformances.map((performer, index) => (
        <div className={styles.artistChip}>
          <Chip
            key={index}
            title={performer.title}
            subtitle={getArtistSubtitle(performer, index)}
            imageUrl={performer.imageUrl}
            pageType={PageType.Artist}
            id={performer.artistId}
          />
          <div className={styles.spacer}></div>
        </div>
      ))}

      <div className={styles.venueChip}>
        <Chip
          title={eventVenue.title}
          subtitle={getVenueSubtitle()}
          imageUrl={eventVenue.imageUrl}
          pageType={PageType.Venue}
          id={eventVenue.venueId}
        />
      </div>
    </div>
  )
}

export default PerformanceTimes