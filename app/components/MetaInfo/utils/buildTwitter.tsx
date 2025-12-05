import { DEFAULT_IMAGE, TWITTER_HANDLE } from "../constants";

export function buildTwitter(
  title: string,
  description: string,
  twitterOverrides?: Partial<{
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  }>,
  image?: string,
  seoDescription?: string,
) {
  return {
      card: "summary_large_image",
      title: twitterOverrides?.title || `Bandwidth | ${title}`,
      description: twitterOverrides?.description || description,
      image: twitterOverrides?.image || image || DEFAULT_IMAGE,
      imageAlt: twitterOverrides?.imageAlt || seoDescription,
      site: TWITTER_HANDLE,
    }
}
