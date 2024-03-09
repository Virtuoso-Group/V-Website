import { useEffect } from "react";
import { useParams } from "react-router"
import { Artist } from "../../Utils/types/track";
import Avatar from "../Atoms/Avatar";
import { useWebsiteContext } from "../Organisms/WebsiteLayout";
import useAPI from "../../Utils/hooks/useAPI";

export const ArtistPage = () => 
{
  const { artistID } = useParams();
  const { websitePadding } = useWebsiteContext();

  const artist = useAPI<Artist | null>("/music/artist/", "get", null);

  useEffect(() => 
  {
    if (artistID) 
    {
      artist.execute(artistID);
    }
  }, [artistID])
  
  const artistData = artist.data;

  console.log("artistData: ", artistData);
  
  return (
    <div 
      className={`
        ${websitePadding}
        relative 
        mt-[2rem]  
        w-full flex flex-col gap-20`}
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
    </div>
  )
}


export default ArtistPage