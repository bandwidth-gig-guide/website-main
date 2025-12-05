import { SchemaExtensions } from "../interfaces";
import { PageType } from "../types";

export function buildSchemaWithExtensions(
  base: Record<string, any>,
  pageType: PageType,
  schemaExtension?: SchemaExtensions
) {
  if (!schemaExtension) return base;

  let longitude = 0;
  let latitude = 0;

  if (schemaExtension.googleMapsEmbed) {
    const urlParams = new URLSearchParams(schemaExtension.googleMapsEmbed.split('?')[1]);
    const pbParam = urlParams.get('pb');
    if (pbParam) {
      const coords = pbParam.match(/!2d([-\d.]+)!3d([-\d.]+)/);
      if (coords) {
        longitude = parseFloat(coords[1]);
        latitude = parseFloat(coords[2]);
      }
    }
  }

  switch (pageType) {

    case "event":
      return {
        ...base,
        startDate: schemaExtension.eventStartDate,
        endDate: schemaExtension.eventEndDate,
        eventStatus: schemaExtension.eventStatus,
        performer: schemaExtension.artistTitles?.map((titles) => ({ "@type": "MusicGroup", titles })),
        location: schemaExtension.venueName
          ? {
              "@type": "MusicVenue",
              name: schemaExtension.venueName,
              address: schemaExtension.venueAddress,
              geo: schemaExtension.googleMapsEmbed && {
                "@type": "GeoCoordinates",
                latitude: latitude,
                longitude: longitude,
              },
            }
          : undefined,
        offers: {
          "@type": "Offer",
          url: base.url,
          availability: "https://schema.org/InStock",
          price: schemaExtension.eventPrice ? schemaExtension.eventPrice : undefined,
          priceCurrency: "AUD",
        },
      };

    case "venue":
      return {
        ...base,
        address: schemaExtension.venueAddress,
        geo: schemaExtension.googleMapsEmbed && {
          "@type": "GeoCoordinates",
          latitude: latitude,
          longitude: longitude,
        },
      };

    case "artist":
      return {
        ...base,
        member: schemaExtension.artistTitles?.map((titles) => ({ "@type": "Person", titles })),
      };

    case "blog":
      return {
        ...base,
        datePublished: schemaExtension.articlePublished,
        dateModified: schemaExtension.articleUpdated,
        author: schemaExtension.articleAuthor ? { "@type": "Person", name: schemaExtension.articleAuthor } : undefined,
      };

    default:
      return base;
  }
}
