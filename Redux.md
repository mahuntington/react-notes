# Intro to Redux

## Lesson Objectives

1. Describe Redux
1. Install Redux
1. Create a reducer
1. Create a subscriber
1. Dispatch some actions
1. Move the store to a separate file

## Describe Redux

- Redux acts as a third party that just deals with data so that the "state" of a model (e.g. a list of comments) doesn't have to be constantly passed around between react components
- Redux works on the publisher/subscriber model
    - a subscriber subscribes to Redux
    - any subscribers to Redux receive notification when Redux's data changes
    - the subscribers can then do what they want with the new "state" of Redux

## Install Redux

Initialize the directory:

```
npm init
```

Create a main JS file:

```
touch index.js
```

Install Webpack:

```
npm install webpack --save-dev
```

Install Redux:

```
npm install redux --save-dev
```

Create a config for Webpack:

```
touch webpack.config.js
```

Add appropriate config code:

```javascript
module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js'
    }
};
```

Set up NPM to run Webpack:

```javascript
"scripts": {
  "build": "webpack"
},
```

Have `index.js` import `createStore` from `redux`

```javascript
import { createStore } from 'redux';

console.log(createStore);
```

Test that import works:

```
npm run build
```

## Create a reducer

A reducer will take an action and tell Redux how to alter its state.  For now, write one in `index.js`

```javascript
import { createStore } from 'redux';

const comments = function(state = [], action){ //this function must take these params
    switch(action.type){ //action must be an object that has a "type" property
        case 'ADD': //if the type of action is "ADD"
            return [...state, action.comment]; //return a copy of Redux's current state with the added comment
        default: //always have a default that returns the current state
            return state
    }
}

//now create a data store based on the custom reducer
const store = createStore(comments);
```

## Create a subscriber

- Now let's create a subscriber in `index.js` that will be notified when our data store changes
- In the real world version of this example, this would probably be an HTML list that would update each time a new comment is made

```javascript
//subscriber (e.g. an HTML list)
store.subscribe(function(){
    console.log(store.getState()); //for now just log what's in the store
});
```

## Dispatch some actions

- In `index.js`, let's dispatch some actions, telling Redux how to change state:
- In the real world version of this example, this would probably be a user filling out an HTML form and submitting it

```javascript
//publisher (e.g. an HTML form)
store.dispatch({
    type:'ADD',
    comment: {
        body:'this rox',
        author:'bob'
    }
});
store.dispatch({
    type:'ADD',
    comment: {
        body:'no, you rox',
        author:'sally'
    }
});
store.dispatch({
    type:'ADD',
    comment: {
        body:'we all rox',
        author:'zagthor'
    }
});
```

Run the code:

```
node dist/bundle.js
```

## Move the store to a separate file

We want our data store in a separate file from our view logic

```
touch store.js
```

In `store.js`:

```javascript
import { createStore } from 'redux':

const comments = function(state = [], action){
    switch(action.type){
        case 'ADD':
            return [...state, action.comment];
        default:
            return state
    }
}
export default createStore(comments);
```

Import the store in `index.js`:

```javascript
import store from './store.js';

//subscriber (e.g. an HTML list)
store.subscribe(function(){
    console.log(store.getState())
});

//publisher (e.g. an HTML form)
store.dispatch({
    type:'ADD',
    comment: {
        body:'this rox',
        author:'bob'
    }
});
store.dispatch({
    type:'ADD',
    comment: {
        body:'no, you rox',
        author:'sally'
    }
});
store.dispatch({
    type:'ADD',
    comment: {
        body:'we all rox',
        author:'zagthor'
    }
});
```
