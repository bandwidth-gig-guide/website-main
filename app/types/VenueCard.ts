import { StateCode } from './enums/StateCode'

export type VenueCard = {
  venueId: uuid;
  title: string;
  city: string;
  streetAddress: string;
  stateCode: StateCode;
  postCode: number;
	isFeatured: boolean;
	imageUrl?: string;
	upcomingEventCount: number;
};