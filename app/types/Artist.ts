import { StateCode } from "./enums/StateCode";

export type Artist = {
  ArtistID: string;
  Title: string;
  Country: string;
  City: string;
  StateCode: StateCode;
  YearFounded: string;
  Description: string;
  SpotifyEmbedUR?: string;
  YoutubeEmbedURL?: string;
};