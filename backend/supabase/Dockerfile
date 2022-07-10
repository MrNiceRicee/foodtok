FROM node:18 as build

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

ARG DB_USER
ARG DB_PASS
ARG DB_DATABASE
ARG DB_PORT
ARG DB_HOST
ARG SUPABASE_KEY
ARG SUPABASE_URL

RUN cd foodtok \
  touch .env \
  echo VITE_DB_USER=${DB_USER} >> .env \
  echo VITE_DB_PASSWORD=${DB_PASS} >> .env \
  echo VITE_DB_DATABASE=${DB_DATABASE} >> .env \
  echo VITE_DB_PORT=${DB_PORT} >> .env \
  echo VITE_DB_HOST=${DB_HOST} >> .env \
  echo VITE_SUPABASE_KEY=${SUPABASE_KEY} >> .env \
  echo VITE_SUPABASE_URL=${SUPABASE_URL} >> .env \
  cat .env

RUN yarn install
RUN yarn build

# FROM node:18-alpine

# WORKDIR /src/app

# COPY --from=build /src/app/package.json .
# COPY --from=build /src/app/dist ./dist


# RUN npm install --production


CMD ["npm", "start"]

