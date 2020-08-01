# Node Server

A Simple server made using NodeJS, MongoDB

## Prerequisites

Please make sure you have NodeJs, MongoDB, Docker & Docker Compose (if needed) installed on your system

## Installation

Install the dependencies and devDependencies.

```SH
$ cd node-server
change working directory
$ npm install
install node modules
```

## Run

```SH
$ npm start
start server
```

## Run with Docker

```SH
$ sudo docker build -t node-server .
create build
$ sudo docker-compose up
run docker
```

## ngrok

In order to test webhook on local server we need ngrok. ngrok is a convenient tool for exposing local servers to publicly accessible URLS, supporting both HTTP and HTTPS. You need to make your own account on [ngrok](https://ngrok.com/). You can find help [here](https://dashboard.ngrok.com/get-started) for creating your account and installing on your system.

In order to start ngrok on your system, you need to run this command

```TEXT
./ngrok http 1414
```

You can check the incoming request on your server at 4040 port

```TEXT
http://localhost:4040/
```

## Directory Structure

```JS
node-server
│
└───.vscode
│
└───build
│
└───node_modules
│
└───public
|      |
│      └───docs
│
└───src
|    |
|    └───controllers
|    |     authentication-controller.js
|    |     course-controller.js
|    |     file-upload-controller
|    └───docs
|    |     └───shell-scripts
|    |            certificates.sh
|    │
|    └───helpers
|    │     constants.js
|    │     directory.js
|    │     error-handler.js
|    │     functions.js
|    │     messages.js
|    │     middlewares.js
|    │     response-handler.js
|    │     responses.js
|    │     role-authorization.js
|    │     routes.js
|    │
|    └───middlewares
|    |     authentication-middleware.js
|    │
|    └───models
|    |     course-model.js
|    |     user-model.js
|    │
|    └───routes
|    |     authentication-routes.js
|    |     course-routes.js
|    |     file-upload-routes.js
|    │     index.js
|    │
|    └───routes-middlewares
|    |     course-route-middleware.js
|    │
|    └───shared
|    |     |
|    │     └───passport
|    │           local-strategy.js
|    │         env.js
|    │         error.js
|    │         mongodb.js
|    │         multer.js
|    │         redis.js
|    │         sendgrid.js
|    │         winston.js
|    |
|    |
|    └───validation
|           authentication-validation.js
|           course-validation.js
|
|        server.js
|
└───temp
|
└───views
|     page-not-found.jade
│
└───validation
│
└───winston-logs
│   └───error-logs
│   └───http-logs
│   └───info-logs
│
│  .babelrc
│  .env
│  .eslintignore
│  .eslintrc.json
│  .gitignore
│  docker-compose.yml
│  DockerFile
|  index.js
│  package.json
|  package-lock.json
│  readme.md
│  webpack.config.babel.js
```
