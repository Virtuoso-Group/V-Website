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
                h-[64px] w-full 
                flex items-center
                px-10 HD:px-20
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