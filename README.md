# Node JS Workshop
September 16, 2019

---
# Workshop Agenda
| Morning                 | Afternoon
| ----------------------- |-------------
| Modern JavaScript       |Serving HTTP
| Node Architecture       |Express
| NPM                     |Middleware
| Dev dependencies        |Logging
| Global & module vars    |Routes
| Imports rel & abs paths |Brief intro to Mongo
| Exports                 |Examples
| Debugging               |Templates & Authentication
| Asynchronous operations |Using view templates
| Built-in fs module      |Express PUG middleware
| Built-in path module    |Authentication
| “Callback Hell”         |Login view
| Promises                |Member view
| Promise error handling  |Summary
| Async/await             |Recommended study
| Examples                |

---
# Modern JavaScript
The JavaScript language is nearly 25 years old however since 2016 the language has been significantly upgraded with new features. This enhanced version of the language is referred to variously as ECMAScript 2016, 2017, 2018, 2019 or ES6, ES7, ES8, ES9, ES10 and ESNext.

Rather than dwell too much on version numbers just be aware than most Node development takes place using modern Javascript features. Meanwhile front-end code which needs compatibility with Internet Explorer 11 deploys code which is called ES5. Modern browsers such as Chrome, Firefox, Safari,Opera and Edge can use modern JavaScript. These browsers, which upgrade themselves regularly are known as "evergreen" browsers.

---
## Features of Modern JavaScript

This is not an exhaustive list of the new features of JavaScript but includes most of the important ones.

| Features
|----
| let & const
| arrow functions
| spreading
| destructuring
| default arguments
| template strings
| classes
| import & export
| dynamic imports
| iterators & for..of
| generators
| promises
| async/await
| Maps & Sets
| proxies

---
## let & const
These new keywords allow decalring variables that are scoped to a block of code instead of a function. Declarations are usually declared as `const` but when a name need to be reused you can declare them as `let`.

```
const x = 1;
x = 2; // error
```
```
let x = 1;
x = 2; // OK
```

NOTE: just because a variable has been declared as `const` this only refers to the name binding, it doesn't prevent a variable from being mutated.

---
## Enhanced object literals
### Object key expressions
```
const x = 'aaa';

const obj = {
  [x]: 123
}

// { aaa: 123 }
```
### Method fuction shorthand
Old way
```
{
  sayHello: function() {
    console.log('hello!');
  }
}
```
New way
```
{
  sayHello() {
    console.log('hello!');
  }
}

```

---
## Arrow functions
JavaScript now has a more convenient syntax for declaring anonymous lambda functions. Unlike the traditional `function` syntax, arrow functions have no implied variables called `this` or `arguments`.

```
// traditional function
function add(a, b) {
  return a + b;
}
```
```
const fun = (a, b) => a + b;
```
If the function body can be expressed as a single expression then there is no need for a return statement.

If several lines of code are needed to express the body of the function then braces are used to indicate a code block and a return statement is required;
```
const fun = (a, b) => {
  const result = a + b;
  return result;
};
```
If an arrow function needs to return an object then it needs to be wrapped in parentheses so it won't be mistake for a code block;
```
const fun = () => ({a: 1});
```
If an arrow function only has one argument then you can drop the parentheses from the argument declaration.
```
const fun = (a) => a + 1;
```
```
const fun = a => a + 1;
```
## Spreading
It is now much easier to copy and compose arrays and objects
```
const a = [1,2,3];

const b = [...a, 4]; // [1,2,3,4]

const c = [...a, 4, ...a]; // [1,2,3,4,1,2,3]
```
```
const x = {a: 1, b: 2};

const y1 = {...x, c: 3}; // {a: 1, b: 2, c: 3}

const y2 = {...x, a: 4}; // {a: 4, b: 2}

const y3 = {...x, ...{a: 4, c: 3}}; // {a: 4, b: 2, c: 3}
```
When used in this way, ... is referred to as the "spread" operator.

---
## Destructuring
Many of the operations that you can do on the right-hand side of the `=` you can also do on the left-hand side.

