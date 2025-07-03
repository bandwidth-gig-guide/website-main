type Social = {
//  SpecializedID: string
    SocialPlatform: string;
    Handle: string;
    URL: string;
};

export type ArtistSocial = {
    ArtistID: string;
} & Social;

export type VenueSocial = {
    VenueID: string;
} & Social;

export type EventSocial = {
    EventID: string;
} & Social;