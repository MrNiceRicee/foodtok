FROM node:18 as build

RUN curl -sf https://gobinaries.com/tj/node-prune | sh

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN yarn install
RUN yarn build

RUN npm prune --production
RUN node-prune

FROM node:18-alpine

WORKDIR /src/app

COPY --from=build /src/app/dist ./dist
COPY --from=build /src/app/node_modules ./node_modules

CMD ["npm", "start"]

