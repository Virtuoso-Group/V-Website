import CoverArt from '../../../Atoms/CoverArt'

type Props = 
{
    title: string,
    coverArt: string
}

const AlbumCoverArt = (props: Props) => 
{
    const { title, coverArt } = props;

    return (
        <div className='relative'>
            <CoverArt 
                className={`w-full absolute right-5 rounded-lg scale-[0.9] bg-blend-darken`}
                name={title}
                coverArt={coverArt} 
            />

            <CoverArt 
                className={`w-full relative  rounded-lg drop-shadow-2xl `}
                name={title}
                coverArt={coverArt} 
            />
        </div>
    )
}

export default AlbumCoverArt