# npm
Npm is the node package manager which connects your app to
the Npm registry, the world's largest registry by far.
## npm init
To initialise a new project, create an empty directory and run
```
npm init
```
This will prompt you to answer a few questions

```
package name    unique name for your package
version         defaults to 1.0.0
description     a description of your package
entry point     the main file to load from your package
test command    the command for testing your package
git repository  optional git repository
keywords        optional key words
author          author's name
license         licence, MIT, ISC, GPL tec
```
which will generate a package.json file like this:
```
{
  "name": "demo-package",
  "version": "1.0.0",
  "description": "A demo package",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Steve Smith",
  "license": "GPL"
}
```
## package.json
```
name              package name
version           semantic version 0.0.0
description       description
main              entry filename "app.js",
scripts           object containing named commands
author            author's name
license           licence, MIT, ISC, GPL tec
dependencies      app dependencies
devDependencies   tool dependencies
```
After initialising the project we can start adding dependencies.

`dependencies` refer to modules that you need to import into your
application while `devDependencies` refers to modules that are used
by your development tools.

To install a module into your app type
```
npm install <packname-name>
```
or
```
npm i <packname-name>
```
this will download the package and store it in your application's
`node_modules` directory and automatically add it to the
`dependencies` section of your `package.json` file.

You shou now find a node_modules directory, an updated `package.json`
file and a `package-lock.json` which contains the versions of
all of the installed packages.

## Installing dependencies
For example when installing the utility package known as `chalk`,
type
```
npm i chalk
```
This command installs the dependency in `node_modules` and adds
an entry to the `dependencies` section in `package.json`
```
"dependencies":
  "chalk": "^2.4.2"
}
```
dependencies are in the semantic version format
```
"<package-name>": "<semantic-version>",
```
where the three digits represent
```
0.0.0
^ ^ ^
| | |
| | +-- PATCH version when you make backwards-compatible bug fixes.
| +---- MINOR version when you add backwards-compatible functionality.
+------ MAJOR version when you make breaking API changes.
```
The `^` in the version `^2.4.2` represents the range of versions we
will accept. `^2.4.2` means we will accept any version equal to or
greater than version 2. If we want more precision and predictablilty
we can remove the `^` so we only accept that exact version.
```
"dependencies":
  "chalk": "2.4.2"
}
```
## Git version control
By this stage you should already be thinking about version control.

Note that:
* You SHOULD commit `package.json` and `package-lock.json`
to your repo

* You SHOULD NOT commit node_modules.

Instead, add `node_modules` to `.gitignore`  so it's not
commited to your repo. Every deployment should retrieve
its own dependencies.

When you clone a project's repository, you can restore its
`node_modules` directory by simply running `npm install`
or `npm i`

# The node command
To execute a file containing JavaScript we simply type:
```
node <filepath>
```
Note:
* the .js extension is optional
* if filepath is a directory then it will load index.js (if present).
* if filepath is a directory AND it has a package.json then it will
load the file "main" entry (if present).
# Modules
Node files are referred to as modules.
## CommonJS
Node has been around now for over a decade and uses the CommonJS
module format. This is an older module format which predates
the module format standardised in JavaScript in 2016.

CommonJS does not use the import and export keywords but
take a slightly different approach to importing and exporting
dependencies.

The node ecosystem is still adjusting
to the newer ES2016 module format but in
the meantime, we recommend continuing to work with
the CommonJS format for node projects.

## Module variables
Script files in node are encapsulated as CommonJS
modules. This means that variables that are declared
in a file are scoped to that file and won't leak into the
global scope.

For the code in one file to be able to read a value from
another file they must explicitly import a value that has been
explicitly exported the other file.

The way scope is contained is that the content of a node
file is automatically wrapped inside a function
of the form:
```js
function (exports, require, module, __filename, __dirname) {
  // ...your code here
}
```
This means you have a scope (which in addition to the
global scope object) has five values injected which are related
to the current file and are not part of the global scope.
```
exports       shortcut to the `exports` property of the module object
require       a function for importing from other modules
module        the module object
__filename    a full path to the file
__dirname     a full path to the file's parent directory
```
The `module` object has a number of useful properties in
addition to the `exports` property. Here are the main ones.
```
id            an id for module, typically a full path to the file
exports       an object to be exported by module
filename      a full path to the file
paths         an array of paths to search when importing a module
```
### Imports
Files have scopes which are isolated from one other. Apart from attaching variables to the global scope (not recommended) the way to import values into a file is with the CommonJS `require()` function. This function is injected as an argument by the function wrapper mentioned earlier.

`require()` takes a file path which is either relative or absolute.

#### Relative
const app = require('./app');

#### Absolute
const lodash = require('lodash');

