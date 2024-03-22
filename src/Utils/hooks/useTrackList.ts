import { useState } from "react"

type Playlist =
{
    trackIDs: string[],
    index: number
}

const defaultValue: Playlist = 
{
    trackIDs: [],
    index: -1
}

// TODO: this is a temporary hook, just for prototyping. 
// I will need to fetch the data of an entire album/release/playlist beforehand
const useTrackList = () =>
{
    const [playlist, setPlaylist] = useState(defaultValue);

    const createPlaylist = (trackIDs: string[], index: number) =>
    {
        setPlaylist({ trackIDs, index })
    }

    const goNext = () =>
    {
        const { trackIDs, index } = playlist

        const newIndex = (index + 1) % trackIDs.length

        setPlaylist({ ...playlist, index: newIndex })
    }

    const goPrevious = () =>
    {
        const { trackIDs, index } = playlist

        let newIndex = (index - 1);

        if (newIndex < 0) 
        {
            newIndex = trackIDs.length - 1;
        }

        setPlaylist({ ...playlist, index: newIndex })
    }

    return {
        selectedTrackID: playlist.trackIDs[playlist.index],

        createPlaylist,
        goNext,
        goPrevious
    }
}

export default useTrackList;