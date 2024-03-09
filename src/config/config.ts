
const LOCAL_ADDRESS = process.env.REACT_APP_DEVICE_ADDRESS?? "http://localhost:4000";



export const baseURLObj =
{
    local: LOCAL_ADDRESS,
    dev: "https://virtuoso-music-153237c4d27d.herokuapp.com"
}

type Environment = 'local' | 'dev';

// const env: Environment = 'dev';

const env: Environment = (process.env.REACT_APP_ENV as Environment)

export const baseURL = baseURLObj[env]