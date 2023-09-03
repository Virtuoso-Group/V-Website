export type Percentage = `${number}%`;

export type Line =
{
    value: string,
    range: { start: number, end: number }
}

export type Lyrics = Line[]

export type LyricsObject =
{
    status: "available" | "unavailable" | "instrumental",
    lyrics: Lyrics
}

export type Album = { name: string, coverArt: string }
export type Track =
{
    id: number,
    name: string,
    band: string,
    album: Album,
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


export type SeekLineFunctionType = (timestamp: number) => void;