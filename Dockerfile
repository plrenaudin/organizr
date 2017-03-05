FROM node:boron

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY . /app/
RUN npm install

EXPOSE 3003
CMD [ "npm", "start" ]