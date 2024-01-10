export const baseURLObj =
{
    local: "http://localhost:4000",
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

export const getCoverArt = (releaseID: string) =>
{
    return `${releaseURL}/${releaseID}/cover_art.jpeg`
}