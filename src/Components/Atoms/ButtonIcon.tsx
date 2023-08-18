
interface Props
{
    className?: string,
    onClick: () => void,
    icon: JSX.Element
}
const ButtonIcon = (props: Props) =>
{
    return (
    <button 
        className={props.className}
        name='Lyrics'
        onClick={props.onClick}
    >
        {props.icon}
    </button>
)
}

export default ButtonIcon;