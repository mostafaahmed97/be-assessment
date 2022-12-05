FROM node:alpine

EXPOSE 3000
WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build
CMD npm run start
