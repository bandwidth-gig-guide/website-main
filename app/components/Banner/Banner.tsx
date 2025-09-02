import React from 'react';
import styles from "./Banner.module.css";
import Link from "next/link";

function getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const Banner = () => {
  const randomColor = getRandomColor()
  return (
    <div className={styles.wrapper}>
      <Link href="/">
        <div className={styles.banner} style={{ background: randomColor }}>
          Banner :)
        </div>
      </Link>
    </div>
  )
}

export default Banner