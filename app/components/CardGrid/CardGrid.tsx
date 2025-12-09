import React, { useState, useRef, useEffect, useCallback } from 'react'
import { CardArtist, CardEvent, CardVenue } from '@/components'
import { CardGridType } from '@/enums'
import styles from './CardGrid.module.css'

interface Props {
  eventIds?: uuid[]
  artistIds?: uuid[]
  venueIds?: uuid[]
  cardGridType?: CardGridType
  limit?: number
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
  const containerBottomRef = useRef<HTMLDivElement | null>(null)
  const ticking = useRef(false)

  const [isComponentOnScreen, setIsComponentOnScreen] = useState(false)
  const [isComponentBottomOnScreen, setIsComponentBottomOnScreen] = useState(false)

  const ids = [
    ...artistIds.map(id => ({ type: 'artist', id })),
    ...venueIds.map(id => ({ type: 'venue', id })),
    ...eventIds.map(id => ({ type: 'event', id }))
  ]

  const totalPages = Math.ceil(ids.length / limit)

  const shouldPaginate =
    isPaginated &&
    totalPages > 1 &&
    (cardGridType === CardGridType.Flex || cardGridType === CardGridType.Grid)

  useEffect(() => {
    setVisitedPages(prev => new Set(prev).add(page))
  }, [page])

  const handleScroll = useCallback(() => {
    if (!shouldPaginate || !containerRef.current || ticking.current) return

    ticking.current = true

    requestAnimationFrame(() => {
      const el = containerRef.current
      if (!el) return

      const scrollLeft = el.scrollLeft
      const pageWidth = el.clientWidth
      const newPage = Math.round(scrollLeft / pageWidth)

      if (newPage !== page) {
        setPage(newPage)
      }

      ticking.current = false
    })
  }, [page, shouldPaginate])

  useEffect(() => {
    if (!containerRef.current || !containerBottomRef.current) return

    const topObserver = new IntersectionObserver(
      ([entry]) => {
        setIsComponentOnScreen(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    const bottomObserver = new IntersectionObserver(
      ([entry]) => {
        setIsComponentBottomOnScreen(entry.isIntersecting)
      },
      { threshold: 0.2 }
    )

    topObserver.observe(containerRef.current)
    bottomObserver.observe(containerBottomRef.current)

    return () => {
      topObserver.disconnect()
      bottomObserver.disconnect()
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.slider}
        ref={containerRef}
        onScroll={handleScroll}
      >
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <div key={pageIndex} className={styles.page}>
            {visitedPages.has(pageIndex) &&
              ids
                .slice(pageIndex * limit, (pageIndex + 1) * limit)
                .map((item, index) => {
                  switch (item.type) {
                    case 'artist':
                      return ( <CardArtist key={`artist-${item.id}-${index}`} artistId={item.id} /> )
                    case 'venue':
                      return ( <CardVenue key={`venue-${item.id}-${index}`} venueId={item.id} /> )
                    default:
                      return ( <CardEvent key={`event-${item.id}-${index}`} eventId={item.id} /> )
                  }
                })}
          </div>
        ))}
      </div>

      {shouldPaginate && (
        <div
          className={`
            ${styles.pagePill}
            ${isComponentOnScreen && !isComponentBottomOnScreen ? styles.pillVisible : styles.pillHidden}
            ${isComponentBottomOnScreen ? styles.pillAbsolute : styles.pillFixed}
          `}
        >
          <span>{page + 1}</span> / <span>{totalPages}</span>
        </div>
      )}

      <div className={styles.containerBottomRef} ref={containerBottomRef} />
    </div>
  )
}

export default CardGrid
