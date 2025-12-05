export function buildSchemaBase(schemaType: string, url: string, description: string) {
  return { 
    "@context": "https://schema.org", 
    "@type": schemaType, 
    name: "Bandwidth Melbourne Gig Guide", 
    url, 
    description 
  };
}
