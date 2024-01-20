interface Props
{
    className?: string,
    start?: React.ReactElement,
    middle?: string,
    end?: string
}


const WebsiteHeader = (props: Props) =>
{
    const { className, start, middle, end } = props;

    return ( 
        <header 
            className=
            {`
                h-[4rem]

                w-full 
                flex items-center
                
                bg-black
                ${className}
            `}
        >
            <div>{start}</div>

            <div>{middle}</div>

            <div>{end}</div>
        </header>
    )
}

export default WebsiteHeader;