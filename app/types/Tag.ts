type Tag = {
//  specializedId: uuid
    tag: string;
};

export type ArtistTag = {
    artistId: uuid;
} & Tag;

export type VenueTag = {
    venueId: uuid;
} & Tag;

export type EventTag = {
    eventId: uuid;
} & Tag;