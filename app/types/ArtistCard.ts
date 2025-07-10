import { StateCode } from "./enums/StateCode";

export type Artist = {
  artistId: uuid;
  title: string;
  country: string;
  city: string;
  stateCode: StateCode;
  yearFounded: string;
  description: string;
  spotifyEmbedUrl?: string;
  youtubeEmbedUrl?: string;
};