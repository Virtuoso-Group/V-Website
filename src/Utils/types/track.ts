import { SimpleRelease } from "./album"
import { SimpleArtist } from "./artist"
import { LyricsObject, SyncedLyrics, UnavailableLyrics, UnsyncedLyrics } from "./lyrics"

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

export type Track =
{
    _id: string,
    title: string,
    artist: SimpleArtist,
    release: 
    {
        _id: string
       title: string,
       coverArt: string,
    },

    lyrics: LyricsObject,
}

type SimpleTrack = { _id: string, no: number, title: string }

export type SimplePublishedTrack = 
{
    track: SimpleTrack,
    release: SimpleRelease,
    artist: SimpleArtist
}

export type TrackWithType = 
{
    _id: string,
    title: string,
    duration: number,
    type: "song" | "instrumental"
}

export type PublishedTrack = 
{
    track: TrackWithType,

    release: SimpleRelease,

    artist: SimpleArtist,
    
    lyrics?: SyncedLyrics | UnsyncedLyrics | UnavailableLyrics
}