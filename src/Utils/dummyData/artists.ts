export type Artist =
{
    id: number
    name: string,
    image: string,
    albums: number[]
}

const PorcupineTree: Artist =
{
    id: 0,
    name: "Porcupine Tree",
    image: "https://scontent.fruh4-5.fna.fbcdn.net/v/t39.30808-6/252230889_437061907781425_898070387270580468_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=tTTVtQbl4egAX_V2_4Y&_nc_ht=scontent.fruh4-5.fna&oh=00_AfDhQ4NeCb0cN7UdMjUuGEqdR1yCypl18BBPSth7s_uURQ&oe=650162BB",
    albums: [0, 3, 6, 7]
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
    image: "https://scontent.fruh4-2.fna.fbcdn.net/v/t39.30808-6/351319113_605855017983128_101916105842635120_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=5UVjrfjxtHQAX-FstPl&_nc_ht=scontent.fruh4-2.fna&oh=00_AfCWGoOFA26Lm4vVDsfCyziybAJWS4bomyBGcSbcSkXi6g&oe=6500BCFD",
    albums: [11]
}

export const Artists: Artist[] = 
[
    PorcupineTree, CrossFaith, Eagles, 
    ThePineappleThief, AbandonedPools,
    BandaiMusic, CapcomSoundTeam
];

const ArtistsObject: {[index: number]: Artist} =
{
    0: PorcupineTree,
    1: CrossFaith,
    2: Eagles,
    3: ThePineappleThief,
    4: AbandonedPools,
    5: BandaiMusic,
    6: CapcomSoundTeam
}

export default ArtistsObject