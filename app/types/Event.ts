export type Event = {
  eventId: uuid;
  venueId: uuid;
  stageId: uuid;
  title: string;
  description: string;
  startDateTime: Date;
  endDateTime: Date;
  originalPostUrl: string;
  ticketSaleUrl: string;
};