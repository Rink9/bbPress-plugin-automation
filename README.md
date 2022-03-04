# e2e test automation for bbpress plugin

## Step 1
## Clone the repository

- `git clone https://github.com/Rink9/bbPress-plugin-automation.git`

## Step 2
## Install
`npm install`

## Step 3
## Run the test cases
To run interactively:

`npm run test:e2e -- --wordpress-base-url=BASE_URL --wordpress-username=username --wordpress-password=password --puppeteer-interactive`

To run headlessly:

`npm run test:e2e -- --wordpress-base-url=BASE_URL --wordpress-username=username --wordpress-password=password `
