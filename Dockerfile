FROM node:lts-alpine as builder

WORKDIR /usr/src/app

COPY . .

RUN yarn install

RUN yarn build

FROM gcr.io/distroless/nodejs:20

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/.output /usr/src/app/.output

ENV NODE_ENV=production
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000

CMD [".output/server/index.mjs"]