import React from 'react';
import styles from './Description.module.css'

interface Props {
  text: string;
  tags: string[];
  types: string[];
}

const Description: React.FC<Props> = ({ text, tags = [], types = [] }) => {

  const chips = [...types, ...tags];

  return (
    <div className={styles.wrapper}>
      <p>{text}</p>
      {chips.length > 0 && 
        <div className={styles.chipsWrapper}>
          {chips.map((chip, index) => (
            <span key={index} className={styles.chip}>{chip}</span>
          ))}
        </div>
      }
    </div>
  );
};

export default Description;