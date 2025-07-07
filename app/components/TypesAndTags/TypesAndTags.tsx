import React from 'react';
import styles from './TypesAndTags.module.css'
import { PageType } from '../../types/enums/PageType';

interface Props {
  id: string;
  pageType: PageType
}

const TypesAndTags: React.FC<Props> = ({ id, pageType }) => {

  const types = [
    "Band"
  ]

  const tags = [
    "Rock",
    "Folk",
    "Hip Hop"
  ]

  return (
    <div className={styles.wrapper}>
      {types.map(type => (
        <span className={styles.type}>{type}</span>
      ))}
      {tags.map(tag => (
        <span className={styles.tag}>{tag}</span>
      ))}
    </div>
  );
};

export default TypesAndTags;