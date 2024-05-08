import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import CoverArt from '../../../../components/Atoms/CoverArt';
import useAPI from '../../../../Utils/hooks/useAPI';
import TrackList from './Components/TrackList';
import { websitePadding } from '../../../../config/style';
import { AlbumPageData } from '../../../../Utils/types/album';
import moment from 'moment';
import { SimpleArtist } from '../../../../Utils/types/artist';
import Link from '../../../../components/Atoms/Text/Link';
import { useWebsiteContext } from '../../../../components/Organisms/WebsiteLayout';


// TODO: refactor this later. It needs to accomidate Arabic at some point. It looks ugly!
const formatAlbumDuration = (milliseconds: number) =>
{
    const hours = moment.duration(milliseconds).hours();
    const hoursString = hours > 0? `${hours} hour${hours > 1?'s': ''}`: '';

    const minutes = moment.duration(milliseconds).minutes();
    const minutesString = minutes? `${minutes} minute${minutes > 1?'s': ''}`: '';

    const comma = hoursString && minutesString? ', ': '';

    return `${hoursString}${comma}${minutesString}`
}

interface SummaryProps
{
    artist: SimpleArtist,

    release: 
    {
        title: string,
        released: string,
        duration: number
    }

    noOfTracks: number,
}

const Summary = (props: SummaryProps) =>
{
    const { artist, release, noOfTracks } = props;

    return (
        <section className='text-white flex flex-col gap-2'>
            <h1 className="relative text-4xl  font-bold">{release.title}</h1>

            <p className='flex gap-1'>
                <Link to={`/artist/${artist._id}`} text={artist.name} />

                •

                <span>{moment(release.released).format('y')}</span>
            </p>

            <p className='flex gap-1'>
                <span>{`${noOfTracks} tracks`}</span>

                •

                <span>{formatAlbumDuration(release.duration)}</span>
            </p>
        </section>
    )
}

const AlbumPage = () => 
{
    const { albumID } = useParams();

    const releasePage = useAPI<AlbumPageData | null>("/music/release/", "get", null);

    useEffect(() => 
    {
      if (albumID) 
        releasePage.execute(albumID)
    }, [albumID])
  
    const tracks = releasePage.data?.tracks?? [];

    const { selectedtrack } = useWebsiteContext();

    const isPlaying = selectedtrack?.albumID === releasePage.data?._id;

    const isPlayingStyle = isPlaying? "border-secondary border-[0.1rem]":"";

    return (
        <div 
            className=
            {`
                ${websitePadding}
                relative
                flex flex-col 
                
                w-full gap-10
            `}
        >
            <header className='z-[5] SD:sticky SD:top-[4rem] pt-[2rem] flex flex-col SD:flex-row gap-10 bg-background'>
                <CoverArt 
                    className={`relative rounded-lg drop-shadow-2xl w-full SD:size-[12rem] ${isPlayingStyle}`}
                    release={releasePage.data?.release}
                />

                {
                    releasePage.data
                && 
                    <Summary 
                        artist={releasePage.data.artist}
                        release={releasePage.data.release}
                        noOfTracks={releasePage.data.tracks.length}
                    />
                }
                   
            </header>

            {
                tracks 
            && 
                <section className='w-full'>
                    <TrackList tracks={tracks}/>
                </section>
            }
        </div>
    )
}

export default AlbumPage