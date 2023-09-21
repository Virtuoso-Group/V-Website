import { LyricsObject } from "./lyrics"

export type Artist =
{
    id: number
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
    lyricsObj: LyricsObject
}

export enum PlayerState 
{ 
    STOPPED = "STOPPED", 
    PLAYING = "PLAYING", 
    PAUSED = "PAUSED", 
    SEEKING = "SEEKING" 
};