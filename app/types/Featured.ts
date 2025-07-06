type Featured = {
//  specializedId: string
    imageId: string;
    startDateTime: Date;
    endDateTime: Date;
};

export type ArtistFeatured = {
    artistId: string;
} & Featured;

export type VenueFeatured = {
    venueId: string;
} & Featured;

export type EventFeatured = {
    eventId: string;
} & Featured;