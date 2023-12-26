FROM node:14-alpine
WORKDIR /app/server
COPY package.json .
RUN npm install nodemon -g
RUN npm install
COPY . .