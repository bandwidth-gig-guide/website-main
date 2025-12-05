import { PageType } from "./types";


export interface Props {
  pageType: PageType;
  title: string;
  description: string;
  seoDescription?: string;
  url: string;
  image?: string;
  keywords?: string[];
  schemaExtensions?: SchemaExtensions;
  extraSchemas?: Array<Record<string, any>>;
  ogOverrides?: Partial<{
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    type: string;
  }>;
  twitterOverrides?: Partial<{
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  }>;
  breadcrumbList?: Array<{ name: string; url: string }>;
}


export interface SchemaExtensions {
  eventStartDate?: string;
  eventEndDate?: string;
  eventStatus?: string;
  eventPrice?: number;
  venueName?: string;
  venueAddress?: string;
  googleMapsEmbed?: string;
  artistTitles?: string[];
  articlePublished?: string;
  articleUpdated?: string;
  articleAuthor?: string;
}