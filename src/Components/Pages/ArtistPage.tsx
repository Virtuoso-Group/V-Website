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
  
  // pt-[1.5625rem]

  const artistData = artist.data;

  return (
    <div 
        className=
        {`
            mt-[2rem]
            ${websitePadding}
            w-full
            flex flex-col 
            gap-20
             
        `}
    >
      {/* Basic artist info */}
      <div className="border h-[15.625rem] flex gap-10">
        <Avatar
          className="h-full" 
          src={artistData? artistData.image: ""} 
          title={artistData? artistData.name: ""} 
        />

        <h1 className="mt-10 text-xl SD:text-4xl text-white font-bold">
          {artistData? artistData.name: ""}
        </h1>
      </div>

      {/* Their content */}
      <div className="h-[12.5rem] border bg-green-600">
        <h1 className="text-2xl text-white font-bold">{"Albums"}</h1>
      </div>
    </div>
  )
}


export default ArtistPage