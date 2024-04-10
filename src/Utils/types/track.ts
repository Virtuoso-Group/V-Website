import { LyricsObject } from "./lyrics"

export type ArtistRelease =
{
    _id: string,
    title: string,
    coverArt: string,
    released: string
}

export type Artist =
{
    _id: string
    name: string,
    profilePhoto?: string,
    releases: ArtistRelease[]
}

export type Release = 
{ 
    _id: string,
    artist: 
    {
        _id: string,
        name: string   
    },
    title: string, 
    coverArt: string,
}

export type Track =
{
    _id: string,
    title: string,
    artist: 
    {
        _id: string,
        name: string,
    },
    release: 
    {
        _id: string
       title: string,
       coverArt: string,
    },

    lyrics: LyricsObject,
}
