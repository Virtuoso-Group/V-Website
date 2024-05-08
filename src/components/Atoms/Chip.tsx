const Chip = (props: { isSelected: boolean, text: string, select: () => void }) =>
{
    return (
        <div 
            className=
            {`
                h-fit px-4 py-2 rounded-xl 
                ${props.isSelected? "bg-secondary":"bg-[#990000]"} 
                text-sm text-white 
                select-none cursor-pointer
            `}
            onClick={props.select}
        >
            {props.text}
        </div>
    )
}

export default Chip;