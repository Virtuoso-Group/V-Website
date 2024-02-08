const LOCAL_ADDRESS = process.env.REACT_APP_DEVICE_ADDRESS?? "http://localhost:4000";

export const baseURLObj =
{
    local: LOCAL_ADDRESS,
    dev: "https://virtuoso-music-153237c4d27d.herokuapp.com"
}

type Environment = 'local' |'dev';

// const env: Environment = 'dev';

const env: Environment = (process.env.REACT_APP_ENV as Environment)

export const AWS_URL =
{
    release:
    {
        local: 'https://virtuoso-release.s3.me-south-1.amazonaws.com',
        dev: 'https://virtuoso-release.s3.me-south-1.amazonaws.com',
    }
}


export const releaseURL = AWS_URL.release[env];
export const baseURL = baseURLObj[env]

// TODO: move this to the
export const getCoverArt = (releaseID: string) =>
{
    return `${releaseURL}/${releaseID}/cover_art.jpeg`
}
