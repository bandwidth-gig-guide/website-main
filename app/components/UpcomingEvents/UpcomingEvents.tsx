import React from 'react';
import styles from './UpcomingEvents.module.css'
import SectionHeader from '../SectionHeader/SectionHeader';
import CardGrid from '../CardGrid/CardGrid';

interface Props {
  eventIds?: uuid[];
}

const message = `
  No events on record. We keep our records as accurate as possible, but we're not always up-to-date, 
  and we don't track every venue in Melbourne (yet!) Check out the socials and official postings for 
  the latest updates and events we might have missed!
`

const UpcomingEvents: React.FC<Props> = ({ eventIds }) => {
  return (
    <div className={styles.wrapper}>
      <SectionHeader title='Upcoming Events' route='/event' />
      <CardGrid eventIds={eventIds} limit={8} isPaginated={true} />
      {eventIds?.length === 0 &&
        <>
          <p className={styles.noEventsMessage}>
            No events on record.
          </p>
          <div className={styles.disclaimerWrapper}>
          <p>
            We keep our records as accurate as possible, but we're not always up-to-date, and we 
            don't track every venue in Melbourne (yet!)
          </p>
          <p>
            Check out the socials and official postings for the latest updates and events we might 
            have missed!
          </p>
          </div>
        </>
      }
      {/* <div className={styles.disclaimerWrapper}>
        <p className={styles.disclaimer}>We keep our records as accurate as possible, but we're not always up-to-date, and we don't track every venue in Melbourne (yet!)</p>
        <p className={styles.disclaimer}>Check out the socials and official postings for the latest updates and events we might have missed!</p>
      </div> */}
    </div >
  );
};

export default UpcomingEvents;