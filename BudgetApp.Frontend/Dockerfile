#Build
FROM node:16-alpine3.14 as buildApp
WORKDIR /app/
COPY package.json ./
COPY package-lock.json ./
COPY angular.json ./
COPY tsconfig.json ./
COPY tsconfig.app.json ./
RUN npm i --legacy-peer-deps
RUN mkdir -p ./src
COPY src ./src
RUN npm run build-prod

#NGINX
FROM nginx:1.19-alpine
RUN apk update && apk upgrade && apk add bash && apk add --update nodejs npm
RUN mkdir -p /app
WORKDIR /app
COPY default.conf /etc/nginx/conf.d
COPY ["set-process-env.js", "src/environments/environment.base.ts", "./"]
COPY --from=buildApp /app/dist/fuse . 
ENV base_url=http://localhost:3000/api
CMD node set-process-env.js ; nginx -g "daemon off;"
EXPOSE 443
EXPOSE 80