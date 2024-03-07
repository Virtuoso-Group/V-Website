import { convertMillisecondsToTimestamp } from "../../../../Utils/helper";
import { useWebsiteContext } from "../../../Organisms/WebsiteLayout";

type AlbumTrackData =
{
    _id: string,
    no: number,
    title: string,
    duration: number
}

interface AlbumTrackProps
{
    track: AlbumTrackData
}

const AlbumTrack = (props: AlbumTrackProps) =>
{
    const { selectTrack } = useWebsiteContext();

    const { track } = props;

    return (
        <tr
            className="text-white select-none cursor-pointer w-full border-b border-slate-700 last:border-none"
            onClick={() => selectTrack(track._id)}
        >
            <td className="text-gray-300 py-2">{track.no}</td>

            <td className="font-bold w-2 py-2">{track.title}</td>

            <td className="text-end py-2">{convertMillisecondsToTimestamp(track.duration)}</td>
        </tr>
    )
}

interface Props 
{
    tracks: AlbumTrackData[]
}

const TrackList = (props: Props) =>
{
    const { tracks } = props;

    return (
        <table className="relative w-full table-auto  border-collapse text-left">
            <thead className="text-white">
                <tr>
                    <th scope="col" className="w-1/12">No</th>

                    <th scope="col w-9/12">Name</th>

                    <th scope="col" className="w-2/12 text-end">Duration</th>
                </tr>
            </thead>
            
            <tbody className="w-full">
                {tracks.map(track => 
                {
                    return <AlbumTrack key={track._id} track={track}/>
                })}
            </tbody>
        </table>
    )
}

export default TrackList