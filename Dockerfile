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

# Stage 1
FROM node:12 as react-build
WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build

# Stage 2 - the production environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]