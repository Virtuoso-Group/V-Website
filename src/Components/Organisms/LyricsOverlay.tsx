
interface Props
{
    line: string,
}

const LyricsOverlay = (props: Props) =>
{
    const { line } = props;


    return (
        <div className='w-[375px] h-full flex bg-slate-900 border'>
            <section className="select-none h-full w-full flex items-center justify-center">
                <p className="font-bold text-white text-5xl h-fit text-center">
                    {line}
                </p>
            </section>
        </div>
    )
}

export default LyricsOverlay