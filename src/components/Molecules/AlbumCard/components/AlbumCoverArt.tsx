import { SimpleRelease } from '../../../../Utils/types/album';
import CoverArt from '../../../Atoms/CoverArt'
import { useWebsiteContext } from '../../../Organisms/WebsiteLayout';

type Props = 
{
    release: SimpleRelease
}

const AlbumCoverArt = (props: Props) => 
{
    const { release } = props;

    const { selectedtrack } = useWebsiteContext();

    const isPlaying = selectedtrack?.albumID === release._id;

    const isPlayingStyle = isPlaying? "border-secondary border-[0.1rem]":"";

    return (
        <div className={`relative`}>
            {/* <CoverArt 
                className={`w-full absolute right-5 rounded-lg scale-[0.9] bg-blend-darken ${isPlayingStyle}`}
                release={release} 
            /> */}

            <CoverArt 
                className={`w-full relative rounded-lg drop-shadow-2xl ${isPlayingStyle}`}
                release={release} 
            />
        </div>
    )
}

export default AlbumCoverArt