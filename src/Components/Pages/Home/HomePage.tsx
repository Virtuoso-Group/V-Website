
import { useEffect, useState } from 'react'
import { Category } from '../../../Utils/types';
import Chip from '../../Atoms/Chip';
import TracksSection from './Components/TracksSection';
import ReleasesSection from './Components/AlbumsSection';
import ArtistsSection from './Components/ArtistsSection';
import useAPI from '../../../Utils/hooks/useAPI';
import { Artist, Release, Track } from '../../../Utils/types/track';

const Categories: Category[] = 
[
    { id: 'tracks', label: "Tracks" },

    { id: 'albums', label: "Albums" },

    { id: 'artists', label: "Artists" }
]


const HomePage = () => 
{   
    const [selectedCategory, setSelectedCategory] = useState<Category>(Categories[0])
    
    const selectCategory = (index: number) => setSelectedCategory(Categories[index]);

    const tracksAPI = useAPI<Track[]>("music/track/getAll", 'get', []);

    const albumsAPI = useAPI<Release[]>("music/release/getAll", 'get', [])

    const artistsAPI = useAPI<Artist[]>("music/artist/getAll", 'get', [])

    useEffect(() => 
    { 
        tracksAPI.execute();
        albumsAPI.execute();
        artistsAPI.execute();
    }, []);


    const HomeSections: { [index: string]:  JSX.Element } = 
    {
        'tracks': <TracksSection data={tracksAPI.data} />,
        'albums':  <ReleasesSection data={albumsAPI.data} />,
        'artists': <ArtistsSection data={artistsAPI.data} />
    }

    const ChosenSection = HomeSections[selectedCategory.id];

    return (
        <div className={`flex flex-col gap-10 pt-[4rem]`}>
            <div className='pt-[4.0625rem] px-10 HD:px-20 z-[49] top-[1.5625rem] fixed w-full flex gap-5 bg-primary'>
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
            
            <div className='px-10 HD:px-20 mt-20 flex flex-wrap w-full gap-8 h-full'>
                {ChosenSection}
            </div>
        </div>
    )
}

export default HomePage