Note that the extension is not needed. Relative paths are relative to the current file which absolute paths search for
a module by name in `node_modules` directory if present and searches each parent directory if it has a `node_modules` directory until it reaches the user's home directory.

You can see the paths it searches by looking at the `module.paths` object. Here is a example on my Macbook.
```
'/Users/jhardy/projects/node/restful/node_modules',
'/Users/jhardy/projects/node/node_modules',
'/Users/jhardy/projects/node_modules',
'/Users/jhardy/node_modules',
'/Users/node_modules',
'/node_modules',
'/Users/jhardy/.node_modules',
'/Users/jhardy/.node_libraries',
'/usr/local/lib/node'
```
An import can be anything exported from another file. It could be a value such as a number, string, array or a function. Quite often though it is an object that contains a collection of values.
### Exports
Just as imports use an injected function `require()`, exporting is done with the injected `module.exports` and `exports` objects. The `exports` object is really just a shortcut ot alias to `module.exports` so either can be used.

`exports` is good for exporting individual values. eg.
```js
exports.x = 1;
exports.y = 2;
exports.z = 3;
```
while `module.exports` enables you to replace the entire exports object. While it's a little bit wordier, I find `module.exports` to be more flexible in most cases.
```js
module.exports = {
  x: 1,
  y: 2,
  z: 3,
};
```
### Destructuring imports
We can importing the previous example as a single object and then use the properties on the object. eg.
```js
const object = require('./module');
console.log(object.x + object.y);
```
but it's usually better to destructure the parts of the object that we are interested in
```js
const { x, y } = require('./module');
console.log(x + y);
```
This leads to cleaner code.
### Import Cache
When you `require()` a module for the first time the top level code in that file runs once and assignment are made to the `module.exports` object which is passed back. This result is cached by the system so that when `require()` is called again on the same module it will return the cached version.

These cached objects are mutable so use with care. It is possible to modify the imported objects and this can affect later uses of the cached import.

Consider this example where a file `module.js` contains:
```js
module.exports = {
  x: 123,
};
```
We can import the exported object, assign it to a variable and modify it. Then when we import it again we get the modified version.

This is a way to comunicate state between modules but as with global state, this is not recommended.
```js
const value1 = require('./module');

value1.y = 456;

const value2 = require('./module');

console.log({ value2 });
```
## Global Scope
Global scope is available everywhere in your programs through a single varibale called `global`.

You can see `global` by
```
console.log(global);
```
But you can also start the node command-line REPL
and press `TAB` twice.

Global variables can also be accessed directly without using
`global`. For example the system process object can be accessed
as either `global.process` or more simply as just `process`.

The `global` prefix is implied.

Useful global variables include the entirety of JavaScript
as well as
```
console
process
os
Buffer
```
The console object
```js
console.log()
console.info()
console.warn()
console.error()
console.assert(cond, msg)
```
The process object
```js
process.env
process.argv
process.exit()
process.nextTick(cb)
```
The os object
```js
os.tmpdir()
os.endianness()
os.hostname()
os.type()
os.platform()
os.arch()
os.release()
os.uptime()
os.loadavg()
os.totalmem()
os.freemem()
os.cpus()
os.networkInterfaces()
```
## running JavaScript from the command line
node can parse and run JavaScript code directly from the command line with
```
node -p "console.log(1 + 2)"
```
# tools
## eslint
## debugging with vscode
vscode debugger `launch.json`

An array of debugging configurations.
```
type       "node"
request    "launch" | "attach"
name       title of config
program:   location of file to run
env:       object with vars to add to debug environment
```
# async operations
Asynchronous operations are actions that happen at some time in the future. Because node is a single-threaded architecture in which everything that happens on the main thread is synchrononous, node must relinquish control of the main thread regularly in order for asynchronous operations to get a chance of happening.

Relinquishing control means letting code finish and complete tasks but being "called-back" by the system when the asynchronous results of some earlier operation have a result.

The most common patterns for asynchronous operations in JavaScript are
* callbacks
* promises
* async/await
A callback is a common pattern for event-driven software in the browser such as event listeners.

Node uses the same event-driven architecture on the server to handle asynchronous operations such as file, network, database access so it's worth getting to know this pattern well.
## callback
A node callback is a function with the signature
```
function (err, result) {

}
```
In node there is a convention where the first argument of the callback function is ALWAYS the error condition which is either null or an Error object.
The second argument is the result of the asynchronous operation.

## fs
readFileSync
readFile
writeFileSync
writeFile

# buffers
# streams

### Callback hell
Callbacks are straightforward when asynchronous operations are isolated but can grow complicated when they needed to be chained in a sequence.

