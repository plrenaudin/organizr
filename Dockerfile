FROM yarnpkg/node-yarn:node7

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY . /app/
RUN yarn

EXPOSE 3003
CMD [ "yarn", "start" ]