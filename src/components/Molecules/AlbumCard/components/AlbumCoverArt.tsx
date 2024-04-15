import CoverArt from '../../../Atoms/CoverArt'

type Props = 
{
    release: { title: string, coverArt: string }
}

const AlbumCoverArt = (props: Props) => 
{
    const { release } = props;

    return (
        <div className='relative'>
            <CoverArt 
                className={`w-full absolute right-5 rounded-lg scale-[0.9] bg-blend-darken`}
                release={release} 
            />

            <CoverArt 
                className={`w-full relative rounded-lg drop-shadow-2xl `}
                release={release} 
            />
        </div>
    )
}

export default AlbumCoverArt