import React, { useState, useRef, useEffect } from 'react'
import { CardArtist, CardEvent, CardVenue } from '@/components'
import { CardGridType } from '@/enums'
import styles from './CardGrid.module.css'

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

  const ids = [
    ...artistIds.map(id => ({ type: 'artist', id })),
    ...venueIds.map(id => ({ type: 'venue', id })),
    ...eventIds.map(id => ({ type: 'event', id }))
  ]

  const totalPages = Math.ceil(ids.length / limit)
  const shouldPaginate = isPaginated && totalPages > 1 && (cardGridType === CardGridType.Flex || cardGridType === CardGridType.Grid)

  useEffect(() => {
    setVisitedPages(prev => new Set(prev).add(page))
  }, [page])

  const handleScroll = () => {
    if (!shouldPaginate || !containerRef.current) return

    const scrollLeft = containerRef.current.scrollLeft
    const pageWidth = containerRef.current.clientWidth
    const newPage = Math.round(scrollLeft / pageWidth)

    if (newPage !== page) setPage(newPage)
  }

  const handleDotClick = (index: number) => {
    containerRef.current?.scrollTo({
      left: index * containerRef.current.clientWidth,
      behavior: 'smooth'
    })
    setPage(index)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.slider} ref={containerRef} onScroll={handleScroll} >
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <div key={pageIndex} className={styles.page}>
            {visitedPages.has(pageIndex) &&
              ids
                .slice(pageIndex * limit, (pageIndex + 1) * limit)
                .map((item, index) => {
                  switch (item.type) {
                    case 'artist':
                      return <CardArtist key={`artist-${item.id}-${index}`} artistId={item.id} />
                    case 'venue':
                      return <CardVenue key={`venue-${item.id}-${index}`} venueId={item.id} />
                    default:
                      return <CardEvent key={`event-${item.id}-${index}`} eventId={item.id} />
                  }
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
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default CardGrid
