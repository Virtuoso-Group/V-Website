import { Artist } from "../types/track"


const PorcupineTree: Artist =
{
    id: 0,
    name: "Porcupine Tree",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Porcupine_Tree_%282967150113%29.jpg",
    albums: [0, 3, 6, 7, 12, 14]
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
    name: "Namco Sounds",
    image: "https://pbs.twimg.com/profile_images/1694194793/namcosounds_icon_400x400.jpg",
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

const Swans: Artist =
{
    id: 8,
    name: "Swans",
    image: "https://cdn.localspins.com/wp-content/uploads/2015/02/20133118/Swans-pc-Samantha-Marble-hi.jpg",
    albums: [15]
}

const FearFactory: Artist =
{
    id: 9,
    name: "Fear Factory",
    image: "https://yt3.googleusercontent.com/ytc/AOPolaSMBikeJ08-OnB3Ckwte36NBzE8an2XiGFtEPoIGQ=s900-c-k-c0x00ffffff-no-rj",
    albums: [16]
}

const StevenWilson: Artist =
{
    id: 10,
    name: "Steven Wilson",
    image: "https://i.guim.co.uk/img/media/eb4ed94f27a0768389bc033a4f75427e69594f83/0_550_8256_4954/master/8256.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=0a3a202710f7e9f5350e17356e894592",
    albums: [17]
}


const ArtistsObject: { [index: number]: Artist } = {}

export const Artists: Artist[] = 
[
    PorcupineTree, CrossFaith, Eagles, 
    ThePineappleThief, AbandonedPools,
    BandaiMusic, CapcomSoundTeam,
    TakeharuIshimoto, Swans,
    FearFactory, StevenWilson
];



Artists.forEach(artist => { ArtistsObject[artist.id] = artist })

export default ArtistsObject