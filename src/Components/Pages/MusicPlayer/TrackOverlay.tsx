import CoverArt from '../../Atoms/CoverArt'
import { SeekLineFunctionType } from '../../../Utils/types'

import { MdLyrics } from 'react-icons/md'

import { AnimatePresence, motion } from 'framer-motion'

import AlbumsObj from '../../../Utils/dummyData/albums'
import { memo, useEffect, useMemo, useRef, useState } from 'react'
import { Album, Track } from '../../../Utils/types/track'
import LyricsView from '../../Organisms/Lyrics/LyricsView'
import ButtonIcon from '../../Atoms/ButtonIcon'
import { PlayerState } from '../../../Utils/hooks/usePlayerControls'

const Background = memo((props: { playerState: PlayerState, coverArt: string, video?: string }) =>
{
    const { playerState } = props;
    console.log("Background");
    
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => 
    {
        console.log("playerState: ", playerState);
        
        if (playerState === PlayerState.PLAYING) 
        {
            console.log("Hello");
            
            videoRef.current?.play();
        }
        else if ([PlayerState.PAUSED, PlayerState.STOPPED].includes(playerState))
        {
            videoRef.current?.pause();
        }
    }, [playerState, videoRef.current?.duration])
    

    return (
        <div className='z-[-1] absolute h-full w-full'>

            {
                props.video
            ?
                    <video
                        ref={videoRef}
                        onLoadedMetadata={e =>
                            {
                                if (videoRef.current?.duration) 
                                {
                                    videoRef.current.play()
                                }
                            }}
                        className='z-[1] h-full w-full object-cover blur-sm'
                        // autoPlay={true}
                        src={props.video}
                        typeof='video/mp4'
                        controls={false}
                        loop={true}
                        muted={true}
                />
            :
                <>
                    <img 
                        className='z-[1] absolute  h-full w-full object-cover'
                        src={props.coverArt}
                        title={"Background"}
                        alt={"Background"}
                        loading='eager'
                    />

                    <div className='z-[2] absolute h-full w-full backdrop-blur-sm' />
                </>
            }
            
        </div>
    )
})

const CoverArtContainer = memo((props: { album: Album, areLyricsUnavailable: boolean , toggleLyrics: () => void }) =>
{
    const { album } = props;
    
    return ( 
        <motion.div 
            layout
            className='relative h-full flex justify-end aspect-square object-fit drop-shadow-2xl'
            transition={{ duration: 0.25 }}
        >
            <CoverArt 
                className={`z-[0] absolute h-full w-full rounded-lg `}
                name={album.name}
                coverArt={album.coverArt} 
                loading={"eager"}
            />

            {
                !props.areLyricsUnavailable 
            &&

                
                <ButtonIcon 
                    className=
                    {`
                        z-[1]
                        h-[35px] 
                        m-4
                        aspect-square 
                        rounded-full bg-slate-300

                        flex items-center justify-center
                    `}
                    name='showLyrics'
                    icon={<MdLyrics />}

                    onClick={props.toggleLyrics}
                />
            }
        </motion.div>
    )
})

interface Props
{   
    playerState: PlayerState,
    track: Track, 
    timestamp: number, 
    setSeekLine: (seekLineFunction: SeekLineFunctionType) => void 
}
const TrackOverlay = memo((props: Props) => 
{
    const { playerState, track, timestamp, setSeekLine } = props;

    const [areLyricsVisible, setLyricsVisibility] = useState(false);

    const toggleLyrics = () => setLyricsVisibility(value => !value);
    
    const album = useMemo(() => AlbumsObj[track.albumID], [track.albumID])

    return (
        <motion.div 
            className={`z-[40] fixed grid w-screen bottom-10 min-h-screen jutsfiy-center items-center`}
            initial={{  opacity: 0 }}
            animate={{  opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
        >
            <Background 
                playerState={playerState}
                coverArt={album.coverArt} 
                video={track.backgroundVideoSrc} 
            />

            <section className={`h-[550px] flex w-full justify-center items-center gap-10 `}>
                <CoverArtContainer 
                    album={album} 
                    areLyricsUnavailable={track.lyricsObj.status === "unavailable"}
                    toggleLyrics={toggleLyrics} 
                />

                <AnimatePresence>
                    {
                        track.lyricsObj.status !== "unavailable" && areLyricsVisible
                    && 
                        <LyricsView 
                            timestamp={timestamp}
                            trackID={track.id}
                            lyricsObj={track.lyricsObj}

                            setSeekLine={setSeekLine}
                        />
                    }
                </AnimatePresence>
            </section>   
        </motion.div>       
    )
})

export default TrackOverlay