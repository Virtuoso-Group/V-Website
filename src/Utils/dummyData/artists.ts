import { Artist } from "../types/track"


const PorcupineTree: Artist =
{
    _id: "0",
    name: "Porcupine Tree",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Porcupine_Tree_%282967150113%29.jpg",
    albums: [0, 3, 6, 7, 12, 14]
}

const CrossFaith: Artist =
{
    _id: "1",
    name: "Crossfaith",
    image: "https://static.wixstatic.com/media/b58fae_786f709471a744ed83bd7475f88ec2a4~mv2.jpg",
    albums: [1]
}

const Eagles: Artist =
{
    _id: "2",
    name: "Eagles", 
    image: "https://cdn.britannica.com/50/198850-050-46C563B5/Eagles-Bernie-Leadon-Don-Henley-Glenn-Frey.jpg",
    albums: [2]
}


const ThePineappleThief: Artist =
{
    _id: "3",
    name: "The Pineapple Thief",
    image: "https://www.therockpit.net/wp-content/uploads/2018/07/news-thepineapplethief2.jpg", 
    albums: [4, 5]
}


const AbandonedPools: Artist =
{
    _id: "4",
    name: "Abandoned Pools",
    image: "https://f4.bcbits.com/img/0005875733_10.jpg",
    albums: [8]
}

const BandaiMusic: Artist =
{
    _id: "5",
    name: "Namco Sounds",
    image: "https://pbs.twimg.com/profile_images/1694194793/namcosounds_icon_400x400.jpg",
    albums: [9, 10]

}

const CapcomSoundTeam: Artist =
{
    _id: "6",
    name: "Capcom Sound Team",
    image: "https://yt3.googleusercontent.com/ytc/AOPolaRVHm8yrIssqg7Y9kO59GqEHQh_I6qHUzC_k0ifzQ=s900-c-k-c0x00ffffff-no-rj",
    albums: [11]
}


const TakeharuIshimoto: Artist =
{
    _id: "7",
    name: "Takeharu Ishimoto",
    image: "https://media.vgm.io/artists/67/776/776-1347913539.jpg",
    albums: [13]
}

const Swans: Artist =
{
    _id: "8",
    name: "Swans",
    image: "https://cdn.localspins.com/wp-content/uploads/2015/02/20133118/Swans-pc-Samantha-Marble-hi.jpg",
    albums: [15]
}

const FearFactory: Artist =
{
    _id: "9",
    name: "Fear Factory",
    image: "https://yt3.googleusercontent.com/ytc/AOPolaSMBikeJ08-OnB3Ckwte36NBzE8an2XiGFtEPoIGQ=s900-c-k-c0x00ffffff-no-rj",
    albums: [16]
}

const StevenWilson: Artist =
{
    _id: "10",
    name: "Steven Wilson",
    image: "https://i.guim.co.uk/img/media/eb4ed94f27a0768389bc033a4f75427e69594f83/0_550_8256_4954/master/8256.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=0a3a202710f7e9f5350e17356e894592",
    albums: [17]
}

const BruceDickinson: Artist =
{
    _id: "11",
    name: "Bruce Dickinson",
    image: "https://pyxis.nymag.com/v1/imgs/53b/83b/39a314589ae7cba30f5d331d1ccb0971ad-05-bruce-dickinson-iron-maiden.rsquare.w700.jpg",
    albums: [30]
}

const Radiohead: Artist =
{
    _id: "12",
    name: "Radiohead",
    image: "https://kandyvinylshop.com/cdn/shop/products/57_b926a234-d2f6-4760-b294-d187fc4cb0a5_2048x2048.jpg?v=1646769533",
    albums: [22]
}


const ArtistsObject: { [index: string]: Artist } = {}

export const Artists: Artist[] = 
[
    PorcupineTree, CrossFaith, Eagles, 
    ThePineappleThief, AbandonedPools,
    BandaiMusic, CapcomSoundTeam,
    TakeharuIshimoto, Swans,
    FearFactory, StevenWilson, BruceDickinson,
    Radiohead
];



Artists.forEach(artist => { ArtistsObject[artist._id] = artist })

export default ArtistsObject