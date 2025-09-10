import React from 'react'
import { PageType } from '../../types/enums/PageType';
import styles from './Chip.module.css'
import Link from "next/link";


interface Props {
  title: string;
  subtitle: string;
  imageUrl: url;
  pageType: PageType;
  id: uuid;
}

const PerformanceTimes: React.FC<Props> = ({ title, subtitle, imageUrl, pageType, id }) => {
  const route = `/${pageType}/${id}`

  return (
      <Link href={route}>
        <div className={styles.wrapper}>
          <div className={styles.imgWrapper}>
            <img src={imageUrl} alt={title} />
          </div>
            <div>
              <h5>{title}</h5>
              <h6>{subtitle}</h6>
            </div>
        </div>
      </Link>
  )
}

export default PerformanceTimes