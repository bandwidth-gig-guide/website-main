type Featured = {
//  specializedId: uuid
    imageId: uuid;
    startDateTime: Date;
    endDateTime: Date;
};

export type ArtistFeatured = {
    artistId: uuid;
} & Featured;

export type VenueFeatured = {
    venueId: uuid;
} & Featured;

export type EventFeatured = {
    eventId: uuid;
} & Featured;