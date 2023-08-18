export type Percentage = `${number}%`;

export type Line =
{
    value: string,
    range: { start: number, end: number }
}

export type Lyrics = Line[]

export type Track =
{
    name: string,
    band: string,
    album: { name: string, coverArt: string },
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