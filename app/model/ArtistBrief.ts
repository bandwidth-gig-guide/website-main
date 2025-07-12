export type ArtistBrief = {
    artistId: uuid;
    title: string;
    country: string;
    city: string;
    isFeatured: boolean;
    imageUrl?: url;
    upcomingEventCount: number;
}