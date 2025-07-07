import React from 'react';
import styles from './UpcomingEvents.module.css'
import SectionHeader from '../SectionHeader/SectionHeader';

interface Props {
  artistId?: uuid;
  eventId?: uuid;
  venueId?: uuid;
}

const UpcomingEvents: React.FC<Props> = ({ artistId, eventId, venueId }) => {
  return (
    <div className={styles.wrapper}>
      <SectionHeader title='Upcoming Events' />
    </div>
  );
};

export default UpcomingEvents;