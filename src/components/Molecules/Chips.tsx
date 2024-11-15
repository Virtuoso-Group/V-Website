import { websitePadding } from '../../config/style'
import { Category } from '../../Utils/types';
import Chip from '../Atoms/Chip';

type Props = {
    className?: string,
    contents: Category[]
    selectedID: string,
    select: (id: string) => void,
}

const Chips = (props: Props) => {

    const { contents, selectedID, select } = props;

  return (
    <div className={`${websitePadding} z-[40] top-[4rem] sticky py-[1rem] w-full flex gap-5 bg-background`}>
        {
            contents.map((content, index) =>  
            {
                return (
                    <Chip
                        key={content.id} 

                        isSelected={selectedID === content.id} 
                        text={content.label} 

                        select={() => select(content.id)}
                    />
                )
            })
        }
    </div>
  )
}

export default Chips