FROM node:20-alpine3.18

RUN apk update
RUN apk upgrade
RUN apk add --no-cache tzdata

RUN yarn global add @nestjs/cli

WORKDIR /app
COPY ./app .

COPY ./scripts/init.sh /scripts/init.sh

WORKDIR /scripts
CMD [ "sh", "./init.sh" ]