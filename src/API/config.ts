export const baseURL =
{
    local: "http://localhost:4000",
    develop: ""
}

type Environment = 'dev' | 'prod';

const environment: Environment = 'dev';

export const AWS_URL =
{
    release:
    {
        dev: 'https://virtuoso-release.s3.me-south-1.amazonaws.com',
        prod: ''
    }
}


export const releaseURL = AWS_URL.release[environment]