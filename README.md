# organizall

> A Vue.js project

## Front Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
## Back Build Setup

create `server/.env` file:
```javascript
module.exports = {
  pk: [API_KEY],
  GOOGLE_CLIENT_ID: [KEY],
  GOOGLE_CLIENT_SECRET: [SECRET],
  SERVER_URL: 'http://localhost:3003',
  FRONT_URL: 'http://localhost:8080',
  SMTP_USER: 'admin@organizr.io',
  SMTP_PASS: [PASS],
  SMTP_HOST: [HOST]
}
```

``` bash

docker-compose down
docker-compose build
docker-compose up

```