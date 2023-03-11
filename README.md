# tasks-crud
A simple CRUD application using NestJS, TypeORM, and MariaDB.

This project is an **educational project** to learn how to use TypeORM with NestJS, 
I learned a lot and hope this project can help you too.

## Getting started

### Requirements / Prerequisites
1. [Node.js](https://nodejs.org/en/) 
2. Recommended: [Yarn](https://yarnpkg.com/). You can use [NPM](https://www.npmjs.com/) as an alternative.
3. [MariaDB](https://mariadb.org/) or [MySQL](https://www.mysql.com/)

### Installation

Install the dependencies with:

```bash
yarn
```

### Running the app

```bash
# development
yarn start

# watch mode
yarn start:dev

# production mode
yarn start:prod
```

### Test (Soon)

```bash
# unit tests
yarn test

# e2e tests
yarn test:e2e

# test coverage
yarn test:cov
```

## Documentation

### API

You can see the API documentation at the [repository wiki](https://github.com/vboechat/tasks-crud/wiki).

### Swagger

You can enable swagger in the environment variable file by setting the `SWAGGER` variable to `true`.<br />
Swagger will be available at the path `/api` by default, you can change this path by setting the `SWAGGER_PATH` variable.

## Environment Variables
| Variable       | Description                 | Default   |
|----------------|-----------------------------|-----------|
| API_PORT       | Port to run the application | 3000      |
| API_ADDRESS    | Address to run the app      | 0.0.0.0   |
| DB_HOST        | Database host               | localhost |
| DB_PORT        | Database port               | 3306      |
| DB_USERNAME    | Database username           | -         |
| DB_PASSWORD    | Database password           | -         |
| DB_NAME        | Database name               | -         |
| DB_SYNCHRONIZE | Database synchronize        | true      |
| SWAGGER_PATH   | Swagger path                | /api      |
| SWAGGER        | Enable swagger              | false     |

## License
This project is licensed under the [MIT LICENSE](https://choosealicense.com/licenses/mit/).
