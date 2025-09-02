import React from 'react';
import styles from "./Hero.module.css";

function getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const Hero = () => {
  const randomColor = getRandomColor()
  return (
    <div className={styles.wrapper}>
        <div className={styles.hero} style={{ background: randomColor }}>
          Hero
        </div>
    </div>
  )
}

export default Hero