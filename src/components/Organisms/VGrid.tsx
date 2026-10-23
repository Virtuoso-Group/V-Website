import { ReactNode } from 'react'
import { websitePadding } from '../../config/style';
import useDeviceType from '../../config/useDeviceType';

type Props = {
    children: ReactNode
}

const VGrid = (props: Props) => {
    const deviceType = useDeviceType();

    const { children } = props;
    
    return (
        <div className={`relative ${websitePadding} ${deviceType === "MOBILE"? "grid grid-cols-2 gap-5": `grid grid-cols-6 gap-10`}  pb-8 w-full `}>
            {children}
        </div>
    )
}

export default VGrid