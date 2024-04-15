import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import CoverArt from '../../../../components/Atoms/CoverArt';
import useAPI from '../../../../Utils/hooks/useAPI';
import TrackList from './Components/TrackList';
import { websitePadding } from '../../../../config/style';
import { AlbumPageData } from '../../../../Utils/types/album';


const AlbumPage = () => 
{
    const { albumID } = useParams();

    const albumPage = useAPI<AlbumPageData | null>("/music/release/", "get", null);

    useEffect(() => 
    {
      if (albumID) 
      {
        albumPage.execute(albumID)
      }
    }, [albumID])
  
    const title = albumPage.data? albumPage.data.release.title: ""
        
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
                    className={`relative rounded-lg drop-shadow-2xl w-full SD:size-[9.375rem]`}
                    release={albumPage.data?.release}
                />

                <h1 className="relative text-4xl text-white font-bold">{title}</h1>
            </header>

            <section className='w-full'>
                <TrackList tracks={albumPage.data?.tracks?? []}/>
            </section>
        </div>
    )
}

export default AlbumPage