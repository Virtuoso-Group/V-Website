import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { Artist } from "../../Utils/types/track";
import Avatar from "../Atoms/Avatar";

export const ArtistPage = () => 
{
  const { artistID } = useParams();
  const [artist, setArtist] = useState<Artist | null>(null)

  const fetchArtist = async (artistID: string) =>
  {
    try 
    {
      const res = await axios.get(`http://localhost:4000/music/artist/get?artistID=${artistID}`);

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
    return () => 
    {
      
    }
  }, [artistID])
  

  return (
    <div 
        className=
        {`
            min-h-screen w-screen 
            flex flex-col 
            gap-20
            pt-[calc(64px+25px)]
            px-20 
        `}
    >
      {/* Basic artist info */}
      <div className="border h-[250px] flex gap-10">
        <Avatar
          className="h-full" 
          src={artist?.image?? ""} 
          title={artist?.name?? ""} 
        />

        <h1 className="mt-10 text-4xl text-white font-bold">
          {artist?.name?? "Name"}
        </h1>
      </div>

      {/* Their content */}
      <div className="h-[200px] border">
        <h1 className="text-2xl text-white font-bold">{"Albums"}</h1>
      </div>
    </div>
  )
}


export default ArtistPage