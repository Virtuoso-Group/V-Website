import { useEffect, useState } from 'react'


import MiniMusicPlayer from '../../Organisms/MiniMusicPlayer'
import LyricsOverlay from '../../Organisms/LyricsOverlay'

import { Harridan } from '../../../Utils/dummyData'
import {  PlayerState, PlayerState as PlayerStatus } from '../../../Utils/types'
import {  useLyricsReader } from '../../../Utils/hooks/lyricsHooks'

type Props = {}

const useTimestamp = () =>
{
    const [value, setValue] = useState<number>(0);

    const update = (targetTimestamp: number) =>
    {
        if (targetTimestamp) 
        {
            setValue(targetTimestamp * 1000)  
        }
    }
    
    const reset = () => setValue(0);

    return {
        value,
        update,
        reset
    }
}


const usePlayerState = () =>
{
    const [playerState, setPlayerState] = useState<PlayerStatus>(PlayerStatus.STOPPED);

    useEffect(() => { console.log("playerState: ", playerState) }, [playerState])
    
    return {
        value: playerState,

        play: () => setPlayerState(PlayerState.PLAYING),
        pause: () => setPlayerState(PlayerState.PAUSED),
        seek: () => setPlayerState(PlayerState.SEEKING),
        stop: () => setPlayerState(PlayerState.STOPPED),
    }
}

const useOverlay = () =>
{
    const [isShown, setShown] = useState<boolean>(false)
    
    const show = () => setShown(true)
    const hide = () => setShown(false);

    return (
        {
            isShown,

            show, hide
        }
    )
}

const MusicPlayerPage = (props: Props) => 
{
    const playerStatus = usePlayerState();
    const timestamp = useTimestamp();

    const { line, seekLine } = useLyricsReader(timestamp.value, Harridan.lyrics)
    const overlay = useOverlay();
    
    return (
        <div 
            className=
            {`
                relative
                bg-[#009dc4]
                min-h-screen w-screen
                
                flex
                items-center justify-center
            `}
        >
            <div className='flex h-[600px]'>
                <MiniMusicPlayer 
                    playerState={playerStatus}
                    song={Harridan}
                    timestamp={timestamp}

                    seekLine={seekLine}
                    showLyrics={overlay.show}
                />

                <LyricsOverlay line={line} />
            </div>
        </div>
    )
}

export default MusicPlayerPage