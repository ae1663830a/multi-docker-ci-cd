FROM node:alpine

WORKDIR /opt/worker

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "run", "start"]
