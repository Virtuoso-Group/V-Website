import { useCallback, useEffect, useState } from "react";
import Marquee from "react-fast-marquee"

const getTextWidth = (text: string, font: string): number =>
{
    const canvas = document.getElementsByTagName("canvas")[0]?? document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context)
        return 0;

    context.font = font;
    return context.measureText(text).width;
}

const useDetectWidthDifference = () =>
{
    const [isChildLarger, setIsChildLarger] = useState<boolean>(false);

    const [textNode, setTextRef] = useState<HTMLSpanElement>()

    const detectWidthDifference = useCallback(() =>
    {
        if (!textNode) 
            return

        const font = window.getComputedStyle(textNode).font

        const textWidth = getTextWidth(textNode.textContent?? "", font);

        const parentWidth = textNode.parentElement?.parentElement?.parentElement?.offsetWidth?? 0;
    
        setIsChildLarger(textWidth > parentWidth)
    }, [textNode])

    useEffect(() => 
    {
        detectWidthDifference();

        window.addEventListener("resize", detectWidthDifference);

        return () => 
        {
            window.removeEventListener("resize", detectWidthDifference);
        }
    }, [detectWidthDifference])

    return { isChildLarger, setTextRef }
}

type MarqueeSetting = { type: "hover", isHover: boolean }

interface Props
{
    className?: string,

    containerStyle?: string,

    childStyle?: string,

    setting?: MarqueeSetting,

    text: string
}


/*
    A versatile Marquee component. 

    If the text is partially visible, it will scroll based on the settings you choose (auto, hover);

    I named it "VMarquee" because "Marquee" is taken by react-fast-marquee.

    I guess the "V" can stand for "Versatile" then :P

*/
const VMarquee = (props: Props) => 
{
    const { containerStyle, childStyle, text, setting } = props;

    const { isChildLarger, setTextRef } = useDetectWidthDifference();
    const [isPlaying, setPlay] = useState(false);

    useEffect(() => 
    {         
        if (!setting) 
            setPlay(isChildLarger)
        else
            setPlay(isChildLarger && setting.isHover) 
    }, [isChildLarger, setting]);
    
    
  return (
    <Marquee
        key={isPlaying+""}
        className={containerStyle}
        play={isPlaying} 
        delay={!setting? 1.5: 0} 
        speed={35}
    >
      <span 
        ref={ref =>
        {
            if (ref) 
            {
                setTextRef(ref)
            }
        }} 
        className={`${childStyle} ${!setting? "pe-5": ""}`}>
            {text}
        </span>
    </Marquee>
  )
}

export default VMarquee