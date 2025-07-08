import React from 'react';
import styles from './Chips.module.css'

interface Props {
  tags: string[];
  types: string[];
}

const Chips: React.FC<Props> = ({ tags = [], types = [] }) => {

  if (tags.length === 0 && types.length === 0) {
    return <div className={styles.empty}></div>;
  }

  return (
    <div className={styles.wrapper}>
      {types.map((type, index) => (
        <span key={index} className={styles.type}>{type}</span>
      ))}
      {tags.map((tag, index) => (
        <span key={index} className={styles.tag}>{tag}</span>
      ))}
    </div>
  );
};

export default Chips;