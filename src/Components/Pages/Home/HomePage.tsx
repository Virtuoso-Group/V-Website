
import { useState } from 'react'
import { Category } from '../../../Utils/types';
import Chip from '../../Atoms/Chip';
import TracksSection from './Components/TracksSection';
import AlbumsSection from './Components/AlbumsSection';
import ArtistsSection from './Components/ArtistsSection';

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

    const HomeSections: { [index: string]: () => JSX.Element } = 
    {
        'tracks': TracksSection,
        'albums': AlbumsSection,
        'artists': ArtistsSection
    }

    const ChosenSection: () => JSX.Element = HomeSections[selectedCategory.id];

    return (
        <div className={`flex flex-col gap-10 pt-[calc(64px)]`}>
            
            {/* TODO: check the calculations here for top and pt */}
            {/* TODO: better yet: determine whether you should move this component to WebsiteLayout or not */}
            <div className='pt-[65px] px-20 z-[49] top-[calc(25px)] fixed w-full flex gap-5 bg-primary'>
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
            
            <div className='px-20 mt-20 flex flex-wrap w-full gap-8 h-full'>
                <ChosenSection />
            </div>
        </div>
    )
}

export default HomePage