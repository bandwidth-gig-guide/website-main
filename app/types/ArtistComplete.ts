import { StateCode } from "./enums/StateCode";
import { Social } from "./Social";

export type ArtistComplete = {
  artistId: uuid;
  title: string;
  country: string;
  city: string;
  stateCode: StateCode;
  yearFounded: string;
  description: string;
  spotifyEmbedUrl?: string;
  youtubeEmbedUrl?: string;
  isFeatured: boolean;
  images: string[];
  socials: Social[];
  types: string[];
  tags: string[];
};