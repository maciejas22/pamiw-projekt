FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run prisma:generate

CMD npm run prisma:migrate:deploy && npm run prisma:seed && npm run start