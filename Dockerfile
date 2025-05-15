FROM node:20
WORKDIR /app

COPY package*.json ./
RUN npm install
EXPOSE 1992
COPY . .
CMD ["npm", "start"]