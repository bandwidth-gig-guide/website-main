import { DEFAULT_IMAGE } from "../constants";

export function buildOpenGraph(
  title: string,
  url: string, 
  description: string,
  ogOverrides?: Partial<{
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    type: string;
  }>,
  image?: string,
  seoDescription?: string,
) {
  return {
      siteName: "Bandwidth Melbourne Gig Guide",
      image: ogOverrides?.image || image || DEFAULT_IMAGE,
      imageAlt: ogOverrides?.imageAlt || seoDescription,
      url,
      title: ogOverrides?.title || `Bandwidth | ${title}`,
      description: ogOverrides?.description || description,
    }
}
