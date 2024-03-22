import { RefObject, createContext, createRef, useCallback, useState } from "react"
import useMusicPlayer, { PlayerState } from "./hooks/useMusicPlayer"
import { Track } from "../../../Utils/types/track"
import { Overlay, defaultValue } from "../../../Utils/hooks/useOverlay"
import { baseURL } from "../../../config/config"
import { LyricsObject } from "../../../Utils/types/lyrics"

// TODO: this is turning into a God module. Something has to change...
type PlayerContextType = 
{
    audioRef: RefObject<HTMLAudioElement>,
    
    artist:
    {
        _id: string,
        name: string
    },

    release:
    {
        _id: string, 
        title: string, 
        coverArt: string
    },

    track:
    {
        _id: string,
        title: string,
        timestamp: number,
        duration: number
    },

    lyrics:
    {
        value: LyricsObject,
            
        areVisible: boolean,
            
        toggle: () => void
    }

    overlay: Overlay,

    playerState: PlayerState,

    

    controls:
    {
        stepBackwards: () => void,

        togglePlay: () => void,

        stepForwards: () => void,

        seekTimestamp: (timestamp: number) => void,

        pause: () => void,
        seek: (percentage: number) => void,
    },

    closeMusicPlayer: () => void
}

export const PlayerContext = createContext<PlayerContextType>(
{
    audioRef: createRef<HTMLAudioElement>(),
    
    artist:
    {
        _id: "",
        name: ""
    },

    release:
    {
        _id: "", 
        title: "", 
        coverArt: ""
    },

    track:
    {
        _id: "",
        title: "",
        timestamp: 0,
        duration: 0
    },

    lyrics:
    {
        value: { status: "Unavailable" },
        areVisible: false,
        toggle: () => {}
    },
    overlay: defaultValue,
    playerState: PlayerState.STOPPED,


    controls:
    {
        stepBackwards: () => {},
        stepForwards: () => {},
        togglePlay: () => {},

        pause: () => {}, 
        seek: (percentage: number) => {},
        seekTimestamp: (timestamp: number) => {},
    },


    closeMusicPlayer: () => {}
})

interface Props 
{

    track: Track,

    overlay: Overlay,

    close: () => void,

    children?: React.ReactNode
}

export const PlayerContextProvider = (props: Props) => 
{
    const { track, overlay, close } = props

    const 
    { 
        playerState, audioControls, duration, 

        initialize, seekPercentage, seekTimestamp, reset, 
    } = useMusicPlayer(track._id);
    

    const stepBackwards = useCallback(() => { reset() }, [])

    const stepForwards = useCallback(() => { console.log("Forwards!")  }, [])

    const [areLyricsVisible, setLyricsVisibility] = useState<boolean>(false);

    const toggleLyrics = useCallback(() => setLyricsVisibility(value => !value), []);

  return (
    <PlayerContext.Provider 
        value=
        {{ 
            audioRef: audioControls.ref,

            artist: { ...track.artist },

            release: { ...track.release},

            track: { ...track, timestamp: audioControls.timestamp, duration: duration.value },

            lyrics:
            {
                value: track.lyrics,
                areVisible: areLyricsVisible,
                toggle: toggleLyrics
            },

            overlay,

            playerState: playerState.value,

            controls:
            {
                stepBackwards,
                stepForwards,
                togglePlay: audioControls.togglePlay,

                pause: audioControls.pause, 
                seek: seekPercentage,
                seekTimestamp,
            },

            closeMusicPlayer: close
        }}
    >
        <audio 
            key={track._id}
            title={track.title}
            ref={audioControls.ref}
            controlsList="nodownload noplaybackrate"
            src={`${baseURL}/music/track/play/${track._id}`}
            onLoadedMetadata={e => 
            {
                const showMediaSession = () =>
                {
                    overlay.show();

                    navigator.mediaSession.metadata = new MediaMetadata
                    ({
                        title: track.title,
                        artist: track.artist.name,
                        album: track.release.title,
                        artwork: [{ src: track.release.coverArt }],
                    });
                }

                initialize(showMediaSession) 
            }}
    />
        {props.children}
    </PlayerContext.Provider>
  )
}