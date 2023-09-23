import CoverArt from '../../Atoms/CoverArt'
import { SeekLineFunctionType } from '../../../Utils/types'

import { MdLyrics } from 'react-icons/md'

import { AnimatePresence, motion } from 'framer-motion'

import AlbumsObj from '../../../Utils/dummyData/albums'
import { memo, useMemo, useState } from 'react'
import { Album, Track } from '../../../Utils/types/track'
import LyricsView from '../../Organisms/Lyrics/LyricsView'
import ButtonIcon from '../../Atoms/ButtonIcon'

const Background = memo((props: { coverArt: string }) =>
{
    console.log("Background");
    
    return (
        <div className='z-[-1] absolute h-full w-full'>
            <img 
                className='z-[1] absolute  h-full w-full object-cover'
                src={props.coverArt}
                title={"Background"}
                alt={"Background"}
                loading='eager'
            />

            <div className='z-[2] absolute h-full w-full backdrop-blur-sm' />
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

const TrackOverlay = memo((props: { track: Track, timestamp: number, setSeekLine: (seekLineFunction: SeekLineFunctionType) => void }) => 
{
    const { track, timestamp, setSeekLine } = props;

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
            <Background coverArt={album.coverArt} />

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