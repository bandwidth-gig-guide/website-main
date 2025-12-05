export function buildJsonLdBlocks(
  mainSchema: Record<string, any>,
  extraSchemas: Array<Record<string, any>>,
  breadcrumbList?: Array<{ name: string; url: string }>
) {

  const breadcrumbSchema =
    breadcrumbList && breadcrumbList.length > 0
      ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbList.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }
      : null;

  return [mainSchema, ...(breadcrumbSchema ? [breadcrumbSchema] : []), ...extraSchemas];
}
