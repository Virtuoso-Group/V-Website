export const Instrumental = () => 
{
  return (
    <div className=
        {`
            z-[50]
            flex justify-center items-center

            gap-10 
            pt-[5rem] SD:pt-0 
            pb-[calc(6.5rem+5rem)] SD:pb-0
            SD:py-10
            h-full w-full  
        `}
    >
        <pre 
            className=
            {`
                font-bold 
                text-white text-xl XGA:text-3xl text-center  drop-shadow-5xl
            `}
        >
            ♪ Instrumental Track ♪
        </pre>
    </div>
  )
}
