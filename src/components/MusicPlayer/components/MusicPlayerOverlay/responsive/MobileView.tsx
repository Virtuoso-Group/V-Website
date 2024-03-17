import React, { useContext } from 'react'
import { websitePadding } from '../../../../../config/style'
import LyricsButtons from '../components/LyricsButtons'
import TrackInformation from '../components/TrackInformation'
import { AnimatePresence } from 'framer-motion'
import { LyricsObject } from '../../../../../Utils/types/lyrics'
import Lyrics from '../../Lyrics/Lyrics'
import { PlayerContext } from '../../../PlayerContext'

type Props = 
{
    lyrics: LyricsObject,
            
    areVisible: boolean,
        
    toggle: () => void
}

const MobileView = (props: Props) => 
{
    const { seekTimestamp } = useContext(PlayerContext);

    return (
        <section 
            className=
            {`
            
                z-[50]
                ${websitePadding}
                relative
                h-full
                gap-10
                flex SD:hidden
                justify-center
            `}
        >
            <TrackInformation className={"flex"} />

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

export default MobileView