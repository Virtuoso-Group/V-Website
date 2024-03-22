import { RefObject, memo, useCallback, useEffect, useRef } from "react";

const useScrollBehavior = (ref: RefObject<HTMLElement>) =>
{
    // const ref = useRef<HTMLElement>(null);

    const smoothScroll = useCallback(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: "center", inline: "center" }), []);

    const instantScroll = useCallback(() => ref.current?.scrollIntoView({ block: "center", inline: "center" }), []);

    return { smoothScroll, instantScroll }
}

interface Props
{  
    timestamp: number, 
    value: string, 
    isSelected: boolean,  
    seek: (timestamp: number) => void
}

const Line = memo((props: Props) =>
{
    const { isSelected } = props;

    const ref = useRef<HTMLParagraphElement>(null);
    const hasMounted = useRef<boolean>(false)

    const { smoothScroll, instantScroll } = useScrollBehavior(ref)
    
    useEffect(() => 
    {
        if (isSelected) 
        {
            instantScroll()
        }
    
        hasMounted.current = true;
    }, [])
    
    useEffect(() => 
    {        
        console.log("isSelected: ", isSelected);
        
        if (hasMounted.current && isSelected) 
        {
            smoothScroll()
        }
    }, [isSelected])
    
    const value = !!props.value.length? props.value: "♪";

    return (
        <p 
            ref={ref}
            className=
            {`
                ${
                    props.isSelected
                ? 
                    "font-bold drop-shadow-5xl py-[1.125rem] text-white text-2xl XGA:text-5xl"
                : 
                    "text-xl XGA:text-3xl text-white/60"
                }

                cursor-pointer
                
                h-fit
                 
            `}

            onClick={() => props.seek(props.timestamp)}
        >
            {value}
        </p>
    )
})

export default Line
