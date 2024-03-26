
// TODO: we need a better name for this function
export const convertMillisecondsToTimestamp = (milliseconds: number) =>
{
    if (milliseconds < 0)
        milliseconds = 0;

    const seconds = Math.floor(milliseconds / 1000);

    const minutes = ""+ (Math.floor(seconds / 60)) % 60;

    const secondsLeft = ""+Math.ceil(seconds % 60);

    return `${minutes}:${secondsLeft.padStart(2, "0")}`
} 