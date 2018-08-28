# Webpack

- Webpack assembles your code and uses plug-ins to add additional features
- The only thing it does by itself is deal with ES2015 import/export statements

## Lesson Objectives

1. Install/Run Webpack
1. Create default export
1. Create a named export
1. Import only certain exports of file
1. Run webpack with NPM
1. Run webpack with Babel
1. Run webpack with JSX
1. Run webpack dev server

## Install/Run Webpack

```
npm init
npm install webpack --save-dev
```

Create a test file:

```
mkdir js
touch js/index.js
```

Add basic log to `index.js`:

```javascript
console.log('hi');
```

Create a `dist` folder:

```
mkdir dist
```

We can now run:

```
./node_modules/.bin/webpack js/index.js -o dist/bundle.js
```

Create a basic HTML file (`index.html`):

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title></title>
        <script src="dist/bundle.js" charset="utf-8"></script>
    </head>
    <body>

    </body>
</html>
```

Run it in the browser:

```
open index.html
```

## Create default export

Create a fake library (`js/mylib.js`)

```javascript
const myFunc = function(){
    console.log('included!');
}

export default myFunc;
```

include it in `js/index.js`

```javascript
import defaultImport from './mylib.js';
defaultImport();
```

## Create a named export

Create the export in `js/mylib.js`:

```javascript
export const myFunc2 = function(){
    console.log('also included');
}
```

**NOTE** The export can be defined when the export is created.  This can happen for default and named exports

Import the function in `js/index.js`:

```javascript
import defaultImport, {myFunc2 as renamedExport} from './mylib.js';
defaultImport();
renamedExport();
```

If you don't want to rename the import in `js/index.js`:

```javascript
import defaultImport, {myFunc2} from './mylib.js';
defaultImport();
myFunc2();
```

We can of course set exports to variables in `js/mylib.js`:

```javascript
const savedFunc = function(){
    console.log('also included');
}

export {savedFunc as myFunc2}
```

If the variable name is the same as the export name:

```javascript
const myFunc2 = function(){
    console.log('also included');
}

export {myFunc2}
```

## Import only certain exports of file

You can have multiple named exports in `js/mylib.js`:

```javascript
const unnecessary = function(){
    console.log('unnecessary');
}

export {
    myFunc2,
    unnecessary as omitme
}
```

If you don't import them in `js/index.js`, they won't work:

```javascript
import defaultImport, {myFunc2} from './mylib.js';
defaultImport();
myFunc2();
omitme();
```

## Run webpack with NPM

Create `webpack.config.js` to simplify the terminal command

```javascript
module.exports = {
    entry: './js/index.js',
    output: {
        filename: 'bundle.js'
    }
};
```

Now we can run:

```
./node_modules/.bin/webpack
```

We can put this command in our `package.json` file:

```javascript
"scripts": {
  "build": "webpack"
},
```

and run

```
npm run build
```

## Run webpack with Babel

First install the core transpiler, the loader which loads babel-plugins, and the es2015 plugin for babel:

```
npm install babel-core babel-loader babel-preset-es2015 --save-dev
```

Modify the webpack config to use these:

```javascript
module.exports = {
    entry: './js/index.js',
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, //for all files that end with js/jsx
                use: {
                    loader: 'babel-loader', //use the babel loader to load:
                    options: {
                        presets: ["es2015"] //the es2015 compiler
                    }
                }
            }
        ]
    }
};
```

Now use some ES2015 syntax in `js/index.js`:

```javascript
class Foo {
    bar(){
        console.log('classes!');
    }
}
```

The result in `dist/build.js` is the ES5 version (may be minified):

```javascript
var Foo = function () {
    function Foo() {
        _classCallCheck(this, Foo);
    }

    _createClass(Foo, [{
        key: 'bar',
        value: function bar() {
            console.log('classes!');
        }
    }]);

    return Foo;
}();
```

## Run webpack with JSX

Install react core, the dom manipulator, and the babel transpiler plugin:

```
npm install react react-dom babel-preset-react --save-dev
```

In `webpack.config.js` use the `babel-loader` to load the `react` plugin:

```javascript
use: {
    loader: 'babel-loader',
    options: {
        presets: ["es2015", "react"]
    }
}
```

Add a `main` tag and move our `script` tag to the bottom of `index.html`

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
    <body>
        <main></main>
        <script src="dist/bundle.js" charset="utf-8"></script>
    </body>
</html>
```

Write some react in `js/index.js`:

```javascript
import ReactDOM from 'react-dom'; //import react-dom from npm install dir
import React from 'react'; //import react from npm install dir

ReactDOM.render(
    <h1 className="foo">Hello, world!</h1>,
    document.querySelector('main')
);
```

## Run webpack dev server

Webpack dev server is an "all-in-one" package that

- provides a basic static file server that serves your front-end static html/css/js files
- watches your files and runs webpack when any of them change
- reloads your browser whenever webpack is run

Install it:

```
npm install webpack-dev-server --save-dev
```

Alter `package.json` to use webpack-dev-server instead of webpack

```javascript
"scripts": {
    "build": "webpack-dev-server --open"
},
```

Now you can run

```
npm run build
```

and it will open up your browser automatically.  Change a file, and see it reload.

**NOTE** Webpack doesn't actually write the transpiled files to disk.  Instead it serves them from memory.  You can delete the `dist` directory

```
rm -r dist
```

Change your script tag to be

```html
<script src="main.js" charset="utf-8"></script>
```

And take out the `output` property in webpack.config.js

```javascript
module.exports = {
    entry: './js/index.js',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, //for all files that end with js/jsx
                use: {
                    loader: 'babel-loader', //use the babel loader to load:
                    options: {
                        presets: ["es2015", "react"] //the es2015 compiler
                    }
                }
            }
        ]
    }
};
```
