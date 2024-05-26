# Virtuoso! Website

This is the website version of the Virtuoso! application.

For more detailed information, check out the [documentation](https://swejaber.atlassian.net/wiki/spaces/VW/pages/4751549/Website).

## Setup
Please use Git Bash as your terminal to complete these instructions.

1- Clone the repository
```console
git clone https://github.com/Virtuoso-Group/V-Website.git
```

2- Install npm packages
```console
npm i
```

3- Create an `.env` file
```console
touch .env
```

Property | Value |
--- | --- |
REACT_APP_DEVICE_ADDRESS | `http://<local_network_ip>:<local_backend_port-no>`



## How to Run
If you've been tasked with working on a fullstack feature – one that requires simultaneous development on both the frontend and backend – then it's essential to run V-Website and V-Backend locally.

To do so, follow these steps:

1- Run V-Backend locally

2- Run V-Web locally

* Mac
```console
npm run start:local
```

* Windows
```console
REACT_APP_ENV=dev npm start
```

However, if you’ve only been tasked to make a cosmetic change on the frontend, you may run V-Website locally and connect to the deployed V-Backend by running `npm run start:dev`
