
import { useState } from "react";
import { SeekFunctionType } from "../../../../Utils/types";
import useOverlay from "../../../../Utils/hooks/useOverlay";
import TrackBodyOverlay from "../TrackBodyOverlay";
import { AnimatePresence } from "framer-motion";

import { Track } from "../../../../Utils/types/track";
import { MusicPlayer } from "../MusicPlayer";
import useTimestamp from "../../../../Utils/hooks/useTimestamp";

interface Props
{
    track: Track,
    close: () => void,

    areLyricsVisible: boolean,
    toggleLyrics: () => void
}

enum PlayerState 
{
    PLAYING = "Playing",
    PAUSED = "PAUSED",
    STOPPED = "STOPPED"
}

const TrackControls = (props: Props) =>
{
    const { track, areLyricsVisible, toggleLyrics } = props;

    const timestamp = useTimestamp();

    const [seek, setSeekFunction] = useState<SeekFunctionType>((timestamp: number) => {});

    const retrieveSeekFunction = (seekFunction: SeekFunctionType) =>
    {
        setSeekFunction(() => seekFunction)
    }

    // TODO: I need to find a cleaner way to handle propagating functions upwards
    const [seekLyric, setSeekLyric] = useState<SeekFunctionType>()
    
    const overlay = useOverlay();

    return (
        <>
            <AnimatePresence>
                {
                    overlay.isOn
                && 
                    <TrackBodyOverlay 
                        timestamp={timestamp.value} 
                        setSeekLine={setSeekLyric}
                        seek={seek}

                        release={track.release}
                        lyrics=
                        {
                            {
                                _id: track._id,
                                value: { status: "unavailable"},
                                areVisible: areLyricsVisible,
                                toggle: toggleLyrics
                            }
                        }
                    />
                }
            </AnimatePresence>

            <MusicPlayer 
                timestamp={timestamp}
                track={track} 
                overlay={overlay}

                seekLyric={seekLyric}

                retrieveSeekFunction={retrieveSeekFunction}
                close={props.close}
            />
        </>
    )
}

export default TrackControls;