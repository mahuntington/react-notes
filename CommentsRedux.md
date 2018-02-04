# Integrate Comments Component With Redux

## Lesson Objectives

1. Install Redux
1. Create the Store
1. Make CommentsList Subscribe to the Store
1. Make CommentsForm Dispatch Actions
1. When an Action Occurs, make CommentsList Update State
1. Remove Unnecessary Code

## Install Redux

```
npm install redux --save-dev
```

## Create the Store

Create `js/store.js`:

```
touch js/store.js
```

Write a basic store that handles an `ADD` action and a `default`:

```javascript
import { createStore } from 'redux'

let comments = function(state = [], action){
    switch(action.type){
        case 'ADD':
            return [...state, action.comment];
        default:
            return state
    }
}

let store = createStore(comments);

export default store;
```

## Make CommentsList Subscribe to the Store

In `js/components/commentslist.jsx`, import the store:

```javascript
import store from '../store.js';
```

Once the component mounts, subscribe to the store:

```javascript
componentDidMount(){
    store.subscribe(function(){
        console.log(store.getState())
    });
}
```

## Make CommentsForm Dispatch Actions

In `js/components/commentsform.jsx`, import the store:

```javascript
import store from '../store.js';
```

In the handleSubmit function, dispatch an `ADD` action:

```javascript
handleSubmit(event){
    event.preventDefault();
    this.props.handleSubmit({
        body: this.refs.body.value,
        author: this.refs.author.value
    });
    store.dispatch({
        type:'ADD',
        comment: {
            body: this.refs.body.value,
            author: this.refs.author.value
        }
    });
}
```

## When an Action Occurs, make CommentsList Update State

Set up a state property in `js/components/commentslist.jsx` for comments:

```javascript
constructor(props){
    super(props)
    this.state = {
        comments: []
    }
}
```

when an action occurs, set the state property (we'll need to use an arrow function for proper bind of `this`):

```javascript
componentDidMount(){
    store.subscribe(() => {
        this.setState({
            comments: store.getState()
        });
    });
}
```

Now use that state variable instead of the `comments` prop:

```javascript
render(){
    return <ul>
        {this.state.comments.map((comment, index) =>
            <li key={index}>
                {comment.author} says: "{comment.body}"
            </li>
        )}
    </ul>
}
```

## Remove Unnecessary Code

- We no long need to store anything in `js/components/comments.jsx`
- We also don't need to pass anything to child components:

```javascript
class Comments extends React.Component {
    render(){
        return <section>
            <CommentsList></CommentsList>
            <CommentsForm></CommentsForm>
        </section>
    }
}
```

`js/components/commentsform.jsx` no long needs to call `this.props.handleSubmit`:

```javascript
handleSubmit(event){
    event.preventDefault();
    store.dispatch({
        type:'ADD',
        comment: {
            body: this.refs.body.value,
            author: this.refs.author.value
        }
    });
}
```
