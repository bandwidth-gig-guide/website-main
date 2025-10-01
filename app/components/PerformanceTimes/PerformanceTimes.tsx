import React from 'react'
import { EventPerformance, EventVenue } from '@/types'
import Chip from "../Chip/Chip"
import styles from './PerformanceTimes.module.css'
import { PageType } from '@/enums';
import { formatDateToTime } from '../../util/formatDateToTime';

interface Props {
    eventPerformances: EventPerformance[];
    eventVenue: EventVenue;
    doorsTime: Date;
}

const PerformanceTimes: React.FC<Props> = ({ eventPerformances = [], eventVenue, doorsTime}) => {

  const sortedPerformances = [...eventPerformances].sort(
    (a, b) => new Date(b.startDateTime).getTime() - new Date(a.startDateTime).getTime()
  );

  return (
    <div className={styles.wrapper}>

      {sortedPerformances.map((performer, index) => (
        <div className={styles.artistChip}>
          <Chip
            key={index}
            title={performer.title}
            subtitle={`${index === 0 ? 'Headliner' : 'Support'} | ${formatDateToTime(performer.startDateTime)}`}
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
          subtitle={`Venue | Doors at ${formatDateToTime(doorsTime)}`}
          imageUrl={eventVenue.imageUrl}
          pageType={PageType.Venue}
          id={eventVenue.venueId}
        />
      </div>
    </div>
  )
}

export default PerformanceTimes