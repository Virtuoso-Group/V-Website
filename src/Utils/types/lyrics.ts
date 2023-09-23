export type Line =
{
    value: string,
    range: { start: number, end: number }
}

export type Lyrics = Line[]

export type SyncedLyrics =
{
    status: "available",
    isSynced: true, 
    lyrics: Lyrics
}

export type UnsyncedLyrics =
{
    status: "available",
    isSynced: false, 
    lyrics: string
}

export type LyricsObject = SyncedLyrics | UnsyncedLyrics | { status: "unavailable" | "instrumental" }