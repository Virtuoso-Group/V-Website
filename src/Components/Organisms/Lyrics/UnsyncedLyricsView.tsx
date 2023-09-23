type Props = 
{
    lyrics: string
}

const UnsyncedLyricsView = (props: Props) => 
{
    const { lyrics } = props;

  return (
    <div className="h-full w-full flex items-start justify-center">
        <pre 
            className=
            {` 
                w-fit
                text-center
                whitespace-pre-line
                font-bold text-white text-xl drop-shadow-5xl

                py-10
            `}
        >
            {lyrics}
        </pre>
    </div>
  )
}

export default UnsyncedLyricsView;

