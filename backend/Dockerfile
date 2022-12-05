FROM node:alpine

EXPOSE 3000
WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx tsc

CMD node dist/src/index.js
