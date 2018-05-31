# React router

## Lesson Objectives

1. Basic Install
1. Get React Working
1. Install React Router
1. Create a Link To a Route
1. Create a Router Handler
1. Create a Parameterized Router Handler

## Basic Install

```
npm init
touch .gitignore
```

In `.gitignore` add

```
node_modules
```

Install basic packages:

```
npm install babel-core babel-loader babel-preset-es2015 babel-preset-react react react-dom webpack webpack-cli webpack-dev-server --save-dev
```

Create `webpack.config.js`

```
touch webpack.config.js
```

And set up a standard config:

```javascript
module.exports = {
    entry: './js/index.js',
    output: {
        filename: 'dist/bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["es2015", "react"]
                    }
                }
            }
        ]
    }
};
```

In `package.json`, tell it to use webpack as a build command:

```javascript
"scripts": {
    "build": "webpack-dev-server --open"
},
```

## Get React Working

Create index.html:

```
touch index.html
```

Write basic HTML setup code:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
    <body>
        <h1>Stuff</h1>
    </body>
</html>
```

Create a `js` dir and a `js/index.js` file

```
mkdir js
touch js/index.js
```

In `js/index.js` write some basic react code:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <h2>Matt is amazing</h2>,
    document.querySelector('main')
);
```

In `index.html` include the soon-to-be compiled js and a `<main></main>` tag for React:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
    <body>
        <h1>Stuff</h1>
        <main></main>
        <script src="/dist/bundle.js" charset="utf-8"></script>
    </body>
</html>
```

Build and run:

```
npm run build
```

## Install React Router

Install the `react-router-dom` package

```
npm install react-router-dom --save-dev
```

Import various components in `js/index.js`:

```javascript
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
```

In `js/index.js`, wrap your base tag in a `<Router></Router>` component:

```javascript
ReactDOM.render(
    <Router>
        <h2>Matt is amazing</h2>
    </Router>,
    document.querySelector('main')
);
```

## Create a Link To a Route

In `js/index.js` create `<Link></Link>` components:

```javascript
ReactDOM.render(
    <Router>
        <ul>
            <li>
                <Link to="/about">About</Link>
            </li>
        </ul>
    </Router>,
    document.querySelector('main')
);
```

## Create a Router Handler

In `js/index.js` create a component to show for the `/about` route:

```javascript
class About extends React.Component{
    render(){
        return <h1>About</h1>
    }
}
```

In `js/index.js` create a handler that will place that component when the url is correct:

```javascript
ReactDOM.render(
    <Router>
        <div>
            <ul>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
            <Route path="/about" component={About}/>
        </div>
    </Router>,
    document.querySelector('main')
);
```

## Create a Parameterized Router Handler

In `js/index.js`, create `Link` to `/topics/news`:

```html
<ul>
    <li>
        <Link to="/about">About</Link>
    </li>
    <li>
        <Link to="/topics/news">Topics</Link>
    </li>
</ul>
```

In `js/index.js`, create a route handler that handles `/topics/:topicname`, where `:topicname` is url param that can be anything:

```html
<div>
    <ul>
        <li>
            <Link to="/about">About</Link>
        </li>
        <li>
            <Link to="/topics/news">Topics</Link>
        </li>
    </ul>
    <Route path="/about" component={About}/>
    <Route path="/topics/:topicname" component={Topics}/>
</div>
```

In `js/index.js`, create the `Topics` component that will be placed when the url is appropriate:

```javascript
class Topics extends React.Component{
    render(){
        return <h1>Topics: {this.props.match.params.topicname}</h1>
    }
}
```
