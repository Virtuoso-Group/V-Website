import { LyricsObject } from "./lyrics"

export type ArtistRelease =
{
    _id: string,
    title: string,
    coverArt: string,
    released: string
}

export type ArtistInfo =
{
    _id: string
    name: string,
    profilePhoto?: string,
}

export type ArtistsList = ArtistInfo[];

export type ArtistPageData =
{
    personal: ArtistInfo
    releases: ArtistRelease[]
}

export type Release = 
{ 
    _id: string,
    artist: Artist,
    title: string, 
    coverArt: string,
}


type Artist = 
{
    _id: string,
    name: string,
}
export type Track =
{
    _id: string,
    title: string,
    artist: 
    Artist,
    release: 
    {
        _id: string
       title: string,
       coverArt: string,
    },

    lyrics: LyricsObject,
}


export type PublishedTrack = 
{
    track: 
    {
        _id: string,
        no: number,
        title: string,
    },
    release: 
    {
        _id: string,
        coverArt: string,
        title: string,
    },

    artist: Artist
}
