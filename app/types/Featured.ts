type Featured = {
//  SpecializedID: string
    ImageID: string;
    StartDateTime: Date;
    EndDateTime: Date;
};

export type ArtistFeatured = {
    ArtistID: string;
} & Featured;

export type VenueFeatured = {
    VenueID: string;
} & Featured;

export type EventFeatured = {
    EventID: string;
} & Featured;