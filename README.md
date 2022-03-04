# e2e test automation scaffold with Jest and Puppeteer


## Step 1
## Clone the repository

- `git clone https://github.com/rink9/jest-puppeteer-scaffold.git`
- `cd to jest-puppeteer-scaffold`

## Step 2
## Provide your credentials
- Open `.env.example` file under tests/e2e and provide your credentials
- After everything is done, rename file as `.env` and save it

## Step 3
## Install
`npm install`

## Step 4
## Run the test cases
To run interactively:

`npm run test:e2e -- --wordpress-base-url=BASE_URL --wordpress-username=username --wordpress-password=password --puppeteer-interactive`

To run headlessly:

`npm run test:e2e -- --wordpress-base-url=BASE_URL --wordpress-username=username --wordpress-password=password `
