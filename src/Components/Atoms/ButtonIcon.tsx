
interface Props
{
    className?: string,
    name: string,
    onClick: () => void,
    icon: JSX.Element
}
const ButtonIcon = (props: Props) =>
{
    const { className, name, icon, onClick} = props;

    return (
        <button 
            className={className}
            name={name}
            onClick={onClick}
        >
            {icon}
        </button>
    )
}

export default ButtonIcon;