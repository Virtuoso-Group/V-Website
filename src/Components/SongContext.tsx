import React, { createContext, useEffect, useState } from 'react'
import { SeekLineFunctionType, Track } from '../Utils/types';
import useTimestamp from '../Utils/hooks/useTimestamp';
import useTrack from '../Utils/hooks/useTrack';
import { useLyricsReader } from '../Utils/hooks/lyricsHooks';

const InitialSeekLineFunction = (timestamp: number) => {}

type ContextType =
{
    track:
    {
        value: Track | null,

        setTrack: (track: Track) => void,

        reset: () => void
    },

    timestamp:
    {
        value: number,

        update: (targetTimestamp: number) => void,
        reset: () => void
    },

    lyrics:
    {
        seekLine: SeekLineFunctionType | null,

        setSeekLine: (seekLineFunction: SeekLineFunctionType) => void
    }
}


export const TrackContext = createContext<ContextType>(
    {
        track:
        {
            value: null,

            setTrack: (track: Track) => {},
            reset: () => {}
        },

        timestamp:
        {
            value: 0,

            update: (targetTimestamp: number) => {},
            reset: () => {}
        },

        lyrics:
        {
            seekLine: null,

            setSeekLine: (seekLineFunction: SeekLineFunctionType) => null
        }
    }
);


const TrackContextContainer = (props: { children: React.ReactNode }) => 
{
    const track = useTrack();
    const timestamp = useTimestamp();

    const [seekLine, setSeekLine] = useState<SeekLineFunctionType | null>(null)

    return (
        <TrackContext.Provider 
            value={{ 
                track, 
                timestamp,
                lyrics:
                {
                    seekLine,

                    setSeekLine
                }
            }}
        >
            {props.children}
        </TrackContext.Provider>    
    )
}

export default TrackContextContainer