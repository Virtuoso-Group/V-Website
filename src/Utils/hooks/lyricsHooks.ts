import { useEffect, useState } from "react";
import { Line, Lyrics } from "../types/lyrics";

export const isWithinRange = (line: Line, timestamp: number) =>
{
    if (line) 
    {
        const { start, end } = line.range;

        return start <= timestamp && timestamp <= end
    }
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
    else if (line.range.end < selectedTimestamp) 
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

    useEffect( () =>
    {
        if (lyrics.length > 0) 
        {
            setValue(0)
        }
    }, []);


    const goForward = () => 
    {
        if (value === lyrics.length -1) 
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

    const seek = (timestamp: number) => 
    {
       const newIndex = seekLineIndex(lyrics, timestamp, 0, lyrics.length);
              
       setValue(newIndex)
    }

    const reset = () => setValue(lyrics.length > 0? 0:-1)

    return {
        value,

        seek,
        goForward,
        goBack,
        reset
    }
}

export const useLyricsReader = (trackID: number, timestamp: number, lyrics: Lyrics) =>
{    
    const index = useLineIndex(lyrics);

    const visibleLine = isWithinRange(lyrics[index.value], timestamp)? lyrics[index.value].value: "";

    useEffect(() => { index.seek(timestamp) }, [trackID])

    useEffect(() =>
    {   
        const chosenLine = lyrics[index.value];

        if (chosenLine) 
        {
            if (timestamp > chosenLine.range.end) 
            {
                index.goForward();
            }
        }
    }, [index, timestamp, lyrics])
      
    return {  
        line: visibleLine,
        seekLine: index.seek
    }
}