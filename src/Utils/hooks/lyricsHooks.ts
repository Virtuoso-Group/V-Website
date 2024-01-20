import { useCallback, useEffect, useState } from "react";
import { Line, Lyrics, LyricsObject } from "../types/lyrics";

export const isWithinRange = (line: Line, timestamp: number) =>
{
    if (line) 
    {
        const { start, end } = line.interval;

        return start <= timestamp && timestamp <= end
    }

    return false
}

// This should return the index of the closest line to the selected timestamp
const seekLineIndex = (lyrics: Lyrics, selectedTimestamp: number, lowIndex: number, highIndex: number): number =>
{
    if (highIndex <= lowIndex) 
    {        
        if (lyrics[lowIndex]) 
        {
            return lowIndex
        }
        else
        {
            return highIndex
        }
    }

    const midIndex = lowIndex + Math.floor((highIndex - lowIndex)/ 2);
    
    const line = lyrics[midIndex];
        
    if (isWithinRange(line, selectedTimestamp)) 
    {
        return midIndex
    }
    else if (line.interval.end < selectedTimestamp) 
    {        
        return seekLineIndex(lyrics, selectedTimestamp, midIndex + 1, highIndex)
    }
    else
    {   
        return seekLineIndex(lyrics, selectedTimestamp, lowIndex, midIndex - 1)
    } 
}

const useLineIndex = (lyrics: LyricsObject) =>
{
    const [value, setValue] = useState<number>(-1);

    useEffect(() =>
    {
        if (lyrics.status !== "Synced") return

        if (lyrics.value.length > 0) 
        {
            setValue(0)
        }
    }, []);


    const goForward = useCallback(() => 
    {
        if (lyrics.status !== "Synced") return

        if (value === lyrics.value.length -1) 
        {
            return
        }

        setValue(value => value + 1)
    }, [])

    const goBack = useCallback(() => 
    {
        if (lyrics.status !== "Synced") return

        if (value === 0) 
        {
            return
        }

        setValue(value => value - 1)
    }, [])

    const seek = useCallback((timestamp: number) => 
    {        
        if (lyrics.status !== "Synced") return

        const newIndex = seekLineIndex(lyrics.value, timestamp, 0, lyrics.value.length);
              
        setValue(newIndex)
    }, [])

    const reset = useCallback(() => 
    {
        if (lyrics.status !== "Synced") return

        setValue(lyrics.value.length > 0? 0 : -1)
    }, [])


    return {
        value,

        seek,
        goForward,
        goBack,
        reset
    }
}

export type SelectedLine = 
{
    index: number
    line: Line, 
} | null

export const useLyrics = (trackID: string, lyrics: LyricsObject) =>
{
    const index = useLineIndex(lyrics);

    const [selectedLine, setSelectedLine] = useState<SelectedLine>(null);

    useEffect(() => 
    { 
        setSelectedLine(null)
        index.reset() 
    }, [trackID])

    
    const update = useCallback((timestamp: number) =>
    {
        if (lyrics.status !== "Synced")  return;

        if (timestamp === 0) index.reset()

        const chosenLine = lyrics.value[index.value];

        if (chosenLine) 
        {
            if (timestamp > chosenLine.interval.end) 
            {
                index.goForward();
            }
            else if (timestamp < chosenLine.interval.start)
            {
                // index.goBack();
            }
            else
            {
                const visibleLine: SelectedLine | null 
                = 
                    isWithinRange(chosenLine, timestamp)
                ? 
                    {
                        index: index.value,
                        line:  lyrics.value[index.value]
                    }
                : 
                    null
                ; 
                

                setSelectedLine(oldLine => 
                {
                   if (JSON.stringify(oldLine)  === JSON.stringify(visibleLine)) 
                   {                    
                        return oldLine
                   }                   
                    
                    return visibleLine
                })
            }
        }
    }, [index.value, lyrics])

    return {  
        selectedLine,        

        update,

        seek: index.seek,
    }
}