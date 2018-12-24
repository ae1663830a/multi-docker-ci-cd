FROM node:alpine

WORKDIR /opt/worker-app

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
