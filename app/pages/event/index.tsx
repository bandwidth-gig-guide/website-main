import React, { useState, useMemo } from "react"
import Head from "next/head"

// Custom
import SectionHeader from "../../components/SectionHeader/SectionHeader"
import DateHeader from "../../components/DateHeader/DateHeader"
import CardGrid from "../../components/CardGrid/CardGrid"
import { CardGridType } from "../../types/enums/CardGridType"
import FilterEvent from "../../components/Filter/FilterEvent/FilterEvent"
import Button from "../../components/Button/Button"

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
      <Head>
        <title>Bandwidth | Events</title>
        <meta name="description" content="" />
      </Head>

      <div>
        <SectionHeader title="Events" />
        <FilterEvent setEventIdsByDate={setEventIdsByDate} />

        {visibleDates.map(([date, ids]) => (
          <div key={date} style={{ marginBottom: "var(--spacing-05)" }}>
            <DateHeader date={formatDate(date)} />
            <CardGrid eventIds={ids} cardGridType={CardGridType.Grid} limit={24} />
          </div>
        ))}

        {visibleDaysCount < sortedDates.length && (
          <Button text="Load More" onClick={handleLoadMore} />
        )}
      </div>
    </>
  )
}

export default Event
