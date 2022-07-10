FROM node:18 as build

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN yarn install
RUN yarn build

# FROM node:18-alpine

# WORKDIR /src/app

# COPY --from=build /src/app/package.json .
# COPY --from=build /src/app/dist ./dist


# RUN npm install --production


CMD ["npm", "start"]

