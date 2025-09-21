import React from 'react'
import styles from './SubHeaderMessage.module.css'

const SubHeaderMessage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        You're early! The site is still under development, but you're welcome to look around while 
        we work. Check back on <strong>December 01, 2025</strong> for the official launch.
      </div>
    </div>
  )
}

export default SubHeaderMessage