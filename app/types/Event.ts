export type Event = {
  eventId: string;
  venueId: string;
  stageId: string;
  title: string;
  description: string;
  startDateTime: Date;
  endDateTime: Date;
  originalPostUrl: string;
  ticketSaleUrl: string;
};