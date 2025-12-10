import React, { useState, useEffect, useRef } from 'react'
import { CardArtist, CardEvent, CardVenue } from '@/components'
import styles from './CardGrid.module.css'

const MIN_COLUMN_WIDTH = 320
const GRID_GAP = 16

interface Props {
  eventIds?: string[]
  artistIds?: string[]
  venueIds?: string[]
  rowsPerPageDesktop?: number
  rowsPerPageTablet?: number
  rowsPerPageMobile?: number
  allowLoadMore?: boolean
  showTally?: boolean
}

const CardGrid: React.FC<Props> = ({
  eventIds = [],
  artistIds = [],
  venueIds = [],
  rowsPerPageDesktop = 2,
  rowsPerPageTablet = 4,
  rowsPerPageMobile = 8,
  allowLoadMore = false,
  showTally = false
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [cardsPerPage, setCardsPerPage] = useState(0)
  const [visiblePages, setVisiblePages] = useState(1)

  const ids = [
    ...artistIds.map(id => ({ type: 'artist', id })),
    ...venueIds.map(id => ({ type: 'venue', id })),
    ...eventIds.map(id => ({ type: 'event', id }))
  ]

  const getRowsPerPage = () => {
    const width = window.innerWidth
    if (width >= 1024) return rowsPerPageDesktop
    if (width >= 768) return rowsPerPageTablet
    return rowsPerPageMobile
  }

  useEffect(() => {
    const calculateCardsPerPage = () => {
      if (!containerRef.current) return
      const containerWidth = containerRef.current.offsetWidth
      const cardsPerRow = Math.floor((containerWidth + GRID_GAP) / (MIN_COLUMN_WIDTH + GRID_GAP)) || 1
      const rows = getRowsPerPage()
      setCardsPerPage(cardsPerRow * rows)
    }

    calculateCardsPerPage()
    window.addEventListener('resize', calculateCardsPerPage)
    return () => window.removeEventListener('resize', calculateCardsPerPage)
  }, [rowsPerPageDesktop, rowsPerPageTablet, rowsPerPageMobile])

  const totalPages = cardsPerPage ? Math.ceil(ids.length / cardsPerPage) : 0
  const handleLoadMore = () => setVisiblePages(prev => Math.min(prev + 1, totalPages))
  const visibleCards = cardsPerPage ? ids.slice(0, visiblePages * cardsPerPage) : []

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <div className={styles.grid}>
        {visibleCards.map((item, index) => {
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

        <div className={styles.loadMoreWrapper}>
          {allowLoadMore && visiblePages < totalPages && (
            <button className={styles.loadMoreButton} onClick={handleLoadMore}>
              Load More
            </button>
          )}
          {showTally &&
            <p className={styles.counter}>
              (Showing {visibleCards.length} of {ids.length})
            </p>
          }
        </div>
    </div>
  )
}

export default CardGrid;
