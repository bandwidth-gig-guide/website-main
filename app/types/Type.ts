type Type = {
//  specializedId: uuid
    type: string;
};

export type ArtistType = {
    artistId: uuid;
} & Type;

export type VenueType = {
    venueId: uuid;
} & Type;

export type EventType = {
    eventId: uuid;
} & Type;