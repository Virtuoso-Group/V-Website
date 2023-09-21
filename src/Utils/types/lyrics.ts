export type Line =
{
    value: string,
    range: { start: number, end: number }
}

export type Lyrics = Line[]

export type SyncedLyrics =
{
    status: "available",
    synced: true, 
    lyrics: Lyrics
}

export type UnsyncedLyrics =
{
    status: "available",
    synced: false, 
    lyrics: string
}

export type LyricsObject = SyncedLyrics | UnsyncedLyrics |{ status: "unavailable" | "instrumental" }