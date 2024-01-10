export type Line =
{
    value: string,
    interval: { start: number, end: number }
}

export type Lyrics = Line[]

export type SyncedLyrics =
{
    status: "Synced",
    value: Lyrics
}

export type UnsyncedLyrics =
{
    status: "Unsynced",
    value: string
}

export type LyricsObject = SyncedLyrics | UnsyncedLyrics | { status: "Unavailable" | "Instrumental" }