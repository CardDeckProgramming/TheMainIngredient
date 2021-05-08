FROM node:slim
WORKDIR /opt/
COPY ./backend/package*.json ./
RUN npm install
COPY ./backend/build/ ./
EXPOSE 3000
CMD [ "node", "server.js" ]

