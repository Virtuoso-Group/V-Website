import { memo } from "react";
import { IoIosClose } from "react-icons/io";


const CloseButton = memo((props: { className?: string, onClick: () => void}) =>
{
    const { className, onClick } = props;

    return (
        <div className={` flex items-end  cursor-pointer ${className}`}>
            <IoIosClose 
                className={`fill-white`} 
                size={"2.25rem"} 
                onClick={onClick}
            />
        </div>
    )
})

export default CloseButton;