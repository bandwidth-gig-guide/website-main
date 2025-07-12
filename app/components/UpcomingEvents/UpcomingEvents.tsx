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
      <SectionHeader title='Upcoming Events' />
      <CardGrid eventIds={eventIds} cardGridType={CardGridType.Row}/>
    </div>
  );
};

export default UpcomingEvents;