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
    _id: string,
    artistID: 
    {
        _id: string,
        name: string   
    },
    title: string, 
    coverArt: string,
}

export type Track = any
// {
//     id: number,
//     name: string,
//     artistID: number,
//     albumID: number,
//     src: string,
//     lyricsObj: LyricsObject,

//     backgroundVideoSrc?: string
// }
