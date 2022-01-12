FROM node:17-alpine3.14

WORKDIR /app

COPY package*.json tsconfig.json .

RUN npm install -g

CMD [ "npm", "start" ]