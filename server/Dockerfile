FROM node:alpine

WORKDIR /opt/server-app

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "run", "start"]
