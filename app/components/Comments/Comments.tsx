import React from 'react';
import styles from './Comments.module.css'
import SectionHeader from '../SectionHeader/SectionHeader';

interface Props {
  artistId?: uuid;
  eventId?: uuid;
  venueId?: uuid;
}

const Comments: React.FC<Props> = ({ artistId, eventId, venueId }) => {
  return (
    <div className={styles.wrapper}>
      <SectionHeader title='Comments' />
    </div>
  );
};

export default Comments;