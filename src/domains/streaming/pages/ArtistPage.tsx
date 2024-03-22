import { useEffect } from "react";
import { useParams } from "react-router"
import { Artist, ArtistRelease } from "../../../Utils/types/track";
import Avatar from "../../../components/Atoms/Avatar";
import useAPI from "../../../Utils/hooks/useAPI";
import ArtistReleaseCard from "../../../components/Molecules/AlbumCard/ArtistAlbumCard";
import { useNavigate } from "react-router-dom";
import { websitePadding } from "../../../config/style";

const ArtistAlbums = (props: { releases: ArtistRelease[] }) =>
{
  const navigate = useNavigate();

  const { releases } = props;

  return (
    <section className="flex flex-col gap-2 w-full">
      <h2 className="text-2xl text-white font-bold">Albums</h2>

      <div className="flex gap-8 overflow-x-scroll px-5">
        {releases.map(release => <ArtistReleaseCard key={release._id} release={release} onClick={() => navigate(`/album/${release._id}`)} />)}
      </div>
    </section>
  )
}

export const ArtistPage = () => 
{
  const { artistID } = useParams();

  const artist = useAPI<Artist | null>("/music/artist/", "get", null);

  useEffect(() => 
  {
    if (artistID) 
    {
      artist.execute(artistID);
    }
  }, [artistID])
  
  const artistData = artist.data;
  
  return (
    <div 
      className=
      {`
        ${websitePadding}
        relative 
        mt-[2rem]  
        w-full flex flex-col gap-10
      `}
    >
      {/* Basic artist info */}
      <header className="SD:h-[15.625rem] flex gap-10 flex-col SD:flex-row">
        <Avatar
            className="w-full SD:h-full SD:w-auto" 
            src={artistData? artistData.image: ""} 
            title={artistData? artistData.name: ""} 
          />
      
        <h1 className="text-4xl text-white font-bold">
          {artistData?._id? artistData.name: ""}
        </h1>
      </header>


      {artistData && <ArtistAlbums releases={artistData.releases} />}
    </div>
  )
}


export default ArtistPage