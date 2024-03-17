import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import CoverArt from '../../Atoms/CoverArt';
import useAPI from '../../../Utils/hooks/useAPI';
import TrackList from './Components/TrackList';
import { websitePadding } from '../../../config/style';

type AlbumTrackData =
{
    _id: string,
    no: number,
    title: string,
    duration: number
}

type AlbumPageData =
{
    _id: string,
    coverArt: string,
    title: string,
    released: string,
    tracks: AlbumTrackData[],

    artist: 
    {
        _id: string,
        name: string
    },

    duration: number
}

const AlbumPage = () => 
{
    const { albumID } = useParams();

    const release = useAPI<AlbumPageData | null>("/music/release/", "get", null);

    useEffect(() => 
    {
      if (albumID) 
      {
        release.execute(albumID)
      }
    }, [albumID])
  
    const title = release.data? release.data.title: ""
        
    return (
        <div 
            className=
            {`
                ${websitePadding}
                relative
                flex flex-col 
                
                w-full gap-10 mt-[2rem]
            `}
        >
            <header className='flex flex-col SD:flex-row gap-10'>
                <CoverArt 
                    className={`relative rounded-lg drop-shadow-2xl w-full SD:size-[9.375rem]`}
                    name={title}
                    coverArt={release.data?.coverArt??""} 
                />

                <h1 className="text-4xl text-white font-bold">{title}</h1>
            </header>

            <section className='w-full'>
                <TrackList tracks={release.data?.tracks?? []}/>
            </section>
        </div>
    )
}

export default AlbumPage