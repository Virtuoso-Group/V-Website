
interface Props
{
    className?: string, 
    name: string, 
    coverArt: string,
    loading?: "eager" | "lazy"
}

const CoverArt = (props: Props) =>
{
    const { className, name, coverArt, loading } = props;

    return (
        <img
            className={`grow-0 shrink-0 aspect-square object-fit ${className}`}
            title={name} alt={name}
            src={coverArt}
            loading={loading?? "lazy"}
        />
)
}

export default CoverArt