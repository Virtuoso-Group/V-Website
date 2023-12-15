import React from 'react'

// TODO: this component should have a default value
interface Props
{   
    className?: string,
    src: string,
    title: string,
}

export const Avatar = (props: Props) => 
{

  return (
        <img 
            className={`grow-0 shrink-0 object-cover rounded-full aspect-square ${props.className}`}
            src={props.src}
            title={props.title}
            alt={props.title}
            loading='lazy'
        />
  )
}

export default Avatar;