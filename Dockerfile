#Create our image from Node alpine
FROM node:alpine

LABEL application="wire-frontend"

RUN yarn global add serve

COPY artifacts /application

WORKDIR /application

EXPOSE 8080

CMD serve -s
