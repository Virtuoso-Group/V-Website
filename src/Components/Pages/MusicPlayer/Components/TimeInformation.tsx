interface Props
{
    className?: string,
    timeInfo: 
    {
        duration: number, 
        timestamp: number 
    }
}

const TimeInformation = (props: Props) =>
{
    const { className, timeInfo} = props;

    const convertMilliToTimeStamp = (milliseconds: number): string =>
    {
        const minutes = ""+(Math.floor(milliseconds / 60000));
        const seconds = ""+Math.floor((milliseconds % 60000) / 1000);
        
        return `${minutes}:${seconds.padStart(2, "0")}`
    }
    
    const currentTime = convertMilliToTimeStamp(timeInfo.timestamp);
    
    const duration = convertMilliToTimeStamp(timeInfo.duration);

    return (
        <div className={`${className}`}>
            <p >{currentTime}/{duration}</p>
        </div>
    )
}

export default TimeInformation