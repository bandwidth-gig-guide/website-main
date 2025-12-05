export const PAGE_TYPE_MAP = {
  homepage: { schema: "WebSite", ogType: "website", robots: "index, follow" },
  search: { schema: "CollectionPage", ogType: "website", robots: "index, follow" },
  venue: { schema: "MusicVenue", ogType: "place", robots: "index, follow" },
  artist: { schema: "MusicGroup", ogType: "profile", robots: "index, follow" },
  event: { schema: "MusicEvent", ogType: "event", robots: "index, follow" },
  about: { schema: "WebPage", ogType: "website", robots: "index, follow" },
  blog: { schema: "BlogPosting", ogType: "article", robots: "index, follow" },
  generic: { schema: "WebPage", ogType: "website", robots: "index, follow" },
};