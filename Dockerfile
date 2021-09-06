FROM node:14.15.4-alpine

# Set a working directory
WORKDIR /usr/src/app

ARG GITHUB_API_TOKEN

# Install native dependencies
RUN apk add --no-cache \
    python3 \
    make \
    gcc \
    g++ \
    musl-dev \
    git \
    openssh && \
    chown node. -R /usr/src/app

# Install Node.js dependencies
COPY --chown=node package.json ./
COPY --chown=node yarn.lock ./

# Run the container under "node" user by default
USER node

# COPY .npmrc ./

RUN echo "//npm.pkg.github.com/:_authToken=$GITHUB_API_TOKEN" > ~/.npmrc

# Copy application files
COPY --chown=node . /usr/src/app

RUN npm install

RUN npm run build

CMD [ "npm", "start" ]
