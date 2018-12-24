# First part building static files
FROM node:alpine as builder

WORKDIR /opt/frontend

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

# Second part copy necessary files to nginx server and run it
FROM nginx
# Configuration file
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
# Static files from react project
COPY --from=builder /opt/frontend/build /usr/share/nginx/html
EXPOSE 3000