```
const x = 1;

const x = [1,2,3];

const [x, y, ...z] =
[1,2,3,4]; // x = 1, y = 2, z = [3,4]

const [x] = [1,2,3,4]; // x = 1

const [,,x] = [1,2,3,4]; // x = 3
```
```
const x = 1;
const y = 1;
[y, x] = [x, y]; //swap x with y
```
```
const fun = (a, ...b) => {
  // do something
}

fun(1,2,3,4); // arg a = 1, arg b = [2,3,4]
```
```

const {a} = {a: 1}; // a = 1

const {a: b} = {a: 1}; // b = 2 🤯

const {a, ...b} = {a: 1, b: 2, c: 3}; // a = 1, b = {b: 2, c:3}
```
The last example is a good way to exclude a key from an object.
On the left hand side and for function arguments, ... is referred to as the "rest" operator. It can only be used in the last position.
```
const [x, y, ...z] = [1,2,3,4]; //this works

const [...x, y, z] = [1,2,3,4]; //this doesn't
```
---
## Default arguments

Function arguments can now be optional and can take a default value. If you don't pass an argument, or you pass `undefined` as an argument, it will use the default value.
```
const f = (a=2, b=3) => a + b

f(1); // 4

f(undefined, 10); // 12
```
---
## Template strings
JavaScript now offers multi-line strings which merge values from the scope without needing concatnation operations.

Old style
```
const name = 'John';
const x = 'Hello,\n' + name + '.\n G'day!';
```
New style
```
const name = 'John';
const x = `Hello,
${name}.
G'day!`;
```
Both output
```
Hello,
John.
G'day!
```
---
## Classes
Old style
```
const NewClass = function (x) {
  this.x = x;
}

NewClass.prototype = Object.create(
  OldClass.prototype
);

NewClass.prototype.getX = function() {
  return this.x;
}
```
New style
```
class NewClass extends OldClass {

  constructor(x) {
    super();
    this.x = x;
  }

  getX() {
    return this.x;
  }
}
```
Usage:
```
const obj = new NewClass(100);

