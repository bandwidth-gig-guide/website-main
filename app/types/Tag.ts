type Tag = {
//  SpecializedID: string
    Tag: string;
};

export type ArtistTag = {
    ArtistID: string;
} & Tag;

export type VenueTag = {
    VenueID: string;
} & Tag;

export type EventTag = {
    EventID: string;
} & Tag;