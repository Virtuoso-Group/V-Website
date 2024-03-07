

// TODO: we need a better name for this function
export const convertMillisecondsToTimestamp = (milliseconds: number) =>
{
    const seconds = milliseconds / 1000;

    const minutes = ""+ Math.floor(seconds / 60);

    const secondsLeft = ""+Math.ceil(seconds % 60);

    return `${minutes}:${secondsLeft.padStart(2, "0")}`
} 