console.log(obj.getX());
```
---
## Import and export
Modern JavScript has modules and the ability to import and export from these modules.
```
// filename: md.js
export const x = 123
```
```
import {x} from 'md.js'
```
NOTE: Node has its own way of handling modules (know as the CommonJS format) and has not fully integrated the modern JavaScript way. As we will see Node uses a different syntax for importing and exporting values.

Soon Node will fully support modern JavScript modules by right now that functionality is hidden behind a feature switch.

---
## Dynamic imports

Modern JavaScript can dynamically import values at runtime. This enables lazy-loading modules as needed. When you load a module, JavaScript handles this with a "promise". More about this shortly.
```
import('module.js').then(mod => {
  console.log(`this is the value of x: ${mod.x});
})

```
As mentioned above, Node handles modules differently and we will use the Node way of loading and importing modules in this workshop.

---
## Iterators & for ... of
Modern JavaScript defines the concept of an Iterable which is an functional interface supported by many JavScript types.

Examples of Iterables are Arrays and Strings but you can create your own as well. Objects which are Iterable mean that they can be interated over. It means that you can use the spread and rest operator ... on them and you can also use the `for..of` contruct for looping.

For example, the traditional way to loop over an array
```
  const array = [1,2,3,4,5];

  for (let i = 0; i < array.length; i++) {
    console.log(array[i]);
  }
```
Here is the modern way to loop over an array. This works because arrays implement the Iterable interface.
```
  const array = [1,2,3,4,5];

  for (let item of array) {
    console.log(array[i]);
  }
```
`for..of` loops are good for preventing common "off-by-one" bugs.

---
## Promises

Promises are a way for dealing with asynchonicity in JavaScript in a single-threaded environment. This is a complex subject and one we will discuss in detail a bit later because it is very important in Node.
```
readFilePromise('file.txt')
.catch(err => console.log(`an error occured ${err}`))
.then(content => console.log(`Content: ${content}`));
```
---
## Generators

Generators are a powerful mechanism for simplifying the process of writing iterators and making objects Iterable. We won't be covering this topic in any detail during this workshop but be aware that many useful things can be written using generators. Also it's worth mentioning that a very popular mechanism called async/await in JavaScript is implmented under the hood with generators.

---
## Async/await
Async/await is an advanced feature for writing asynchronous code which is implemented using promises and generators. We will be discussing async/await in much more detail because this is also important in Node.
```
async function f() {
  try {
    const content = readFilePromise('file.txt');
    console.log(`Content: ${content}`)
  catch (err) {
    console.log(`an error occured ${err}`);
  }
}

f();
```

---
## Maps & Sets
Modern JavaScript has more efficient data structures for common algorithms. Whereas as normal JavaScript objects are often used as dictionary types for quick look up, this is not as efficient as using a Map or a Set for the same task. Better still, while JavaScript objects can only have strings as keys, Maps can use any object as a key.
```
// Map
const m = new Map();
m.set("hello", 42);
m.set(s, 34);
m.get(s) == 34;

// Set
const s = new Set();
s.add("hello").add("goodbye").add("hello");
s.size === 2;
s.has("hello") === true;

```

### WeakMaps & WeakSets
WeakMaps and WeakSets provide memory leak-free versions of Map and Set. The problem of holdinga  reference to an object in Map is that it won't get freed and cleaned up by the garbage collector. WeakMaps and WeakSets are a better choice for long living data-structures.

---
## Proxies

Proxies are a powerful way to intercept and augment the behaviour of objects.

Intercepting a get on a object
```
const target = {};

const p = new Proxy(target, {
  get(receiver, name) {
    return `Hello, ${name}!`;
  }
});

p.world;  // 'Hello, world!';

```
Intercepting a function call

```
const target = () => 'I am the target';

const p = new Proxy(target, handler = {
  apply(receiver, ...args) {
    return 'I am the proxy';
  }
});

p();   // 'I am the proxy';

```
---
# NPM
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
* if filepath is a directory AND it has a package.json then it will load the file "main" entry (if present).
# Modules
Node files are referred to as modules.
## CommonJS
Node has been around now for over a decade and uses the CommonJS module format. This is an older module format which predates the module format standardised in JavaScript in 2016.

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
```js
const app = require('./app');
```
#### Absolute
```js
const lodash = require('lodash');
```
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
## dev dependencies
You can install tools to facilitate development but don't need to be deployed with your completed code as "dev dependency".

Just like normal dependencies you install them with npm but you at the `-D` command line switch.
```
npm install eslint -D
```
This updates the `devDependencies` section in your `package.json`. eg.
```
"devDependencies": {
  "eslint": "^5.16.0",
}
```
## running

Unless you add something to your path, tools that have been installed in your node_modules are a little inconvenient to run.

For example to run eslint on the files in the root directory of your project you might type
```
./node_modules/.bin/eslint .
```
You will usually find a shortcut to your tool in the `.bin` directory but this is still too wordy for most uses.

## npx

Far better than typing the path to the `.bin` directory is to run them with npx.
```
npx eslint .
```

## scripts
Another way is to add a script entry to your `package.json` to make it available from npm. Any entry you place in the `scripts` section of `package.json` can be executed by npm run. For example if we add an entry called `lint`
```
"scripts": {
  "lint": "eslint ."
}
```
we could run it as:
```
npm run lint
```
npm is able to find eslint by searching `node_modules` and you can save some typing.

Each entry in `package.json` is a command in the shell of the operating system you are running on. This can lead to some platform incompatibilities particularly for Windows users. It is recommended that Windows users install some kind of Linux or Unix based shell to make this a little easier.

You can pass additional arguments to an npm script by using the -- arg.

## eslint
So let's now set up our linting script so that we can start using it in development. First we need to initialise `eslint`. To do that we need to pass the --init arg.
```
npm run lint -- --init
```
Answer the questions to set up your configuration. Here are some typical responses.
```
? How would you like to use ESLint?
    To check syntax, find problems, and enforce code style

? What type of modules does your project use?
    JavaScript modules (import/export)

? Which framework does your project use?
    None of these

? Where does your code run?
    Node

? How would you like to define a style for your project?
    Use a popular style guide

? Which style guide do you want to follow?
    Airbnb (https://github.com/airbnb/javascript)

? What format do you want your config file to be in?
    JavaScript

Checking peerDependencies of eslint-config-airbnb-base@latest
The config that you've selected requires the following dependencies:

eslint-config-airbnb-base@latest eslint@^4.19.1 || ^5.3.0
eslint-plugin-import@^2.14.0

? Would you like to install them now with npm?
    Yes
```
This process will install additional dev dependencies in `package.json`
```
  "devDependencies": {
    "eslint": "^5.16.0",
    "eslint-config-airbnb-base": "^13.1.0",
    "eslint-plugin-import": "^2.17.3",
  }
```
and create an `.eslint.js` file
```
module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
  },
};
```
by specifying a preference for using an industry style guide  you get various linting rules for free. Over time you may choose to add new ones or turn some of them off. That's what the `rules` entry in `.eslint.js` is for. For example:
```
rules: {
  "no-confusing-arrow": 0,
  "implicit-arrow-linebreak": 0,
  "no-shadow": 0,
  "consistent-return": 0,
  "comma-dangle": 0,
  "padded-blocks": 0,
  "object-curly-newline": 0,
  "no-param-reassign": 0,
  "no-return-assign": 0,
}
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

***** give examples using fs

readFileSync
readFile
writeFileSync
writeFile

***** timers
setTimeout
setImmediate
nextTick

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
***** give examples of promises


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

## http

`http` is another module that is built into Node. It provides everything needed to set up an http server. Except in very simple cases however most developers prefer to use a framework to build web servers on node. The most popular of these in called Express which we will come to shortly.

For now let's just look at setting up a very simple web server using `http`.
```js
const http = require('http');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

  const { url, method } = req;

  if (method === 'POST' && url === '/users') {

    res.writeHead(200, { 'Content-Type': 'text/json' });
    res.write(`
      {
        "users": [1,2,3]
      }
    `);
    res.end();

  } else {

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`
      <form method='POST' action='/users'>
        Hello World!
        <p><button>OK</button></p>
      </form>
    `);
    res.end();

  }
});

