# base image
#FROM node:12.2.0-alpine

# set working directory
#WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
#ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
#COPY package.json /app/package.json
#RUN npm config set unsafe-perm true
#RUN npm install --silent
#RUN npm install react-scripts@3.0.1 -g --silent

# start app
#CMD ["npm", "start"]

FROM mhart/alpine-node:12 AS builder
WORKDIR /app
COPY . .
RUN npm install react-scripts -g --silent
RUN yarn install
RUN yarn run build

FROM mhart/alpine-node
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/build .
CMD ["serve", "-p", "4000", "-s", "."]doc