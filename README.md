# Blue Sky Analtics Assignment
Built APIs for cleaning up kaggle data and use it to query and create endpoints for fetching the data

## Endpoints
- View all countries => /countries
- Query country data by name => country/:name?startYear=1995&endYear=2000&parameters=co2

## Installation

Assignment requires Node.js with typescript, MySQL and supertest and jest for testing endpoints.

Install the dependencies and devDependencies and start the server.

```sh
cd blue-sky-analytics-assignment
npm i
npm run start:dev
```

## Testing
Testing Supertest:
```sh
npm run test:dev
```

#### Deployed on heroku 
```sh
https://blue-sky-analytics-assignment.herokuapp.com/api/v1/
```