# Using AJAX With Redux

Let's integrate a web API into our [last build](CommentsRedux2.md)

## Lesson Objectives

1. Make an AJAX GET Request Using Fetch
1. Make an AJAX POST Request Using Fetch
1. Create a SET Reducer for the Store
1. Dispatch a SET action appropriately
1. Dispatch a ADD action appropriately

## Make an AJAX GET Request Using Fetch

In `js/index.js` make a test GET request:

```javascript
fetch('https://stupidcomments.herokuapp.com/comments').then(function(response){
    response.json().then(function(data){
        console.log(data);
    });
});
```

## Make an AJAX POST Request Using Fetch

In `js/index.js` make a test POST request:

```javascript
fetch(
    'https://stupidcomments.herokuapp.com/comments',
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ body:'again from react' })
    }
).then(function(response){
    response.json().then(function(data){
        console.log(data);
    });
});
```

**NOTE** When you're finished with this code, comment it out, so you don't keep creating new comments

## Create a SET Reducer for the Store

Our plan is the make a GET request to our API and then set the store to the response's values.

Create a SET Reducer in `js/store.js`:

```javascript
let comments = function(state = [], action){
    switch(action.type){
        case 'ADD':
            return [...state, action.comment];
        case 'SET':
            return action.comments
        default:
            return state
    }
}
```

## Dispatch a SET action appropriately

Once our `js/components/commentslist.jsx` component mounts, make the approriate AJAX request and dispatch a SET action.

```javascript
componentDidMount(){
    fetch('https://stupidcomments.herokuapp.com/comments').then(function(response){
        response.json().then(function(data){
            console.log(data);
        });
    });
}
```

Now dispatch a `SET` action:

```javascript
componentDidMount(){
    fetch('https://stupidcomments.herokuapp.com/comments').then(function(response){
        response.json().then(function(data){
            store.dispatch({type:'SET', comments:data});
        });
    });
}
```

## Dispatch a ADD action appropriately

In `js/components/commentsform.jsx` alter the `handleSubmit` property to make an AJAX POST request:

```javascript
const mapDispatchToProps = function(dispatch){
    return {
        handleSubmit: function(comment){
            fetch(
                'https://stupidcomments.herokuapp.com/comments',
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(comment)
                }
            ).then(function(response){
                response.json().then(function(data){
                    console.log(data);
                });
            });
        }
    }
}
```

We can see that `data` has a `body` property that we want to use in our dispatch in `js/components/commentsform.jsx`:

```javascript
response.json().then(function(data){
    dispatch({type:'ADD', comment: data });
});
```
