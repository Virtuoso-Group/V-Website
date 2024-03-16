import React, { useContext } from 'react'
import { websitePadding } from '../../../../../config/style'
import { MotionCoverArt } from '../../../../Atoms/CoverArt'
import { PlayerContext } from '../../../PlayerContext'
import { LyricsObject } from '../../../../../Utils/types/lyrics'
import Lyrics from '../../Lyrics/Lyrics'
import { AnimatePresence } from 'framer-motion'
import LyricsButtons from '../components/LyricsButtons'

type Props = 
{
    lyrics: LyricsObject,
            
    areVisible: boolean,

    toggle: () => void
}

const DesktopView = (props: Props) => 
{
    const { release, seekTimestamp} = useContext(PlayerContext);

    return (
        <section 
            className=
            {`
                z-[50]
                ${websitePadding}
                relative
                h-[80%] 
                gap-10
                
                hidden SD:flex justify-center items-center 
            `}
        >
            <MotionCoverArt
                id={`${release._id}${"desktop"}`}
                className={`flex w-[30rem] rounded-lg `}                
                name={release.title}
                coverArt={release.coverArt} 
                loading={"eager"}
            />

            <AnimatePresence>
                { 
                    props.lyrics.status !== "Unavailable" && props.areVisible
                && 
                    <Lyrics lyrics={props.lyrics} seek={seekTimestamp} />
                }
            </AnimatePresence>

            <LyricsButtons 
                areLyricsAvailable={props.lyrics.status !== "Unavailable"} 
                toggleLyrics={props.toggle}
            />
        </section>
    )
}

export default DesktopView