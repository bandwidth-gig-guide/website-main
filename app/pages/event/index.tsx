import React, { useState, useMemo } from 'react'
import { SectionHeader, DateHeader, CardGrid, FilterEvent, Button, Hero, MetaInfo } from '@/components'

const DAYS_LOADED = 10;

function formatDate(date: string): string {
  // date: "YYYYMMDD" (e.g. "20251002")
  const year = date.slice(0, 4)
  const month = date.slice(4, 6)
  const day = date.slice(6, 8)
  const dateIso = new Date(`${year}-${month}-${day}`)
  const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric", weekday: "long" }

  // formattedInitial: "Monday, October 20"
  const formattedInitial = dateIso.toLocaleDateString("en-US", options)
  const [weekday, rest] = formattedInitial.split(", ")

  // return "October 20, Monday"
  return `${rest}, ${weekday}`
}

const Event = () => {
  const [eventIdsByDate, setEventIdsByDate] = useState<Record<string, string[]>>({})
  const [visibleDaysCount, setVisibleDaysCount] = useState(DAYS_LOADED)

  const sortedDates = useMemo(() => {
    return Object.entries(eventIdsByDate).sort(([a], [b]) => a.localeCompare(b))
  }, [eventIdsByDate])

  const visibleDates = sortedDates.slice(0, visibleDaysCount)

  const handleLoadMore = () => {
    setVisibleDaysCount((prev) => prev + DAYS_LOADED)
  }

  return (
    <>
      <div>
        <Hero />
        <SectionHeader title="Events" scrollToTopOnClick={true} />
        <FilterEvent setEventIdsByDate={setEventIdsByDate} />

        {visibleDates.map(([date, ids]) => (
          <div key={date} style={{ marginBottom: "var(--spacing-05)" }}>
            <DateHeader date={formatDate(date)} />
            <CardGrid eventIds={ids} cardGridType={CardGridType.Grid} limit={8} isPaginated={true} />
          </div>
        ))}

        {visibleDaysCount < sortedDates.length && (
          <Button text="Load More" onClick={handleLoadMore} />
        )}
      </div>

      <MetaInfo
        pageType="search"
        title="Discover Melbourne Gigs, Events & Concerts"
        description="Find live music events, concerts, and gigs in Melbourne. Browse upcoming shows by date, venue, and genre — all in one place on Bandwidth."
        url="https://bandwidthmelbourne.com/event"
      />
    </>
  )
}

export default Event
