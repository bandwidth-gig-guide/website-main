import React from 'react'
import styles from './CardGrid.module.css'
import { CardGridType } from '../../types/enums/CardGridType'
import CardArtist from '../Card/CardArtist/CardArtist'
interface Props {
  eventIds?: uuid[],
  artistIds?: uuid[],
  venueIds?: uuid[],
  cardGridType?: CardGridType,
  limit?: number
}

const CardGrid: React.FC<Props> = ({
  eventIds = [], 
  artistIds = [], 
  venueIds = [], 
  cardGridType = CardGridType.Grid,
  limit = 8
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={
        cardGridType === CardGridType.Flex ? styles.flex :
        cardGridType === CardGridType.Row ? styles.row :
        styles.grid 
      }>
        {artistIds.slice(0, limit).map((artistId, index) => (
          <CardArtist key={index} artistId={artistId} />
        ))}
      </div>
    </div>
  )
}

export default CardGrid