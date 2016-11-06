FROM node:6

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json webpack.config.js /usr/src/app/
COPY src webpack.config.js /usr/src/app/src/
COPY config /usr/src/app/config/
RUN npm install

EXPOSE 8080
CMD [ "npm", "start" ]
