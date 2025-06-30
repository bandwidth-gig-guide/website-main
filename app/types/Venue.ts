import { StateCode } from "./enums/StateCode";

export type Venue = {
  VenueID: string;
  Title: string;
  StreetAddress: string;
  City: string;
  StateCode: StateCode;
  PostCode: number;
  Description: string;
  WebsiteURL?: string;
  PhoneNumber: string;
};