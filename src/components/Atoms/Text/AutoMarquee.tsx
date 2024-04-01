import { memo, useCallback, useEffect, useState } from "react";
import Marquee from "react-fast-marquee";


type Props = 
{
    className?: string,
    text: string
}

/* 
  This element scrolls by itself when it detects 
  that the text is larger than its container 
*/

const useDetectWidthDifference = (callback: (value: boolean) => void) =>
{
    /* TODO: 
      I got desperate here. I wanted to use useRef, but it wasn't working out :D
      The reason why I used useState is because useRef was being flaky.

      Basically, I am trying to detect if the text is larger than its container. I can do that via 
      a reference to the span element.

      I need to do this when the component mounts. Sometimes, this doesn't work (because the ref is null),
      which means the text won't scroll if it is larger than its container.

      Since useRef is initially null, and detecting a change in its value is not easy,
      I opted for useState.

      The only downside is that setTextNode will rerender the component.
      Lucky for us, we only need to set the state once.
    */

    const [textNode, setTextNode] = useState<HTMLSpanElement | null>(null);
    
    const detectWidthDifference = useCallback(() =>
    {
      if (!textNode) 
        return
      
        const childWidth = textNode.offsetWidth?? 0;

        // TODO: I don't like this. It's too hacky. Can't we retrieve the grandfather
        const containerWidth = textNode?.parentElement?.parentElement?.parentElement?.offsetWidth?? 0;
        
        console.log("sizes: ", { childWidth, containerWidth });
        
        callback(childWidth > containerWidth)
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


    return { setTextNode }
}


const AutoMarquee = memo((props: Props) => 
{
  const { className, text } = props;

  const [play, setPlay] = useState(false);
  
  const updatePlay = (isLarger: boolean) =>
  {
    setPlay(old  => old !== isLarger? isLarger: old)
  }

  const { setTextNode } = useDetectWidthDifference(updatePlay)
  
  
  return (
    <Marquee
        key={play+""}
        className={`${className}`}
        play={play} delay={1.5} speed={35}
    >
      <span ref={ref => setTextNode(ref)} className="pe-5">{text}</span>
    </Marquee>
  )
})

export default AutoMarquee