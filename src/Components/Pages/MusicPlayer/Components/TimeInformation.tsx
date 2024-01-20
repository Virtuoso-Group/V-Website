import { RefObject, memo } from "react";
import { useCurrentTimestamp } from "../../../../Utils/hooks/useMusicPlayer";

interface Props
{
    trackID: string,
    audioRef: RefObject<HTMLAudioElement>,
    className?: string,
    duration: number, 
}

const TimeInformation = memo((props: Props) =>
{
    const { className } = props;

    const timestamp = useCurrentTimestamp(props.trackID, props.audioRef);

    const convertMilliToTimeStamp = (milliseconds: number): string =>
    {
        const minutes = ""+(Math.floor(milliseconds / 60000));
        const seconds = ""+Math.floor((milliseconds % 60000) / 1000);
        
        return `${minutes}:${seconds.padStart(2, "0")}`
    }
    
    const currentTime = convertMilliToTimeStamp(timestamp);
    
    const duration = convertMilliToTimeStamp(props.duration);

    return (
        <div className={`${className}`}>
            <p >{currentTime}/{duration}</p>
        </div>
    )
})

export default TimeInformation