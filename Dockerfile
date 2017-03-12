FROM yarnpkg/node-yarn:node7

RUN groupadd -r nodejs && useradd -m -r -g nodejs nodejs

# Create app directory
RUN mkdir -p /app
WORKDIR /app

RUN chown nodejs:nodejs -R /app

USER nodejs

# Install app dependencies
COPY package.json /app/
RUN yarn
COPY . /app/

EXPOSE 3003
CMD [ "yarn", "start" ]