import React from 'react'
import { EventPerformance } from '../../types/models/EventPerformance'
import { EventVenue } from '../../types/models/EventVenue';
import Chip from "../Chip/Chip"
import styles from './PerformanceTimes.module.css'
import { PageType } from '../../types/enums/PageType';

interface Props {
    eventPerformances: EventPerformance[];
    eventVenue: EventVenue;
    doorsTime: Date;
}

const PerformanceTimes: React.FC<Props> = ({ eventPerformances = [], eventVenue, doorsTime}) => {
  return (
    <div className={styles.wrapper}>

      {eventPerformances.map((performer, index) => (
        <div className={styles.artistChip}>
          <Chip
            key={index}
            title={performer.title}
            subtitle={`${index === 0 ? 'Headliner' : 'Support'} | ${performer.startDateTime}`}
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
          subtitle={`Venue | Doors at ${doorsTime}`}
          imageUrl={eventVenue.imageUrl}
          pageType={PageType.Venue}
          id={eventVenue.venueID}
        />
      </div>
    </div>
  )
}

export default PerformanceTimes