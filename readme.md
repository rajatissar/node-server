# Node Server

A Simple server made using NodeJS, MongoDB

## Prerequisites

* Node 10 or higher
* npm 6.11 or higher
* Ensure that MongoDB is installed on your system. (Start Mongo Service by using `sudo service mongod start`)
* Docker & Docker Compose (if needed)
* If you want to update default environment variables then create .env file in root directory and update env variables accordingly as per below format:-

    ```TEXT
    ENV=development
    NODE_ENV=development
    SERVER_PORT=1415
    DB_HOST=localhost
    DB_PORT=27017
    DB_NAME=ppl
    REDIS_HOST=localhost
    REDIS_PORT=6379
    REDIS_TTL=20
    REDIS_LOG_ERRORS=true
    EXPRESS_SESSION_NAME=XXXX
    EXPRESS_SESSION_SECRET_KEY=XXXX
    EXPRESS_SESSION_COOKIE_SECURE=true
    EXPRESS_SESSION_COOKIE_MAX_AGE=2592000000
    JWT_SECRET_KEY=XXXX
    JWT_EXPIRES_IN=24h
    SENDGRID_API_KEY=XXXX
    ```

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
