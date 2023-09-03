import LyricsView from '../../Organisms/LyricsView'

import CoverArt from '../../Atoms/CoverArt'

import { Album, LyricsObject, Track } from '../../../Utils/types'

import { motion } from 'framer-motion'

const Background = (props: { coverArt: string }) =>
{
    return (
        <div className='z-[-1] absolute h-full w-full'>
            <img 
                className='z-[1] absolute  h-full w-full object-cover'
                src={props.coverArt}
                title={"Background"}
                alt={"Background"}
            />

            <div className='z-[2] absolute h-full w-full backdrop-blur-sm' />
        </div>
    )
}

const CoverArtContainer = (props: { album: Album }) =>
{
    const { album } = props;

    return ( 
        <div className='flex justify-center'>
            <CoverArt 
                className={`min-w-[300px] w-[550px] rounded-lg drop-shadow-2xl`}
                name={album.name}
                coverArt={album.coverArt} 
            />
        </div>
    )
}

const LyricsContainer = (props: { timestamp: number, trackID: number, lyricsObject: LyricsObject}) =>
{
    return (
        <div className='flex justify-center h-[700px]'>
            <LyricsView  {...props} />
        </div>
    )
}

const TrackOverlay = (props: { track: Track, timestamp: number }) => 
{
    const { track, timestamp } = props;

    const areLyricsAvailable = track.lyricsObj.status === "available";

    return (
    <motion.div 
        className={`z-[40] fixed grid w-screen bottom-10 min-h-screen`}
        initial={{  opacity: 0 }}
        animate={{  opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
    >
        <Background coverArt={track.album.coverArt} />

        <section className={`${areLyricsAvailable? "grid grid-cols-2  auto-cols-max": "flex justify-center"} w-full items-center`}>
            <CoverArtContainer album={track.album} />

            {areLyricsAvailable && <LyricsContainer timestamp={timestamp} trackID={track.id} lyricsObject={track.lyricsObj} />}
        </section>   
    </motion.div>       
    )
}

export default TrackOverlay