#Create our image from Node alpine
FROM node:alpine

LABEL app="wire-frontend"
LABEL AUTHOR="Victoria Aoka <victoria.aoka@andela.com>"

RUN yarn global add serve

COPY dist /app

WORKDIR /app
