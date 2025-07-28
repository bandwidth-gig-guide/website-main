import React from 'react'
import styles from './CardLoading.module.css'

const CardLoading = () => {
  return (
    <div className={styles.wrapper}>
			<div className={styles.imgWrapper} />
			<div className={styles.text}>
				<div className={styles.small50} />
				<div className={styles.small10} />
			</div>
			<div className={styles.text}>
				<div className={styles.large80} />
			</div>			
      <div className={styles.text}>
				<div className={styles.small25} />
			</div>	
    </div>
  )
}

export default CardLoading