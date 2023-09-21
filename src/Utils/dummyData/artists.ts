import { Artist } from "../types/track"


const PorcupineTree: Artist =
{
    id: 0,
    name: "Porcupine Tree",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Porcupine_Tree_%282967150113%29.jpg",
    albums: [0, 3, 6, 7, 12]
}

const CrossFaith: Artist =
{
    id: 1,
    name: "Crossfaith",
    image: "https://static.wixstatic.com/media/b58fae_786f709471a744ed83bd7475f88ec2a4~mv2.jpg",
    albums: [1]
}

const Eagles: Artist =
{
    id: 2,
    name: "Eagles", 
    image: "https://cdn.britannica.com/50/198850-050-46C563B5/Eagles-Bernie-Leadon-Don-Henley-Glenn-Frey.jpg",
    albums: [2]
}


const ThePineappleThief: Artist =
{
    id: 3,
    name: "The Pineapple Thief",
    image: "https://www.therockpit.net/wp-content/uploads/2018/07/news-thepineapplethief2.jpg", 
    albums: [4, 5]
}


const AbandonedPools: Artist =
{
    id: 4,
    name: "Abandoned Pools",
    image: "https://f4.bcbits.com/img/0005875733_10.jpg",
    albums: [8]
}

const BandaiMusic: Artist =
{
    id: 5,
    name: "Bandai Music",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0f/BANDAI_logo.png",
    albums: [9, 10]

}

const CapcomSoundTeam: Artist =
{
    id: 6,
    name: "Capcom Sound Team",
    image: "https://yt3.googleusercontent.com/ytc/AOPolaRVHm8yrIssqg7Y9kO59GqEHQh_I6qHUzC_k0ifzQ=s900-c-k-c0x00ffffff-no-rj",
    albums: [11]
}


const TakeharuIshimoto: Artist =
{
    id: 7,
    name: "Takeharu Ishimoto",
    image: "https://media.vgm.io/artists/67/776/776-1347913539.jpg",
    albums: [13]
}


const ArtistsObject: { [index: number]: Artist } = {}

export const Artists: Artist[] = 
[
    PorcupineTree, CrossFaith, Eagles, 
    ThePineappleThief, AbandonedPools,
    BandaiMusic, CapcomSoundTeam,
    TakeharuIshimoto
];



Artists.forEach(artist => { ArtistsObject[artist.id] = artist })

export default ArtistsObject