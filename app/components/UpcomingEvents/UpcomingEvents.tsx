import React from 'react';
import styles from './UpcomingEvents.module.css'
import SectionHeader from '../SectionHeader/SectionHeader';
import CardGrid from "../../components/CardGrid/CardGrid";
import { CardGridType } from "../../types/enums/CardGridType";

interface Props {
  eventIds?: uuid[];
}

const UpcomingEvents: React.FC<Props> = ({ eventIds }) => {
  return (
    <div className={styles.wrapper}>
      <SectionHeader title='Upcoming Events' route='/event' />
      <CardGrid eventIds={eventIds} cardGridType={CardGridType.Row} />
      <div className={styles.disclaimerWrapper}>
        <p className={styles.disclaimer}>We keep our records as accurate as possible, but we're not always up-to-date, and we don't track every venue in Melbourne (yet!)</p>
        <p className={styles.disclaimer}>Check out the socials and official postings for the latest updates and events we might have missed!</p>
      </div>
    </div>
  );
};

export default UpcomingEvents;