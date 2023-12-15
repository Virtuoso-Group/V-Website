import { LyricsObject } from "./lyrics"

export type Artist =
{
    _id: string
    name: string,
    image: string,
    albums: number[]
}

export type Album = 
{ 
    id: number,
    artistID: number,
    name: string, 
    coverArt: string,
}

export type Track =
{
    id: number,
    name: string,
    artistID: number,
    albumID: number,
    src: string,
    lyricsObj: LyricsObject,

    backgroundVideoSrc?: string
}
