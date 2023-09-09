FROM node:16.14-alpine

WORKDIR /app/frontend

COPY package* ./

RUN npm install

COPY . ./

EXPOSE 5173

ENTRYPOINT ["npm", "run"]
CMD ["dev"]
