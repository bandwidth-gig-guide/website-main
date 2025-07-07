import React from 'react';
import styles from './Socials.module.css'
import SectionHeader from '../SectionHeader/SectionHeader';

interface Props {
  artistId?: uuid;
  eventId?: uuid;
  venueId?: uuid;
}

const Socials: React.FC<Props> = ({ artistId, eventId, venueId }) => {
  return (
    <div className={styles.wrapper}>
      <SectionHeader title='Socials' />
    </div>
  );
};

export default Socials;