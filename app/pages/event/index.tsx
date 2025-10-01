import React, { useState, useMemo } from "react"
import Head from "next/head"

// Custom
import SectionHeader from "../../components/SectionHeader/SectionHeader"
import DateHeader from "../../components/DateHeader/DateHeader"
import CardGrid from "../../components/CardGrid/CardGrid"
import { CardGridType } from "@/enums"
import FilterEvent from "../../components/Filter/FilterEvent/FilterEvent"
import Button from "../../components/Button/Button"
import Hero from "../../components/Hero/Hero"

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

      <Head>
        {/* Title & Meta */}
        <title>Bandwidth | Live Music Events in Melbourne</title>
        <meta
          name="description"
          content="Find live music events, concerts, and gigs in Melbourne. Browse upcoming shows by date, venue, and genre — all in one place on Bandwidth."
        />

        {/* Open Graph */}
        <meta property="og:site_name" content="Bandwidth Melbourne Gig Guide" />
        <meta property="og:title" content="Bandwidth | Live Music Events in Melbourne" />
        <meta
          property="og:description"
          content="Find live music events, concerts, and gigs in Melbourne. Browse upcoming shows by date, venue, and genre — all in one place on Bandwidth."
        />
        <meta property="og:image" content="/default-event.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bandwidth.melbourne/event" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bandwidth | Live Music Events in Melbourne" />
        <meta
          name="twitter:description"
          content="Find live music events, concerts, and gigs in Melbourne. Browse upcoming shows by date, venue, and genre — all in one place on Bandwidth."
        />
        <meta name="twitter:image" content="/default-event.jpg" />
        <meta name="twitter:site" content="@BandwidthMelb" />

        {/* Canonical */}
        <link rel="canonical" href="https://bandwidth.melbourne/event" />

        {/* JSON-LD Structured Data (CollectionPage of MusicEvents) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "Melbourne Live Music Events",
              description:
                "Find live music events, concerts, and gigs in Melbourne. Browse upcoming shows by date, venue, and genre — all in one place on Bandwidth.",
              url: "https://bandwidth.melbourne/event",
              isPartOf: {
                "@type": "WebSite",
                name: "Bandwidth Melbourne Gig Guide",
                url: "https://bandwidth.melbourne",
              },
              about: {
                "@type": "MusicEvent",
                name: "Live Music Events in Melbourne",
              },
            }),
          }}
        />
      </Head>

    </>
  )
}

export default Event
