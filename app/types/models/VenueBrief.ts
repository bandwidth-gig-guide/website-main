export type VenueBrief = {
    venueId: uuid;
    title: string;
    city: string;
    streetAddress: string;
    stateCode: statecode;
    postCode: number;
    isFeatured: boolean;
    imageUrl?: url;
    upcomingEventCount: number;
}
