import { useCallback, useEffect, useState } from "react";
import { Interval, Line, Lyrics } from "../../../../../../Utils/types/lyrics";
import { useTrackTimestamp } from "../../../hooks/useTrackTimestamp";

export const isWithinRange = (interval: Interval, timestamp: number) =>
{
    if (interval) 
    {
        const { start, end } = interval;

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
        
    if (isWithinRange(line.interval, selectedTimestamp)) 
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

const useLineIndex = (lyrics: Lyrics) =>
{
    const [value, setValue] = useState<number>(-1);

    useEffect(() =>
    {
        if (lyrics.length > 0) 
        {
            setValue(0)
        }
    }, [lyrics]);


    const goForward = () => 
    {
        if (value === lyrics.length - 1) 
        {
            return
        }

        setValue(value => value + 1)
    }

    const goBack = () => 
    {
        if (value === 0) 
        {
            return
        }

        setValue(value => value - 1)
    }

    const seek = useCallback((timestamp: number) => 
    {        
        const newIndex = seekLineIndex(lyrics, timestamp, 0, lyrics.length);
              
        setValue(newIndex)
    }, [lyrics])

    const reset = () => 
    {
        setValue(lyrics.length > 0? 0 : -1)
    }

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

export const useLyrics = (trackID: string, lyrics: Lyrics) =>
{
    const index = useLineIndex(lyrics);

    const [selectedLine, setSelectedLine] = useState<SelectedLine>(null);

    const updateSelectedLine = (visibleLine: SelectedLine) =>
    {
        setSelectedLine(oldLine => 
            {
               if ((!oldLine && !visibleLine) || (oldLine?.index === visibleLine?.index)) 
               {                    
                    return oldLine
               }                   
                
                return visibleLine
            })
    }

    const reset = () =>
    {
        if (lyrics.length > 0) 
        {
            setSelectedLine(
            {
                index: 0,
                line: lyrics[0]
            });
        }
        else
        {
            setSelectedLine(null)
        }
        

        index.reset(); 
    }

    useEffect(() => { reset() }, [trackID])

    
    const update = (timestamp: number) =>
    {   
        if (timestamp === 0) 
        {
            reset()
        }

        const chosenLine = lyrics[index.value];
        
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
                    isWithinRange(chosenLine.interval, timestamp)
                ? 
                    {
                        index: index.value,
                        line:  lyrics[index.value]
                    }
                : 
                    null
                ; 
                
                updateSelectedLine(visibleLine)
            }
        }
    }

    useTrackTimestamp(10, update, index.seek)
    
    return { selectedLine }
}