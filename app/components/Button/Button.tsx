import React from 'react'
import styles from './Button.module.css'

interface Props {
  text: string;
  onClick?: () => void;
}

const PerformanceTimes: React.FC<Props> = ({ text, onClick }) => {
  return (
    <div className={styles.wrapper}>
      <button onClick={onClick} >
        {text}
      </button>
    </div>
  )
}

export default PerformanceTimes