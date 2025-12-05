import { DEFAULT_KEYWORDS, PAGE_TYPE_MAP } from "../constants";
import { Props } from "../interfaces";
import { buildSchemaBase } from "./buildSchemaBase";
import { buildSchemaWithExtensions } from "./buildSchemaWithExtensions";
import { buildJsonLdBlocks } from "./buildJsonLdBlocks";
import { buildOpenGraph } from "./buildOpenGraph";
import { buildTwitter } from "./buildTwitter"

export function buildInfo(props: Props) {
  const {
    pageType,
    title,
    description,
    seoDescription = description,
    url,
    image,
    keywords = [],
    schemaExtensions,
    extraSchemas = [],
    ogOverrides = {},
    twitterOverrides = {},
    breadcrumbList,
  } = props;

  const config = PAGE_TYPE_MAP[pageType];

  const fullTitle: string = `Bandwidth | ${title}`;
  const mergedKeywords: string = [...DEFAULT_KEYWORDS, ...keywords].join(", ");

  const baseSchema = buildSchemaBase(config.schema, url, description);
  const mainSchema = buildSchemaWithExtensions(baseSchema, pageType, schemaExtensions);
  const jsonLdBlocks = buildJsonLdBlocks(mainSchema, extraSchemas, breadcrumbList)
  const openGraph = buildOpenGraph(title, url, description, ogOverrides, image, seoDescription);
  const twitter = buildTwitter(title, description, twitterOverrides, image, seoDescription);

  return {
    titleTag: fullTitle,
    robots: config.robots,
    ogType: ogOverrides.type || config.ogType,
    mergedKeywords,
    jsonLdBlocks,
    openGraph: openGraph,
    twitter: twitter
  };
}
