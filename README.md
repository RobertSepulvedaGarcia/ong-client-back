# Server Base - Proyecto ONG

## Api Documentation

Thanks to Postman , we where able to publish An API documentation that will help you to undertand what each EndPoint returns

[API Documentation](https://documenter.getpostman.com/view/12145996/TzJpgeK1)

In order to test the API yourself, we're glad to leave you a guide that will walk you through each step of the process

### Must Have

1. [Postman](https://www.postman.com/downloads/)

### How to use

1. On our [Doc site](https://documenter.getpostman.com/view/12145996/TzJpgeK1) you will find on the top right cornert a button that says "Run in Postman", click on it and it will download you a Postman collection that holds all the EndPoints that you can find in the documentation.

2. Set Up an Environment Variable inside postman called "URL" , that will be use as the base URL for each EndPoint call , if you don't know how to set it up here is guide to [set up a postman environment variable](https://developers.onelogin.com/api-docs/1/getting-started/postman-collections) that will walk you through each step

## Envinroment setup

1) Create database
2) Copy .env.example to .env and fill with database credentials.

To install dependencies, run
``` bash
npm install
```

3) Migrations:
``` bash
npx sequelize-cli db:migrate
```

4) Seeders:
``` bash
npx sequelize-cli db:seed:all
```

## Start local server

``` bash
npm start
```

# Users test

Gustavo@test.com
Jack@test.com
Peter@test.com
Fabricio@test.com
Victoria@test.com
Celeste@test.com
Rick@test.com
Sergio@test.com
Esteban@test.com
David@test.com
Victor@test.com
Luis@test.com
Homer@test.com
Ignacion@test.com
Antonela@test.com
Virginia@test.com
Selene@test.com
Clarisa@test.com
Genaro@test.com
Hector@test.com

Password
123456