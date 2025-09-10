import React from 'react'
import styles from './CardRow.module.css'
import CardEvent from '../Card/CardEvent/CardEvent'
import CardArtist from '../Card/CardArtist/CardArtist'
import CardVenue from '../Card/CardVenue/CardVenue'

interface Props {
  eventIds?: uuid[],
  artistIds?: uuid[],
  venueIds?: uuid[],
  limit?: number,
}

const CardRow: React.FC<Props> = ({ eventIds = [], artistIds = [], venueIds = [], limit = 8, }) => {

  const allIds = [
    ...artistIds.map(id => ({ id, type: 'artist' })),
    ...venueIds.map(id => ({ id, type: 'venue' })),
    ...eventIds.map(id => ({ id, type: 'event' }))
  ].slice(0, limit)

  return (
    <div className={styles.wrapper}>
      <div className={styles.internalWrapper}>
        {allIds.map((card, index) => {
          if (card.type === 'artist') { return ( <CardArtist key={index} artistId={card.id} /> )}
          if (card.type === 'event') { return ( <CardEvent key={index} eventId={card.id} /> )}
          if (card.type === 'venue') { return ( <CardVenue key={index} venueId={card.id} /> )}
        })}
      </div>
    </div>
  )
}

export default CardRow
