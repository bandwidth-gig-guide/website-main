import React from 'react';
import styles from './Embeds.module.css'
import SectionHeader from '../SectionHeader/SectionHeader';

interface Props {
  artistId?: uuid;
  eventId?: uuid;
  venueId?: uuid;
}

const Embeds: React.FC<Props> = ({ artistId, eventId, venueId }) => {
  return (
    <div className={styles.wrapper}>
      <SectionHeader title='Check Them Out' />
    </div>
  );
};

export default Embeds;