FROM node:16
WORKDIR /usr/src/app
RUN apt-get update \
    && apt-get install -y build-essential libcairo2-dev libgif-dev libglew-dev libglu1-mesa-dev libjpeg-dev libpango1.0-dev librsvg2-dev libxi-dev pkg-config xvfb \
    && rm -rf /var/lib/apt/lists/*

COPY ./package*.json ./
RUN npm ci

COPY . .