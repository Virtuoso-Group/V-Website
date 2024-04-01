import { motion } from 'framer-motion'
import { memo } from 'react'
import { GoTriangleDown } from 'react-icons/go'

type Props = 
{
    isOn: boolean,
    toggle: () => void
}

const ToggleTriangle = memo((props: Props) => 
{
    const { isOn, toggle } = props;
    
    return (
        <motion.div
            className='w-fit h-fit flex items-center justify-center cursor-pointer'
            animate={{ rotate: isOn? 180: 0 }}
            transition={{ duration: 0.125 }}
            onClick={toggle}
        >
            <GoTriangleDown 
                className={`fill-white`}
                size={"2.25rem"}
            />
        </motion.div>
    )
})

export default ToggleTriangle;