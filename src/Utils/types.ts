export type Percentage = `${number}%`;

export type Line =
{
    value: string,
    range: { start: number, end: number }
}

export type Lyrics = Line[]

export type Album = { name: string, coverArt: string }
export type Track =
{
    id: number,
    name: string,
    band: string,
    album: Album,
    src: string,
    lyrics: Lyrics
}

export enum PlayerState 
{ 
    STOPPED = "STOPPED", 
    PLAYING = "PLAYING", 
    PAUSED = "PAUSED", 
    SEEKING = "SEEKING" 
};


export type SeekLineFunctionType = (timestamp: number) => void;