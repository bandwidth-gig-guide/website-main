import React, { useState, useRef, useEffect } from 'react'
import styles from './CardGrid.module.css'
import { CardGridType } from '@/enums'
import CardArtist from '../Card/CardArtist/CardArtist'
import CardVenue from '../Card/CardVenue/CardVenue'
import CardEvent from '../Card/CardEvent/CardEvent'

interface Props {
  eventIds?: uuid[],
  artistIds?: uuid[],
  venueIds?: uuid[],
  cardGridType?: CardGridType,
  limit?: number,
  isPaginated?: boolean
}

const CardGrid: React.FC<Props> = ({
  eventIds = [],
  artistIds = [],
  venueIds = [],
  cardGridType = CardGridType.Grid,
  limit = 8,
  isPaginated = false
}) => {
  const [page, setPage] = useState(0)
  const [visitedPages, setVisitedPages] = useState<Set<number>>(new Set([0]))
  const containerRef = useRef<HTMLDivElement | null>(null)

  // Merge all IDs into one flat array
  const items = [
    ...artistIds.map(id => ({ type: 'artist', id })),
    ...venueIds.map(id => ({ type: 'venue', id })),
    ...eventIds.map(id => ({ type: 'event', id }))
  ]

  const totalPages = Math.ceil(items.length / limit)
  const shouldPaginate =
    isPaginated &&
    totalPages > 1 &&
    (cardGridType === CardGridType.Flex || cardGridType === CardGridType.Grid)

  // Mark current page as visited
  useEffect(() => {
    setVisitedPages(prev => new Set(prev).add(page))
  }, [page])

  // Track scroll → update page index
  const handleScroll = () => {
    if (!containerRef.current) return
    const scrollLeft = containerRef.current.scrollLeft
    const pageWidth = containerRef.current.clientWidth
    const newPage = Math.round(scrollLeft / pageWidth)
    if (newPage !== page) setPage(newPage)
  }

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.slider}
        ref={containerRef}
        onScroll={shouldPaginate ? handleScroll : undefined}
      >
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <div key={pageIndex} className={styles.page}>
            {visitedPages.has(pageIndex) &&
              items
                .slice(pageIndex * limit, (pageIndex + 1) * limit)
                .map((item, index) => {
                  if (item.type === 'artist') {
                    return (
                      <CardArtist
                        key={`artist-${item.id}-${index}`}
                        artistId={item.id}
                      />
                    )
                  }
                  if (item.type === 'venue') {
                    return (
                      <CardVenue
                        key={`venue-${item.id}-${index}`}
                        venueId={item.id}
                      />
                    )
                  }
                  return (
                    <CardEvent
                      key={`event-${item.id}-${index}`}
                      eventId={item.id}
                    />
                  )
                })}
          </div>
        ))}
      </div>

      {shouldPaginate && (
        <div className={styles.dots}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${page === index ? styles.active : ''}`}
              onClick={() => {
                containerRef.current?.scrollTo({
                  left: index * containerRef.current.clientWidth,
                  behavior: 'smooth'
                })
                setPage(index)
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default CardGrid
