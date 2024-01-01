export type Line =
{
    value: string,
    range: { start: number, end: number }
}

export type Lyrics = Line[]

export type SyncedLyrics =
{
    status: "synced",
    value: Lyrics
}

export type UnsyncedLyrics =
{
    status: "unsynced",
    value: string
}

export type LyricsObject = SyncedLyrics | UnsyncedLyrics | { status: "unavailable" | "instrumental" }