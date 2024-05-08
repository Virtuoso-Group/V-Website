type Track =
{
    _id: string,
    no: number,
    title: string,
    duration: number
}

type Artist = { _id: string, name: string };

export type SimpleRelease =
{ 
    _id: string, 
    title: string, 
    coverArt: string,
}

export type AlbumInfo =
{
    release: SimpleRelease,
    artist: Artist
}

export type AlbumPageData =
{
    _id: string,
    
    release:
    {
        coverArt: string,
        title: string,
        released: string,
        duration: number
    },

    tracks: Track[],
    artist: Artist,
}