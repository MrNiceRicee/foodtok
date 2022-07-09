FROM node:18-slim as build

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN yarn install --silent
RUN yarn build

# FROM node:18

# WORKDIR /src/app

# COPY --from=build /src/app/package.json .
# COPY --from=build /src/app/dist ./dist

# RUN yarn install --silent --production=true


CMD ["npm", "start"]

