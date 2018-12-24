FROM node:alpine

WORKDIR /opt/complex-app

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]
EXPOSE 3000/tcp