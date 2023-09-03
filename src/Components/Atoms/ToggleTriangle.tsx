import { motion } from 'framer-motion'
import { GoTriangleDown } from 'react-icons/go'

type Props = 
{
    isOn: boolean,
    toggle: () => void
}


const ToggleTriangle = (props: Props) => 
{
    const { isOn, toggle } = props;
    
    return (
        <motion.div
            className='ms-5 w-fit h-fit flex items-center justify-center'
            animate={{ rotate: isOn? 180: 0 }}
            transition={{ duration: 0.125 }}
            onClick={toggle}

        >
            <GoTriangleDown 
                className={`fill-white`}
                size={35}
            />
        </motion.div>
    )
}

export default ToggleTriangle;