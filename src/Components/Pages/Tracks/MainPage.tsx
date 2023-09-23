
import { useState } from 'react'
import { Category } from '../../../Utils/types';
import Chip from '../../Atoms/Chip';
import TracksSection from './Components/TracksSection';
import AlbumsSection from './Components/AlbumsSection';
import ArtistsSection from './Components/ArtistsSection';


const Categories: Category[] = 
[
    {
        id: 'tracks',
        label: "Tracks",
    },
    {
        id: 'albums',
        label: "Albums"
    },
    {
        id: 'artists',
        label: "Artists"
    }
]


const MainPage = () => 
{   
    const [selectedCategory, setSelectedCategory] = useState<Category>(Categories[0])
    
    const selectCategory = (index: number) => setSelectedCategory(Categories[index]);

    const Sections: { [index: string]: () => JSX.Element } = 
    {
        'tracks': TracksSection,
        'albums': AlbumsSection,
        'artists': ArtistsSection
    }

    const ChosenSection: () => JSX.Element = Sections[selectedCategory.id];

    return (
        <div 
            className=
            {`
                min-h-screen w-screen 
                flex flex-col 
                gap-10
                pt-[calc(64px+25px)]
                px-20 
            `}
        >
            <div className='flex gap-5 '>
                {
                    Categories.map((category, index) =>  
                    {
                        return (
                            <Chip
                                isSelected={selectedCategory.id === category.id} 
                                key={category.id} 
                                text={category.label} 

                                select={() => selectCategory(index)}
                            />
                        )
                    })
                }
            </div>

            <div className='flex flex-wrap w-full gap-8 h-full'>
                <ChosenSection />
            </div>
        </div>
    )
}

export default MainPage