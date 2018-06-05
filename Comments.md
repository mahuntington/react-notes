# Comments Component Build

This builds off of what was built by the end of [the Webpack Lesson](Webpack.md).

## Lesson Objectives

1. Create Comments component
1. Create CommentsList component
1. Create CommentsForm component
1. Display an array of comments
1. Make form add new comments
1. Create the ability to add new comments to the Comments component
1. Have the Comments form call the Comments component's addComment function

## Create Comments component

Create a directory for components:

```
mkdir js/components
```

Rename `mylib.js` to `comments.jsx` and move it in the `components` dir:

```
mv js/mylib.js js/components/comments.jsx
```

Create the Comments class in `js/components/comments.jsx`:

```javascript
import React from 'react';

class Comments extends React.Component {
    render(){
        return <h1>Comments Component</h1>
    }
}

export default Comments;
```

Import the Comments component into `js/index.js`:

```javascript
import ReactDOM from 'react-dom';
import React from 'react';
import Comments from './components/comments.jsx';

ReactDOM.render(
    <Comments></Comments>,
    document.querySelector('main')
);
```

## Create CommentsList component

Create a separate file for the comments list:

```
touch js/components/commentslist.jsx
```

In `js/components/commentslist.jsx` create a basic component:

```javascript
import React from 'react';

class CommentsList extends React.Component {
    render(){
        return <ul>
            <li>comments list</li>
        </ul>
    }
}

export default CommentsList;
```

Import CommentsList into `js/components/comments.jsx`:

```javascript
import React from 'react';
import CommentsList from './commentslist.jsx'

class Comments extends React.Component {
    render(){
        return <section>
            <CommentsList></CommentsList>
        </section>
    }
}

export default Comments;
```

## Create CommentsForm component

Create `js/components/commentsform.jsx`:

```
touch js/components/commentsform.jsx
```

Write a basic component in `js/components/commentsform.jsx`:

```javascript
import React from 'react';

class CommentsForm extends React.Component {
    render() {
        return <form>
            <input type="text" placeholder="author"/><br/>
            <textarea placeholder="comment"></textarea><br/>
            <input type="submit" value="Post Comment"/>
        </form>
    }
}

export default CommentsForm;
```

Import CommentsForm into `js/components/comments.jsx`:

```javascript
import React from 'react';
import CommentsList from './commentslist.jsx'
import CommentsForm from './commentsform.jsx'

class Comments extends React.Component {
    render(){
        return <section>
            <CommentsList></CommentsList>
            <CommentsForm></CommentsForm>
        </section>
    }
}

export default Comments;
```

## Display an array of comments

In `js/components/comments.jsx`, create a constructor in the Comments class that initializes an array of comments:

```javascript
constructor(props){
    super(props);
    this.state = {
        comments: [
            {
                body:'this rox',
                author:'bob'
            },
            {
                body:'no, you rox',
                author:'sally'
            },
            {
                body:'we all rox',
                author:'zagthor'
            }
        ]
    }
}
```

Now pass it off to the CommentsList component:

```javascript
<CommentsList comments={this.state.comments}/>
```

In `js/components/commentslist.jsx` loop through the `comments` prop and display the comments:

```javascript
import React from 'react';

class CommentsList extends React.Component {
    render(){
        return <ul>
            {this.props.comments.map((comment, index) =>
                <li key={index}>
                    {comment.author} says: "{comment.body}"
                </li>
            )}
        </ul>

    }
}

export default CommentsList;
```

## Create the ability to add new comments to the Comments component

In `js/components/comments.jsx` set the comments state property to an empty array:

```javascript
constructor(props){
    super(props);
    this.state = {
        comments: []
    }
}
```

Add the ability to add a new comment in `js/components/comments.jsx`

- you have to use `this.setState` or react won't know the state has changed and won't refresh the DOM

```javascript
addComment(comment){
    this.state.comments.push(comment); //this alone won't notify React to update the DOM
    this.setState({
        comments: this.state.comments
    });
}
```

Now bind the `addComment` function in the constructor for `js/components/comments.jsx`:

```javascript
constructor(props){
    super(props);
    this.state = {
        comments: []
    }
    this.addComment = this.addComment.bind(this);        
}
```

## Have the CommentsForm call the Comments component's addComment function

In `js/components/comments.jsx` create a property on the CommentsForm element called `handleSubmit` and pass it `this.addComment`:

```javascript
render(){
    return <section>
        <CommentsList comments={this.state.comments}></CommentsList>
        <CommentsForm createComment={this.addComment}></CommentsForm>
    </section>
}
```

In `js/components/commentsform.jsx`, create a handleSubmit function in the `CommentsForm` class definition:

```javascript
handleSubmit(event){
    event.preventDefault();
    console.log('posting comment');
}
```

Don't forget to create a constructor that binds handleSubmit in `js/components/commentsform.jsx`:

```javascript
constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
}
```

Now call it on form submit in `js/components/commentsform.jsx`:

```javascript
return <form onSubmit={this.handleSubmit}>
    <input type="text" placeholder="author"/><br/>
    <textarea placeholder="comment"></textarea><br/>
    <input type="submit" value="Post Comment"/>
</form>
```

Create references to the comment textarea and author input element in `js/components/commentsform.jsx`:

```html
<input ref="author" type="text" placeholder="author"/><br/>
<textarea ref="body" placeholder="comment"></textarea><br/>
```

In the `handleSubmit` function of `js/components/commentsform.jsx`, log this element's value:

```javascript
handleSubmit(event){
    event.preventDefault();
    console.log(this.refs.author.value);
    console.log(this.refs.body.value);
}
```

Now call the `handleSubmit` function that was passed into the CommentsForm component by the Comments component:

```javascript
handleSubmit(event){
    event.preventDefault();
    this.props.createComment({
        body: this.refs.body.value,
        author: this.refs.author.value            
    });
}
```
