
// TODO: we need a better name for this function
// TODO: I think I'll just replace this with a momentjs function when the time comes.
export const convertMillisecondsToTimestamp = (milliseconds: number) =>
{
    const calculateSecondsField = (totalSeconds: number) =>
    {
        const secondsLeft = Math.ceil(totalSeconds % 60);

        return `${(`${secondsLeft}`).padStart(2, "0")}`
    }

    const calculateMinutesField = (totalMinutes: number, doesHoursExist?: boolean) =>
    {
        const minutesLeft = totalMinutes % 60

        const numOfDigits = (doesHoursExist)? 2:1;

        return`${(`${minutesLeft}`).padStart(numOfDigits, "0")}`
    }

    if (milliseconds < 0)
        milliseconds = 0
    
    const totalSeconds = Math.floor(milliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);

    let result = '';

    if (totalHours) 
        result = `${totalHours}:`

    const minutes = calculateMinutesField(totalMinutes, !!totalHours)
    const seconds = calculateSecondsField(totalSeconds);
    
    result += `${minutes}:${seconds}`
    
    return result
} 