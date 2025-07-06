type Type = {
//  specializedID: string
    type: string;
};

export type ArtistType = {
    artistId: string;
} & Type;

export type VenueType = {
    venueId: string;
} & Type;

export type EventType = {
    eventId: string;
} & Type;