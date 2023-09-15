import type { Album } from "../types"

import TekkenArtworkFile from '../../assets/albumCovers/Tekken_Tag_Tournament_Direct_Audio.jpg'


const CLOSURE_CONTINUATION: Album =
{
    id: 0,
    artistID: 0,
    name: "CLOSURE/CONTINUATION",
    coverArt: "https://i.discogs.com/ToSXSFOum9JyUA8KiQf7OAa4Hy7akb0_ubAv4sKlJTw/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIzNjEy/ODY3LTE2NjMyODE4/NjUtNzg1OS5qcGVn.jpeg"
}

const SOULSEEKER: Album =
{
    id: 1,
    artistID: 1,
    name: "Soul Seeker",
    coverArt: "https://i.scdn.co/image/ab67616d0000b273811f195826f821502a0e251e"
}

const HotelCalifornia: Album =
{
    id: 2,
    artistID: 2,
    name: "Hotel California",
    coverArt: "https://d24jnm9llkb1ub.cloudfront.net/icpn/603497922888/603497922888-cover-zoom.jpg"
}

const TheSkyMovesSideways: Album =
{
    id: 3,
    artistID: 0,
    name: "The Sky Moves Sideways",
    coverArt: "https://www.progarchives.com/progressive_rock_discography_covers/290/cover_3535101952016_r.jpg"
}

const Dissolution: Album =
{
    id: 4,
    artistID: 3,
    name: "Di§olution",
    coverArt: "https://f4.bcbits.com/img/a3906062646_10.jpg"
}

const YourWilderness: Album =
{
    id: 5,
    artistID: 3,
    name: "Your Wilderness",
    coverArt: "https://f4.bcbits.com/img/a0782605810_10.jpg"
}

const StarsDieTheDeleriumYears: Album =
{
    id: 6,
    artistID: 0,
    name: "Stars Die | The Delerium Years 1991 - 1997",
    coverArt: "https://f4.bcbits.com/img/a2478433017_10.jpg"
}

const Deadwing: Album =
{
    id: 7,
    artistID: 0,
    name: "Deadwing",
    coverArt: "https://f4.bcbits.com/img/a2422238227_10.jpg"
}

const Humanistic: Album =
{
    id: 8,
    artistID: 4,
    name: "Humanistic",
    coverArt: "https://m.media-amazon.com/images/I/51tr3U--3AL._UX716_FMwebp_QL85_.jpg"
}


const TekkenTagTournamentOriginalSoundtrack: Album =
{
    id: 9,
    artistID: 5,
    name: "Tekken Tag Tournament Original Soundtrack",
    coverArt: "https://vgmsite.com/soundtracks/tekken-tag-tournament-arcade-ost/BK.jpg"
}

const TekkenTagTournamentDirectAudio: Album =
{
    id: 10,
    artistID: 5,
    name: "Tekken Tag Tournament Direct Audio",
    coverArt: TekkenArtworkFile
}


const RockmanX7OriginalSoundtrack: Album =
{
    id: 11,
    artistID: 6,
    name: "Rockman X7 Original Soundtrack",
    coverArt: "https://vgmsite.com/soundtracks/rockman-x7-original-soundtrack/Booklet%20Front.jpg"
}


const OnTheSunDayofLife: Album =
{
    id: 12,
    artistID: 0,
    name: "On the Sunday of Life...",
    coverArt: "https://f4.bcbits.com/img/a0898233795_10.jpg"
}


const CrisisCoreOST: Album =
{
    id: 13,
    artistID: 7,
    name: "Crisis Core - FINAL FANTASY VII (Original Soundtrack)",
    coverArt: "https://is1-ssl.mzstatic.com/image/thumb/Features6/v4/fe/57/8e/fe578ed5-eaae-f052-5aab-db17a020d7f4/dj.ianrqufk.jpg/1200x1200bf-60.jpg"
}

const AlbumsObj: { [index: number]: Album } = { }

export const AlbumsArray:  Album[] = 
[
    CLOSURE_CONTINUATION,
    SOULSEEKER,
    HotelCalifornia,
    TheSkyMovesSideways,
    Dissolution,
    YourWilderness,
    StarsDieTheDeleriumYears,
    Deadwing,
    Humanistic,
    TekkenTagTournamentOriginalSoundtrack,
    TekkenTagTournamentDirectAudio,
    RockmanX7OriginalSoundtrack,
    OnTheSunDayofLife,
    CrisisCoreOST
]

AlbumsArray.forEach(album => { AlbumsObj[album.id] = album })

export default AlbumsObj