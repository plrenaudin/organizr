FROM node:10-alpine AS build

WORKDIR /app

COPY package.json .

RUN yarn


FROM node:10-alpine

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY . .

EXPOSE 3003