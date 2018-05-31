# Integrate Redux Into Comments Part 2

The last section works, but there are some optimizations we can make

## Lesson Objectives

1. Install `react-redux`
1. Map Redux State To The CommentsList Component
1. Map a Dispatch ADD Action to a CommentsForm Component property

## Set Up

1. Copy the [comments_build_example](comments_build_example) directory from this repo.  It's what we built [here](Comments.md)
1. Copy the `store.js` file we created for [this build](Redux.md) into the `js/` dir of the `comments_build_example` dir you just created in the previous step
1. Install redux with `npm install redux --save-dev`
1. Run `npm run build`

## Install `react-redux`

```
npm install react-redux --save-dev
```

Import `react-redux`'s `Provider` module in `js/index.js`:

```javascript
import { Provider } from 'react-redux';
```

In `js/index.js` wrap `<Comments></Comments>` in a `<Provider></Provider>` component to make redux available to the `Comments` component.  Also set the `store` property to the `store` we import from `./store.js`:

```javascript
import store from './store.js';

ReactDOM.render(
    <Provider store={store}>
        <Comments></Comments>
    </Provider>,
    document.querySelector('main')
);
```

## Map Redux State To The CommentsList Component

In `js/components/commentslist.jsx`, import `connect` from `react-redux`:

```javascript
import { connect } from 'react-redux';
```

In `js/components/commentslist.jsx` create a function that will map redux `state` to component properties:

```javascript
const mapStateToProps = function(state){
    return {
        comments: state
    }
}
```

In `js/components/commentslist.jsx` connect the mapper with the component:

```javascript
const VisibleCommentsList = connect(
    mapStateToProps
)(CommentsList);
```

In `js/components/commentslist.jsx`, export `VisibleCommentsList`:

```javascript
export default VisibleCommentsList;
```

You can now remove the `constructor`/`componentDidMount` functions and change `this.state.comments.map` to `this.props.comments.map` show we back to using props instead of component state:

## Map a Dispatch ADD Action to a CommentsForm Component property

Import `connect` component from `react-redux` into `js/components/commentsForm.jsx`:

```javascript
import { connect } from 'react-redux';
```

Now create a function that will map a dispatch to a property in `js/components/commentsForm.jsx`:

```javascript
const mapDispatchToProps = function(dispatch){
    return {
        handleSubmit: function(comment){
            dispatch({type:'ADD', comment: comment });
        }
    }
}
```

Connect the mapper to the `CommentsForm` component in `js/components/commentsForm.jsx`:

```javascript
const VisibleCommentsForm = connect(
    null, //normally the mapStateToProps function
    mapDispatchToProps
)(CommentsForm)
```

Export the `VisibleCommentsForm` component:

```javascript
export default VisibleCommentsForm;
```

Refactor `handleSubmit` to this the `handleSubmit` component prop:

```javascript
handleSubmit(event){
    event.preventDefault();
    this.props.handleSubmit({
        body: this.refs.body.value,
        author: this.refs.author.value
    });
}
```
