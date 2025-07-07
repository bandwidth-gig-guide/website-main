import React from 'react';
import styles from './Description.module.css'

interface Props {
  text: string;
}

const Description: React.FC<Props> = ({ text }) => {
  return (
    <div className={styles.wrapper}>
      <p>{text}</p>
    </div>
  );
};

export default Description;