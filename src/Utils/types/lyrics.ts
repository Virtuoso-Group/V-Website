export type Interval =
{
    start: number, end: number
}
export type Line =
{
    value: string,
    interval: Interval
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

export type LyricsStatus = "Synced" | "Unsynced" | "Instrumental" | "Unavailable"

export type LyricsObject = SyncedLyrics | UnsyncedLyrics | { status: "Unavailable" | "Instrumental" }