server.listen(port, () =>
  console.log(`Listening on port ${port}`));
```
We can start this server by
```
node examples/http
```
By setting the PORT variable in the environment, this server can be started on another port. This is an operating system specific thing but in a bash shell you can set environment variables on the command line eg.
```js
PORT=2233 node examples/http
```
## Express
While simple the `http` module lacks an easy way to configure routes and other features so you are on your own. Express is a more powerful  framework.

Here is a basic Express server.
```js
const express = require('express');

const port = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
  res.send(`
    Hello World!
  `);
});

app.server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
```
Which we can start with
```
node examples/express/index-1.js
```
or by specifying the PORT in the environment
```
PORT=2233 node examples/express/index.js
```
## nodemon
Because are often modifying server code we need to restart the server frequently. We can do this more coveniently by using the `nodemon` utility.

`nodemon` watches all the files in your node project and restarts the server each time.

You can install `nodemon` as a dev dependency.
```
npm i nodemon -D
```
and run it either from as a script in `package.json`
```
  "scripts": {
    "start": "PORT=2233 nodemon examples/express/index.js"
  }
```
or by using `npx`
```
PORT=2233 npx nodemon examples/express/index.js
```
### nodemon configuration
`nodemon` has many options on its command line. It's usually more convenient to set up a configuration section for `nodemon` in your `package.json`
```
"nodemonConfig": {
  "ignore": "node_modules/**/node_modules",
  "delay": 2500,
  "env": {
    "NODE_ENV": "development",
    "PORT": 4000,
    "DEBUG": "app,app*"
  }
}
```
# Express middleware

Getting back to Express, a lot of functionality can be added to the server through so-called "middlware".

A middleware is simply a function with the signature
```js
(req, res, next) => {
  //do something
  next();
}
```
Most middlewares append or modify the `req` or `res` objects. The last thing a middleware must do is call the `next()` function to pass execution on. If this is forgotten, the server will just hang.

To use a middleware, the usual thing is to call the `use()` method on the server.


# debug
# logging
# env DEBUG
# routes


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

# Todo

- npm registry
- npm RC
- Publish npm packages
