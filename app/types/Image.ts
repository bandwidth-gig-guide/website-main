type Image = {
//  specializedId: uuid
    imageId: uuid;
    displayOrder: number;
};

export type ArtistImage = {
    artistId: uuid;
} & Image;

export type VenueImage = {
    venueId: uuid;
} & Image;

export type EventImage = {
    eventId: uuid;
} & Image;