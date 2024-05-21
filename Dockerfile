FROM node:lts-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn install

RUN yarn build

ENV NODE_ENV=production
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000

ENTRYPOINT [ "node", ".output/server/index.mjs" ]