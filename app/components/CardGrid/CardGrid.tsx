import React from 'react'
import styles from './CardGrid.module.css'
import { CardGridType } from '../../types/enums/CardGridType'
import CardArtist from '../Card/CardArtist/CardArtist'
import CardVenue from '../Card/CardVenue/CardVenue'
import CardEvent from '../Card/CardEvent/CardEvent'

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
        {venueIds.slice(0, limit).map((venueId, index) => (
          <CardVenue key={index} venueId={venueId} />
        ))}
        {eventIds.slice(0, limit).map((eventId, index) => (
          <CardEvent key={index} eventId={eventId} />
        ))}

      </div>
    </div>
  )
}

export default CardGrid