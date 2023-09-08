import type { Album } from "../types"

import TekkenArtworkFile from '../../assets/music/Tekken_Tag_Tournament_Direct_Audio.jpg'


const CLOSURE_CONTINUATION: Album =
{
    id: 0,
    name: "CLOSURE/CONTINUATION",
    coverArt: "https://i.discogs.com/ToSXSFOum9JyUA8KiQf7OAa4Hy7akb0_ubAv4sKlJTw/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIzNjEy/ODY3LTE2NjMyODE4/NjUtNzg1OS5qcGVn.jpeg"
}

const SOULSEEKER: Album =
{
    id: 1,
    name: "Soul Seeker",
    coverArt: "https://i.scdn.co/image/ab67616d0000b273811f195826f821502a0e251e"
}

const HotelCalifornia: Album =
{
    id: 2,
    name: "Hotel California",
    coverArt: "https://d24jnm9llkb1ub.cloudfront.net/icpn/603497922888/603497922888-cover-zoom.jpg"
}

const TheSkyMovesSideways: Album =
{
    id: 3,
    name: "The Sky Moves Sideways",
    coverArt: "https://www.progarchives.com/progressive_rock_discography_covers/290/cover_3535101952016_r.jpg"
}

const Dissolution: Album =
{
    id: 4,
    name: "Di§olution",
    coverArt: "https://f4.bcbits.com/img/a3906062646_10.jpg"
}

const YourWilderness: Album =
{
    id: 5,
    name: "Your Wilderness",
    coverArt: "https://f4.bcbits.com/img/a0782605810_10.jpg"
}

const StarsDieTheDeleriumYears: Album =
{
    id: 6,
    name: "Stars Die | The Delerium Years 1991 - 1997",
    coverArt: "https://f4.bcbits.com/img/a2478433017_10.jpg"
}

const Deadwing: Album =
{
    id: 7,
    name: "Deadwing",
    coverArt: "https://f4.bcbits.com/img/a2422238227_10.jpg"
}

const Humanistic: Album =
{
    id: 8,
    name: "Humanistic",
    coverArt: "https://m.media-amazon.com/images/I/51tr3U--3AL._UX716_FMwebp_QL85_.jpg"
}


const TekkenTagTournamentOriginalSoundtrack: Album =
{
    id: 9,
    name: "Tekken Tag Tournament Original Soundtrack",
    coverArt: "https://vgmsite.com/soundtracks/tekken-tag-tournament-arcade-ost/BK.jpg"
}

const TekkenTagTournamentDirectAudio: Album =
{
    id: 10,
    name: "Tekken Tag Tournament Direct Audio",
    coverArt: TekkenArtworkFile
}


const AlbumsObj: { [index: number]: Album } =
{
    0: CLOSURE_CONTINUATION,
    1: SOULSEEKER,
    2: HotelCalifornia,
    3: TheSkyMovesSideways,
    4: Dissolution,
    5: YourWilderness,
    6: StarsDieTheDeleriumYears,
    7: Deadwing,
    8: Humanistic,
    9: TekkenTagTournamentOriginalSoundtrack,
    10: TekkenTagTournamentDirectAudio
}

export default AlbumsObj