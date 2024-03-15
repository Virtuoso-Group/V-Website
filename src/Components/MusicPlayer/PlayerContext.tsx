import { RefObject, createContext, createRef, useCallback } from "react"
import useMusicPlayer, { PlayerState } from "./hooks/useMusicPlayer"
import { Track } from "../../Utils/types/track"
import { Overlay } from "../../Utils/hooks/useOverlay"
import { baseURL } from "../../config/config"

type PlayerContextType = 
{
    websitePadding: string,

    audioRef: RefObject<HTMLAudioElement>,
    track:
    {
        _id: string,
        title: string,
        duration: number
    },

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

    pause: () => void,
    seek: (percentage: number) => void,

    hideOverlay: () => void,


    playerState: PlayerState,

    stepBackwards: () => void,

    togglePlay: () => void,

    stepForwards: () => void,

    seekTimestamp: (timestamp: number) => void
}

export const PlayerContext = createContext<PlayerContextType>(
{
    websitePadding: "",
    audioRef: createRef<HTMLAudioElement>(),
    track:
    {
        _id: "",
        title: "",
        duration: 0
    },

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

    pause: () => {},
    seek: (percentage: number) => {},
    hideOverlay: () => {},


    playerState: PlayerState.STOPPED,

    togglePlay: () => {},
    stepBackwards: () => {},
    stepForwards: () => {},
    seekTimestamp: (timestamp: number) => {}
})

interface Props 
{
    websitePadding?: string,

    track: Track,

    overlay: Overlay,

    children?: React.ReactNode
}

export const PlayerContextProvider = (props: Props) => 
{
    const { websitePadding, track, overlay } = props

    const 
    { 
        playerState, audioControls, duration, 

        initialize, seekPercentage, seekTimestamp, reset, 
    } = useMusicPlayer(track._id);
    

    const stepBackwards = useCallback(() => { reset() }, [])

    const stepForwards = useCallback(() => { console.log("Forwards!")  }, [])

  return (
    <PlayerContext.Provider 
        value=
        {{ 
            websitePadding: `${websitePadding}`, 
            audioRef: audioControls.ref,

            artist: { ...track.artist },

            track: { ...track, duration: duration.value },

            release: { ...track.release},

            pause: audioControls.pause, 
            seek: seekPercentage,
            hideOverlay: overlay.hide,

            playerState: playerState.value,

            stepBackwards,
            stepForwards,
            togglePlay: audioControls.togglePlay,
            seekTimestamp
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