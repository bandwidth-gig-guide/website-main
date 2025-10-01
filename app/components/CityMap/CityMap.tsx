// React / Next
import React, { useState } from "react"
import styles from "./CityMap.module.css"

import { SectionHeader } from '@/components';

const melbourne = "https://www.google.com/maps/d/embed?mid=1XnFb-G5D2UeK2wSUFVqxgBii8aeZ_lQ&ehbc=2E312F"

const CityMap = () => {

  return (
    <div className={styles.wrapper}>
      <SectionHeader title="Explore" />
      <iframe
        src={melbourne}
        loading='lazy'
      />
    </div>
  );
};

export default CityMap;
