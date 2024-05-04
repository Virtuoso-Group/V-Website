import { Link as ReactLink } from "react-router-dom"


interface Props
{
    to: string,
    text: string,

    onClick?: () => void
}

// Serves as a wrapper the react-router-dom Link. 
// I created this so I don't have to style it every time.
const Link = (props: Props) => 
{
  return (
    <ReactLink className='hover:underline' to={props.to} onClick={props.onClick}>
        {props.text}
    </ReactLink>
  )
}

export default Link