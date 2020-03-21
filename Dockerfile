FROM ubuntu:19.10

RUN apt-get update

RUN apt-get -y install curl gnupg

RUN curl -sL https://deb.nodesource.com/setup_12.x  | bash -

RUN apt-get -y install nodejs

WORKDIR /app

COPY . .

RUN npm install

RUN npm install serve

RUN npm run build

EXPOSE 3000

CMD ./node_modules/serve/bin/serve.js -s build -l 3000