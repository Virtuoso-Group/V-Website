
import { memo, useEffect, useState } from 'react'
import { Category } from '../../../../Utils/types';
import Chip from '../../../../components/Atoms/Chip';
import TracksSection from './Components/TracksSection';
import ReleasesSection from './Components/AlbumsSection';
import ArtistsSection from './Components/ArtistsSection';
import useAPI from '../../../../Utils/hooks/useAPI';
import {  ArtistsList, SimplePublishedTrack} from '../../../../Utils/types/track';
import { websitePadding } from '../../../../config/style';
import { AlbumInfo } from '../../../../Utils/types/album';

const Categories: Category[] = 
[
    { id: 'tracks', label: "Tracks" },

    { id: 'albums', label: "Albums" },

    { id: 'artists', label: "Artists" }
]


const HomePage = memo(() => 
{   
    const [selectedCategory, setSelectedCategory] = useState<Category>(Categories[0])
    
    const selectCategory = (index: number) => setSelectedCategory(Categories[index]);

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
        'tracks':  <TracksSection tracks={tracksAPI.data} />,
        'albums':  <ReleasesSection data={albumsAPI.data} />,
        'artists': <ArtistsSection data={artistsAPI.data} />
    }

    const ChosenSection = HomeSections[selectedCategory.id];

    return (
        <div className='relative flex flex-col '>
            <div className={`${websitePadding} z-[40] top-[4rem] sticky  py-[1rem] w-full flex gap-5  bg-background`}>
                {
                    Categories.map((category, index) =>  
                    {
                        return (
                            <Chip
                                key={category.id} 

                                isSelected={selectedCategory.id === category.id} 
                                text={category.label} 

                                select={() => selectCategory(index)}
                            />
                        )
                    })
                }
            </div>
            

            {/* mt-20 */}
            <div className={`${websitePadding} pb-8 relative flex flex-wrap w-full gap-8`}>
                {ChosenSection}
            </div>
        </div>
    )
})

export default HomePage