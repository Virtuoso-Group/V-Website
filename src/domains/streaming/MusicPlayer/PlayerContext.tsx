import { RefObject, createContext, createRef, useCallback, useEffect, useState } from "react"
import useMusicPlayer, { PlayerState } from "./hooks/useMusicPlayer"
import { PublishedTrack, TrackWithType } from "../../../Utils/types/track"
import { Overlay, defaultValue } from "../../../Utils/hooks/useOverlay"
import { baseURL } from "../../../config/config"
import { LyricsObject } from "../../../Utils/types/lyrics"
import { SimpleArtist } from "../../../Utils/types/artist"
import { SimpleRelease } from "../../../Utils/types/album"

// TODO: this is turning into a God module. Something has to change...
type PlayerContextType = 
{
    audioRef: RefObject<HTMLAudioElement>,
    
    artist: SimpleArtist,

    release: SimpleRelease,

    track: TrackWithType,

    lyricsObj:
    {
        lyrics?: LyricsObject,
            
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
        duration: 0,
        type: "instrumental"
    },

    lyricsObj:
    {
        lyrics: { status: "Unavailable" },
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

    publishedTrack: PublishedTrack,

    overlay: Overlay,

    close: () => void,
    goNext: () => void,
    goPrevious: () => void

    children?: React.ReactNode
}

export const PlayerContextProvider = (props: Props) => 
{
    const { publishedTrack, overlay, close, goNext, goPrevious } = props

    const 
    { 
        playerState, audioControls, 

        initialize, seekPercentage, seekTimestamp, reset, 
    } = useMusicPlayer(publishedTrack.track._id);
    

    // TODO: implement double click and single click (reset, go previous)
    const stepBackwards = useCallback(() => { goPrevious() }, [goPrevious])

    const stepForwards = useCallback(() => { goNext()  }, [goNext])

    const [areLyricsVisible, setLyricsVisibility] = useState<boolean>(false);
    
    useEffect(() => 
    {
        setLyricsVisibility(false)
    }, [publishedTrack.track._id])
    

    const toggleLyrics = useCallback(() => setLyricsVisibility(value => !value), []);

  return (
    <PlayerContext.Provider 
        value=
        {{ 
            audioRef: audioControls.ref,

            artist: publishedTrack.artist,

            release: publishedTrack.release,

            track: publishedTrack.track,


            
            lyricsObj:
            {
                // lyrics: publishedTrack.lyrics,

                ...(
                    publishedTrack.lyrics
                ?
                    {lyrics: publishedTrack.lyrics}:
                    {}
                ),
                    
                areVisible: areLyricsVisible,
                toggle: toggleLyrics
            }
                
           ,

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
            key={publishedTrack.track._id}
            title={publishedTrack.track.title}
            ref={audioControls.ref}
            controlsList="nodownload noplaybackrate"
            src={`${baseURL}/music/track/play/${publishedTrack.track._id}`}
            onLoadedMetadata={e => 
            {
                const showMediaSession = () =>
                {
                    overlay.show();

                    navigator.mediaSession.metadata = new MediaMetadata
                    ({
                        title: publishedTrack.track.title,
                        artist: publishedTrack.artist.name,
                        album: publishedTrack.release.title,
                        artwork: [{ src: publishedTrack.release.coverArt }],
                    });
                }

                initialize(showMediaSession) 
            }}

            onEnded={stepForwards}
    />
        {props.children}
    </PlayerContext.Provider>
  )
}