type Tag = {
//  specializedId: string
    tag: string;
};

export type ArtistTag = {
    artistId: string;
} & Tag;

export type VenueTag = {
    venueId: string;
} & Tag;

export type EventTag = {
    eventId: string;
} & Tag;