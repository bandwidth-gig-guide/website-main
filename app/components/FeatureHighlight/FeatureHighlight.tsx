import React from 'react'
import styles from './FeatureHighlight.module.css'

interface Props {
    items: string[];
}

const FeatureHighlight: React.FC<Props> = ({ items }) => {
  return (
    <div className={styles.wrapper}>
        {items.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
    </div>
  )
}

export default FeatureHighlight