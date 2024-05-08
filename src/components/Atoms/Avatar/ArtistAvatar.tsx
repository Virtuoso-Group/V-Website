import Avatar from './Avatar'
import { useWebsiteContext } from '../../Organisms/WebsiteLayout';
import { ArtistInfo } from '../../../Utils/types/track';

interface Props
{
    className?: string,
    artist: ArtistInfo,
}

const ArtistAvatar = (props: Props) => 
{
    const { artist } = props

    const { selectedtrack } = useWebsiteContext();

    const artistID = selectedtrack?.artistID;

    const isPlaying = artistID === artist._id;

    return (
        <Avatar 
            className={`${props.className} ${isPlaying && "border-secondary border-[0.2rem]"}`} 
            src={artist.profilePhoto?? ""} 
            title={artist.name} 
        />
    )
}

export default ArtistAvatar