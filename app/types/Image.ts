type Image = {
//  specializedId: string
    imageId: string;
    displayOrder: Int16Array;
};

export type ArtistImage = {
    artistId: string;
} & Image;

export type VenueImage = {
    venueId: string;
} & Image;

export type EventImage = {
    eventId: string;
} & Image;