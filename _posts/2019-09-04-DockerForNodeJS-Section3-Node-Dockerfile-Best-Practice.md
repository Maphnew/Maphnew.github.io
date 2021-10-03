# Section3: Node Dockerfile Best Practice

## Dockerfile Best Practice Basics

COPY, not ADD

npm/yarn install during build

RUN npm install && npm cache clean —force : image is small as possible

CMD node, not npm

WORKDIR not RUN mkdir unless you need chown

## FROM Base Image Guidelines

Stick to even numbered major releases

Don't use :latest tag

Start with Debian if migrating

Move to Alpine later

Don't use :slim

Don't use :onbuild

## When to use Alpine, Debian, or CentOS Images

Alpine is "small" and "sec focused"

But Debian/Ubuntu(85MB) are smaller now too

~100MB space savings isn't significant

Alpine has its own issues

Alpine CVE scanning fails

Enterprises may require CentOS or Ubuntu/Debian

## Assignment Making a CentOS Node Image

## Running Non-root Container Users

    FROM node:10-slim
    
    EXPOSE 3000
    
    WORKDIR /node
    
    COPY package*.json ./
    
    # here
    RUN mkdir app && chown -R node:node .
    
    USER node
    
    RUN npm install && npm cache clean --force
    
    WORKDIR /node/app
    
    # here
    COPY --chown node:node . .
    
    CMD ["node", "app.js"]

docker-compose exec -u root

## Making Images Efficiently

Pick proper FROM

Line order matters

COPY twice : package.json* then . .

1. copy only the package and lock files
2. run npm install
3. copy everything else

apt-get update thing → top
