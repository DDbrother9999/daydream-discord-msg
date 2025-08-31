FROM node:20-slim

LABEL authors="ddbrother"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "index.js"]
