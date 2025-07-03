type Image = {
//  SpecializedID: string
    ImageID: string;
    DisplayOrder: Int16Array;
};

export type ArtistImage = {
    ArtistID: string;
} & Image;

export type VenueImage = {
    VenueID: string;
} & Image;

export type EventImage = {
    EventID: string;
} & Image;