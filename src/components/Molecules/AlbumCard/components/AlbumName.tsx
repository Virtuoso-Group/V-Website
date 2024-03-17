import React from 'react'
import Marquee from 'react-fast-marquee'

type Props = 
{
    isHover: boolean,
    title: string
}

const AlbumName = (props: Props) => 
{
    const { isHover, title } = props;

  return (
    <Marquee 
        key={""+isHover}
        play={isHover}
        autoFill={false}
    >
        <span className='text-lgn font-extrabold pe-10'>{title}</span>
    </Marquee>
  )
}

export default AlbumName