FROM node:18-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

RUN mkdir -p /home/node/app/budget

WORKDIR /home/node/app

COPY ["package*.json", "pnpm-lock.yaml",  "./"]

RUN npm config set strict-ssl false

RUN npm install --location=global pnpm

RUN pnpm install

COPY --chown=node:node . .

RUN pnpm run build

RUN pnpm prune --prod

ENV NODE_ENV=production

CMD [ "node", "dist/main.js" ]