### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:10-alpine as builder

COPY package.json package-lock.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /ng-app && mv ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

## Build the angular app in production mode and store the artifacts in dist folder
RUN $(npm bin)/ng build --prod --output-path=dist


### STAGE 2: Setup ###

FROM nginx:1.14.1-alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

# Create image based on the official Node 10 image from dockerhub
# FROM node:10

# # Create a directory where our app will be placed
# RUN mkdir -p /app

# # Change directory so that our commands run inside this new directory
# WORKDIR /app

# # Copy dependency definitions
# COPY package*.json /app/

# # Install dependecies
# RUN npm install

# # Get all the code needed to run the app
# COPY . /app/

# # Expose the port the app runs in
# EXPOSE 4200

# # Serve the app
# CMD ["npm", "start"]