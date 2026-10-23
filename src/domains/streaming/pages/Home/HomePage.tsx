
import { memo, useEffect, useState } from 'react'
import { Category } from '../../../../Utils/types';
import ReleasesSection from './Components/AlbumsSection';
import ArtistsSection from './Components/ArtistsSection';
import useAPI from '../../../../Utils/hooks/useAPI';
import {  ArtistsList, SimplePublishedTrack} from '../../../../Utils/types/track';
import { AlbumInfo } from '../../../../Utils/types/album';
import PageContainer from '../../../../components/Organisms/PageContainer';
import Chips from '../../../../components/Molecules/Chips';
import VGrid from '../../../../components/Organisms/VGrid';

const Categories: { [key: string]: Category } = {
    'albums':  { id: 'albums', label: "Albums" },
    'artists': { id: 'artists', label: "Artists" }
}

const categoriesList = Object.values(Categories);


const HomePage = memo(() => 
{   
    const [selectedCategory, setSelectedCategory] = useState<Category>(Categories['albums'])
    
    const selectCategory = (id: string) => setSelectedCategory(Categories[id]);

    const tracksAPI = useAPI<SimplePublishedTrack[]>("music/track/getAll", 'get', []);

    const albumsAPI = useAPI<AlbumInfo[]>("music/release/getAll", 'get', [])

    const artistsAPI = useAPI<ArtistsList>("music/artist/getAll", 'get', [])

    useEffect(() => 
    { 
        tracksAPI.execute();
        albumsAPI.execute();
        artistsAPI.execute();
    }, []);


    const HomeSections: { [index: string]:  JSX.Element } = 
    {
        'albums':  <ReleasesSection data={albumsAPI.data} />,
        'artists': <ArtistsSection data={artistsAPI.data} />
    }

    const ChosenSection = HomeSections[selectedCategory.id];

    return (
        <PageContainer className="relative flex flex-col">
           <Chips contents={categoriesList} selectedID={selectedCategory.id} select={selectCategory} />
           
            {ChosenSection}
        </PageContainer>
    )
})

export default HomePage