---
title: "Just clone it!"
date: 2019-04-28 11:37:00
categories: web
---
### 1. Set Up
#### 1.0 Setting up the Project
- Make github repository(Add readme.md / .gitignore got Node)
- Clone it!
- Installing yarn

Ref: <https://itsfoss.com/install-yarn-ubuntu/>

```
sudo apt install curl

curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -

sudo sh -c 'echo "deb https://dl.yarnpkg.com/debian/ stable main" >> /etc/apt/sources.list.d/yarn.list'

sudo apt update
sudo apt install yarn

yarn --version
```
- Initialization __yarn__
```
# yarn init
```
- Set up project name, version, description etc.
- Add __graphql-yoga__
```
# yarn add graphql-yoga
```
- Start __vscode__
```
# code .
```
- Add __nodemon__
```
# yarn add nodemon -D
```
- Make a folder and file (src/server.js)
- Modify package.json
```json
"scripts": {
    "dev": "nodemon --exec babel-node src/server.js"
  }

```
- Make a json file (nodemon.json)
```json
{
    "ext": "js graphql"
}
```
- Test yarn dev 
```
# yarn dev
```

***

#### 1.1 Creating GraphQL Server

- Add dotenv
```
# yarn add dotenv
```
- Create .env file
- Modify src/server.js
```javascript
require("dotenv").config()
import { GraphQLServer } from "graphql-yoga";

const PORT = process.env.PORT || 4000;

const typeDefs = `
    type Query{
        hello: String!
    }
`;

const resolvers = {
    Query:{
        hello: ()=> "Hi"
    }
}

const server = new GraphQLServer({typeDefs, resolvers});

server.start({port:PORT}, () => 
    console.log(`Server running on http://localhost:${PORT}`) 
);
```
- Create New file (.babelrc)
```json
{
    "presets": ["@babel/preset-env"]
}
```

#### 1.2 Setting up the server like the Pros

- Add a middleware "morgan" (for logging) / server.js

```javascript 


import logger from "morgan";

```
- Express in Graphql
- Modify src/server.js
```javascript
server.express.use(logger("dev"));
```
- Create folders src/api
- Add graphql-tools and merge-graphql-schemas
```
# yarn add graphql-tools merge-graphql-schemas
```
- Create schema.js and Code
```javascript
import path from "path";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";


const allTypes = fileLoader(path.join(__dirname, "/api/**/*.graphql"))
const allResolvers = fileLoader(path.join(__dirname, "/api/**/*.js"))

const schema = makeExecutableSchema({
    typeDefs: mergeTypes(allTypes),
    resolvers: mergeResolvers(allResolvers)
});

export default schema;
```

- Create folders src/api/Greetings/sayHello
- Create files sayHello.graphql, sayHello.js and Code it

- Modify src/server.js
```javascript
require("dotenv").config()
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema });

server.express.use(logger("dev"));

server.start({port:PORT}, () => 
    console.log(`Server running on http://localhost:${PORT}`) 
);
```

- Create folder src/api/Greetings/sayGoodbye
- Create files sayGoodbye.graphql, sayGoodbye.js and Code it!
- Test localhost:4000

### 2. Setting up prisma
