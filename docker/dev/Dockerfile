#Create our image from Node alpine
FROM node:alpine

LABEL maintainer "Vicky<victoria.aoka@andela.com>"

LABEL application="wiref"

#Create a new directory to run our app.
ADD . /app

#Set the new directory as our working directory
WORKDIR /app

#install node packages to node_modules
RUN yarn install

RUN yarn build

#Our app runs on port 8080. Expose it!
EXPOSE 8080

