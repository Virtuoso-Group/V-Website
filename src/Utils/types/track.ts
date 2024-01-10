import { LyricsObject } from "./lyrics"

export type Artist =
{
    _id: string
    name: string,
    image: string,
    albums: number[]
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
    },

    lyrics: LyricsObject,
}
