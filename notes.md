# npm init
npm init

answer questions

answer basic questions
main: app.js

npm install express

check package.json dependencies

create a main file e.g. app.js

var express = require('express');
^ linter will pick this out

instantiate express app

var app = express();

constants

var port = 3000;

add a route

app.get('/', (res,req => {
    res.send('Welcome to my api');
}))

listen on a port

app.listen(port, () => {
    console.log('listening on port ' + port);
});

npm install eslint
    look in node_modules
    package-lock
    look in dependencies
    doesn't need --save
    delete from package.json and
        run npm prune
    or
        npm uninstall eslint
    npm i eslint -D
    dev dependencies are only needed during development and don't get deployed with our code

    gets faster after installation because of local file cacheing

running commands
    local versus global - prefer local installation

    shortcuts are kept in:
    node_modules/.bin

    e.g.
    node_modules/.bin/eslint

npx eslint

or scripts

npm run lint

where we enter into scripts of package.json

searches the paths
node_modules/.bin

"lint": "eslint ."

fix up errors to do with var and formatting spaces etc

add a new route

app.get('/x', (res,req => {
    res.send('This is route x');
}))

Won't recognise route until the server is restarted

Ctrl-C
node app.js

Install nodemon as a dependency

nodemon watches files and runs commands on changes

"start": "nodemon app.js"

add configuation

  "nodemonConfig": {
    "restartable": "rs",
    "ignore": "node_modules/**/node_modules",
    "delay": 2500,
    "env": {
      "NODE_ENV": "development",
      "PORT": 4000,
    }
  }

note the environment vars we are passing in

to use this script we could

npm run start

but start and test are special and we can just call them without run eg.

npm start

now when we make changes it will restart the server automatically

change a route and add a new route

app.get('/x', (req, res) => {
  res.send('this is route X');
});

app.get('/y', (req, res) => {
  res.send('this is route Y');
});

adding routes

move  example routes toa  file called routes
explain module exports