```js
const createUser = function(username, password, picture, callback) {
   dataBase.createUser(username, password, (error, userID) => {
       if (error) {
           callback(error)
       } else {
           cloudinary.uploadPicture(picture, (error, path) => {
               if (error) {
                   callback(error)
               } else {
                   dataBase.updatePicture(userID, path, (error) => {
                       if (error) {
                           callback(error);
                       } else {
                           callback(null);
                       }
                   })
               }
           })
       }
   })
};

createUser('John Hardy','xyz123','avatar.jpg', (err) => {
    if (err) {
      console.log(err);
    }
    console.log('User created');
  }
);
```
## promises
A promise is an object that contains a value, either now
or sometime in the future. Asynchronous operations take place in
function with two args which are also functions `resolve()` and `reject()`.
```js
new Promise((resolve, reject) => {
  // do something

  //if success
  resolve(result)));

  //if failure
  reject(err);
});
```
## promisify
`promisify` is a utility function that comes standard with node. It is a `high order function`
```
A High Order Function is a function which accepts a function as
its input and returns a function as its result.
```
`promisify` accepts a node function which has a callback as its last parameter and returns function which returns a promise instead
of the callback.

For example:
```js
readFile('file.txt', (err, value) => {
  if (err) {
    return console.log(err);
  }
  console.log(value);
})
```
can be converted to a promise based function
```js
const { promisify } = require('util');
const readFilePromise = promisify(readFile);
readFilePromise('file.txt')
  .catch(err => console.log(err))
  .then(value => console.log(value))
```
## How promisify works
the way `util.promisify` is implemented can be seen here:
```js
const promisify = (func) =>
  (...args) =>
    new Promise((resolve, reject) =>
      func(...args, (err, result) =>
        (err ? reject(err) : resolve(result))
      )
    );
```
This syntax is called an `auto-curried` function which you can see from the multiple uses of the `=>` operator. You pass the node function that has the callback in its final argument e.g. `readFile` to `promisify` and it
* returns another function which when called returns a new `Promise` object.
* The `Promise` object kicks off its own function which calls the original node function
with args and passes its own callback function.
* When that function completes, the promise is either resolved or rejected based on the result of the callback.

The following example shows how to `promisify` the
functions used in the earlier example.
```js
const { promisify } = require('util');

const dbCreateUser = promisify(database.createUser);
const cloudUploadPicture = promisify(cloudinary.uploadPicture);
const dbUpdatePicture = promisify(dataBase.updatePicture);
```
## Using promises
Once "promisified" these functions can be used with code that expects promises.
```js
const createUser = (username, password, picture) =>
  dbCreateUser(username, password)
  .then(userID => [userID, cloudUploadPicture(picture)]
  .then(([userID, path]) => dbUpdatePicture(userID, path);

createUser('John Hardy','xyz123','avatar.jpg')
  .catch(err => console.log(err);
  .then(() => console.log('User created'));
```
Which is a lot shorter and simpler.

Except for one thing...

This example shows one of the downsides to promise syntax:
it's complex to pass around intermediate results such as `userID`. Can you understand what's going on here?

In those cases it may still be simpler to nest one `then()` handler inside another `then()` handler.
```js
const createUser = (username, password, picture) =>
  dbCreateUser(username, password)
  .then(userID =>
    cloudUploadPicture(picture)
    .then(path => dbUpdatePicture(userID, path)
  );
```
## async/await
This scope access issue is less of a problem with async/await syntax which we'll touch on briefly here. Async/await gives you the ability to do all of this asynchronous work in the same level of scope. Superficially it even looks like old-style imperative programming but despite this there are some gotchas with async/await and it's still necessary to understand promises in order to use it properly.
```js
const createUser = async (username, password, picture) => {
  const userID = await dbCreateUser(username, password);
  const path = await cloudUploadPicture(picture);
  await dbUpdatePicture(userID, path);
}
```
## Promise API
```js
Promise.resolve(value)   returns a promise that resolves to value
Promise.reject(err)      returns a promise that rejects with err
Promise.all([p1,p1...])  returns when EVERY promise resolves
Promise.race([p1,p1...]) returns when ANY promise resolves
```
## Promise error handling
A key advantage of promise syntax is in error handling. Errors simply fall through and can be optionally caught by the receiver of the promise.

Chains of promises allow error conditions to be caught and even resumed. For example
```js
Promise.resolve('Hello')
  .then((value) => {
    console.log(value);
    throw ('Hello error');
  })
  .catch(() => Promise.resolve('Hello recovery!'))
  .then(value => console.log(value));
```
## Promise API
```js
const getRandomNumber = () => new Promise((resolve) => {
  setTimeout(
    () => resolve(Math.random() * 10),
    1000
  );
});

const coinToss = new Promise((resolve, reject) =>
  getRandomNumber()
    .then(value => value < 0.5)
    .then(isHeads => isHeads ? resolve() : reject());
);
```

# ----

## express

## nodemon
### configuration
### environment
# debug
# logging
# env DEBUG


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

