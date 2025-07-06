import { StateCode } from "./enums/StateCode";

export type Venue = {
  venueId: uuid;
  title: string;
  streetAddress: string;
  city: string;
  stateCode: StateCode;
  postCode: number;
  description: string;
  websiteUrl?: string;
  phoneNumber: string;
};