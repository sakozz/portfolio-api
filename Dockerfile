# syntax=docker/dockerfile:1.0.0-experimental
ARG     NODE_VERSION=22.10.0
ARG     IMAGE_OS=alpine


FROM node:${NODE_VERSION}-${IMAGE_OS} As production

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN     npm ci
COPY    --chown=node:node . .
COPY    --chown=node:node ./entrypoint.sh  /usr/local/bin/entrypoint.sh
RUN     chmod +x /usr/local/bin/entrypoint.sh

# Run the build command which creates the production bundle
RUN     npm run build
ENV     NODE_ENV production
USER    node

# Start the server using the production build
EXPOSE  ${API_SERVER_PORT}
RUN     npm run start:prod
