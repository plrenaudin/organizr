# Organizr

> This project is a Doodle clone which allows to organize events collaboratively by choosing a Date, a Location, creating a Todo List and Polls.

Before starting you will need a Google API account and a server with Docker and SMTP support (only for passwordless feature).

Tech stack:

* Frontend built with [Vue.js](https://vuejs.org/)
* Backend built with [Restify](http://restify.com/)
* Integration of Google API and [Passwordless](https://passwordless.net/)

## Frontend Build Setup

``` bash
# install dependencies
yarn

# serve with hot reload at localhost:8080
yarn dev

# build for production with minification
yarn build
```
## Backend Build Setup

create `server/.env` file:
```javascript
module.exports = {
  pk: [PRIVATE_KEYS],
  GOOGLE_CLIENT_ID: [GOOGLE_CLIENT_ID],
  GOOGLE_CLIENT_SECRET: [GOOGLE_CLIENT_SECRET],
  SERVER_URL: 'http://localhost:3003',
  FRONT_URL: 'http://localhost:8080',
  SMTP_USER: [SMTP_SERVER_USER],
  SMTP_PASS: [PASSWORD],
  SMTP_HOST: [HOST]
}
```

``` bash

docker-compose down
docker-compose build
docker-compose up

```