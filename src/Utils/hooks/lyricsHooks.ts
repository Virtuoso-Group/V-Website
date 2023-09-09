import { useEffect, useState } from "react";
import { Line, Lyrics, LyricsObject, PlayerState } from "../types";

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

const useLineString = () =>
{
    const [value, setValue] = useState<string>("");

    const show = (value: string) => setValue(value);

    const hide = () => setValue("");

    const isVisible = (): boolean => !!value

    return { value, show, hide, isVisible }
}

const useLineIndex = (lyrics: Lyrics) =>
{
    const [value, setValue] = useState<number>(-1);

    // useEffect(() => 
    // {
    //     console.log("new Index: ", value);  
    // }, [value])

    useEffect( () =>
    {
        if (lyrics.length > 0) 
        {
            setValue(0)
        }
    }, [lyrics]);


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

const useLine = (lyrics: Lyrics) =>
{
    // This is about visibility
    const line = useLineString();

    // This is the index of the selected line that is played or will be played
    const lineIndex = useLineIndex(lyrics);

    return { line, index: lineIndex }
}


// TODO: we should look into whether to stick with useState or use useReducer for this hook
export const useLyricsReader = (trackID: number, timestamp: number, lyrics: Lyrics) =>
{    
    const { line, index } = useLine(lyrics);
    const [chosenLine, setChosenLine] = useState<Line | null>(index.value > -1? lyrics[index.value]: null);


    console.log("LYRICS LOG: ",
    {
        timestamp,
        chosenLine:
        {
            value: lyrics[index.value],
            index: index.value,
        },
        
        visibleLine: line.value
    });


    const resetState = () =>
    {
        setChosenLine(index.value > -1? lyrics[index.value]: null)
        line.hide();
        index.reset();
    }

    useEffect(() =>
    {
        // console.log("trackID: ", trackID);
        resetState()
        
    }, [trackID])

    useEffect(() =>
    {       
           
        if (index.value > -1) 
        {
            setChosenLine(lyrics[index.value])
        }
    }, [index.value])


    useEffect(() =>
    {
        if (chosenLine) 
        {
            if (isWithinRange(chosenLine, timestamp)) 
            {
                line.show(chosenLine.value)
            }
            else if (chosenLine.range.end < timestamp) 
            {
                line.hide()
                index.goForward();
            }
            else
            {
                line.hide()
                index.goBack();
            }
        }
    }, [chosenLine?.value, timestamp])
      
    return {  
        line: line.value?? "",
        seekLine: index.seek
    }
}