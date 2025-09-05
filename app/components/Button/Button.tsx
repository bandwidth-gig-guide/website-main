import React from 'react'
import styles from './Button.module.css'

interface Props {
  text: string;
  onClick?: () => void;
  isDisabled?: boolean;
}

const PerformanceTimes: React.FC<Props> = ({ text, onClick, isDisabled = false }) => {
  return (
    <div className={styles.wrapper}>
      <button
        onClick={onClick}
        disabled={isDisabled}
        className={isDisabled ? styles.disabled : ''}

        
      >
        {text}
      </button>
    </div>
  )
}

export default PerformanceTimes