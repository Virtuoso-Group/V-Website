import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { Artist } from "../../Utils/types/track";
import Avatar from "../Atoms/Avatar";
import { baseURL } from "../../config/config";
import { useWebsiteContext } from "../Organisms/WebsiteLayout";

export const ArtistPage = () => 
{
  const { artistID } = useParams();
  const { websitePadding } = useWebsiteContext();
  const [artist, setArtist] = useState<Artist | null>(null)

  const fetchArtist = async (artistID: string) =>
  {
    try 
    {
      const res = await axios.get(`${baseURL}/music/artist/get?artistID=${artistID}`);

      if (res.data && res.data.artist) 
        {
          setArtist(res.data.artist)
        }
    } 
    catch (error) 
    {
      console.error(error)
    }
  }

  useEffect(() => 
  {
    if (artistID) 
    {
      fetchArtist(artistID);
    }
  }, [artistID])
  
  // pt-[1.5625rem]
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
          src={artist?.image?? ""} 
          title={artist?.name?? ""} 
        />

        <h1 className="mt-10 text-xl SD:text-4xl text-white font-bold">
          {artist?.name?? "Name"}
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