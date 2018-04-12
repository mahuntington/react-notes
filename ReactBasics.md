# Intro to React

# Lesson Objectives

1. Define what React Is
1. Describe how react differs from most other front-end frameworks
1. Create a basic component
1. Assign JSX to a variable
1. Embed an expression into JSX
1. Create multi-line JSX variables
1. Create a custom component
1. Customize an instance of a component with properties
1. Handle user events
1. Conditionally render HTML
1. Create multiple elements from an array
1. Pass properties to children
1. Customize a component by using the tag's content
1. Change a component's state through interaction
1. Create references to the tags in a component
1. Update child component properties with state values
1. Call parent component methods
1. Make AJAX requests within React
1. Handle component lifecycle events
1. Style a component

## Define what React Is

React is a front-end framework which is designed to make building a Single Page JavaScript Application easier

## Describe how react differs from most other front-end frameworks

- Most other front-end frameworks attempt to separate data from presentation in some kind of an MVC structure
    - For example
        - One set files for HTML (View)
        - One set of files for your Controllers
        - One set of files for your Models (data)
    - Great for teams where developers specialize on one technology (CSS or JavaScript)
- React puts all the Views, Controllers, and Models for one small section of the application together into one file
    - Great for teams where one developer handles just a small section of the application and that's it

## Create a basic component

- Let's create a component which is just an H1 tag
- We'll insert it into the `main` tag of our html

```JavaScript
ReactDOM.render(
  <h1 className="foo">Hello, world!</h1>,
  document.querySelector('main')
);
```

- This code will find the main tag and render an `h1` tag inside of it
    - **NOTE** we can't set class with the `class` attribute anymore
        - We have to use className so it doesn't get confused
        - All other attributes should work normally
- React mixes HTML with JavaScript (JSX)
    - Notice that the HTML does not have quotes or backticks around it

Let's set up the HTML

```HTML
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title></title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react-dom.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>
        <script type="text/babel" src="js/app.js"></script>
    </head>
    <body>
        <main></main>
    </body>
</html>
```

Let's talk about all those script tags

- react.js
    - The core React functionality
    - React can be used for applications that aren't in the browser
        - so it's separated out from code that deals with the browser
- react-dom.js
    - This allows the core React js to work with the browser's DOM
- browser.min.js (babel-core)
    - Babel is a transpiler that will translate ES6 code to ES5
    - it also handles turning JSX into regular JS

## Assign JSX to a variable

JSX just renders into regular JavaScript, so we can assign it to variable:

```JavaScript
const myJSX = <h1>Hello, World!</h1>

ReactDOM.render(
  myJSX,
  document.querySelector('main')
);
```

## Embed an expression into JSX

We can create variables and insert them into our JSX:

```JavaScript
const user = "Matt";
const myJSX = <h1>Hello, {user}!</h1>

ReactDOM.render(
  myJSX,
  document.querySelector('main')
);
```

We can even execute functions inside the `{}`

```JavaScript
const formatUser = function(user){
    return user + "!!"
}
const user = "Matt";
const myJSX = <h1>Hello, {formatUser(user)}</h1>

ReactDOM.render(
  myJSX,
  document.querySelector('main')
);
```

## Create multi-line JSX variables

JSX can be split onto multiple lines:

```JavaScript
const formatUser = function(user){
    return user + "!!"
}
const user = "Matt";
const myJSX =
    <section>
        <h1>Hello, {formatUser(user)}</h1>
        Welcome to the app
    </section>

ReactDOM.render(
  myJSX,
  document.querySelector('main')
);
```

## Create a custom component

With JSX, we can create our own tags!!

```JavaScript
class Heading extends React.Component {
    render() {
        return <h1>Hello, World!</h1>;
    }
}

ReactDOM.render(
    <Heading></Heading>,
    document.querySelector('main')
);
```

- This mimics what is going on with Web Components
- The idea is that we can write our own custom tags, which are much more semantic, and they will render as regular HTML

Now that our Heading code has been encapsulated as component, it is easy to reuse:

```JavaScript
class Heading extends React.Component {
    render() {
        return <h1>Hello, World!</h1>;
    }
}

ReactDOM.render(
    <section>
        <Heading></Heading>
        <Heading></Heading>
    </section>,
    document.querySelector('main')
);
```

**NOTE: There must be one single top level element for JSX, you can't have two siblings be at the top of that component**

## Customize an instance of a component with properties

We can customize each instance of a component with properties

```JavaScript
class Heading extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}!</h1>;
    }
}

ReactDOM.render(
    <section>
        <Heading name="Matt"></Heading>
        <Heading name="Helen"></Heading>
    </section>,
    document.querySelector('main')
);
```

## Handle user events

We can handle user events (clicks, hover, etc) by defining event handlers and registering them right on the element:

```JavaScript
const sayHello = function() {
    alert("oh hai");
}

class Heading extends React.Component {
    render() {
        return <h1 onClick={sayHello}>Hello, {this.props.name}!</h1>;
    }
}

ReactDOM.render(
    <section>
        <Heading name="Matt"></Heading>
        <Heading name="Helen"></Heading>
    </section>,
    document.querySelector('main')
);
```

It's a little more component-y if we make these functions part of the component, though:

```JavaScript
class Heading extends React.Component {
    sayHello() {
        alert("oh hai");
    }
    render() {
        return <h1 onClick={this.sayHello}>Hello, {this.props.name}!</h1>;
    }
}

ReactDOM.render(
    <section>
        <Heading name="Matt"></Heading>
        <Heading name="Helen"></Heading>
    </section>,
    document.querySelector('main')
);
```

What if we want to get at properties of the component?

```JavaScript
class Heading extends React.Component {
    sayHello() {
        console.log(this); //null?!?
    }
    render() {
        return <h1 onClick={this.sayHello}>Hello, {this.props.name}!</h1>;
    }
}

ReactDOM.render(
    <section>
        <Heading name="Matt"></Heading>
        <Heading name="Helen"></Heading>
    </section>,
    document.querySelector('main')
);
```

Normally, these event handlers don't have `this` bound correctly.  We have to manually do this:

```JavaScript
class Heading extends React.Component {
    constructor(props) {
        super(props);
        this.sayHello = this.sayHello.bind(this);
    }
    sayHello() {
        console.log(this.props);
        alert("My name is " + this.props.name);
    }
    render() {
        return <h1 onClick={this.sayHello}>Hello, {this.props.name}!</h1>;
    }
}

ReactDOM.render(
    <section>
        <Heading name="Matt"></Heading>
        <Heading name="Helen"></Heading>
    </section>,
    document.querySelector('main')
);
```

## Conditionally render HTML

Depending on some condition, you may want to render different HTML:

```JavaScript
class Heading extends React.Component {
    render() {
        if(this.props.userType === 'admin'){
            return <h1>Hello!  You are an admin</h1>;
        } else {
            return <h1>Hello!</h1>;
        }
    }
}

ReactDOM.render(
    <section>
        <Heading userType="admin"></Heading>
        <Heading></Heading>
    </section>,
    document.querySelector('main')
);
```

We've got some redundant code here, though.  We can use an inline ternary operator if we'd like:

```JavaScript
class Heading extends React.Component {
    render() {
        return <h1>
            Hello! {(this.props.userType==='admin')?'You are an admin':''}
        </h1>;
    }
}

ReactDOM.render(
    <section>
        <Heading userType="admin"></Heading>
        <Heading></Heading>
    </section>,
    document.querySelector('main')
);
```

You can also render JSX, conditionally:

```JavaScript
class Heading extends React.Component {
    render() {
        return <div>
            <h1>Hello!</h1>
            {
                (this.props.userType==='admin')?
                (
                    <em>You are an admin</em>
                ):
                null
            }
        </div>;
    }
}

ReactDOM.render(
    <section>
        <Heading userType="admin"></Heading>
        <Heading></Heading>
    </section>,
    document.querySelector('main')
);
```

## Create multiple elements from an array

If we have an array of values, we can generate JSX elements from it:

```JavaScript
const nums = [1,5,8,10];
class List extends React.Component {
    render() {
        return <ul>
            {nums.map((num) => (
                <li>{num}</li>
            ))}
        </ul>;
    }
}

ReactDOM.render(
    <List></List>,
    document.querySelector('main')
);
```

Each element that's being generated, must have a unique key to help React identify which elements have been changed, added, or removed:

```JavaScript
const nums = [1,5,8,10];
class List extends React.Component {
    render() {
        return <ul>
            {nums.map((num, index) => (
                <li key={index}>{num}</li>
            ))}
        </ul>;
    }
}

ReactDOM.render(
    <List></List>,
    document.querySelector('main')
);
```

## Pass properties to children

You can have components within components:

```JavaScript
const nums = [1,5,8,10];

class ListItem extends React.Component {
    render(){
        return <li>This is a list item</li>
    }
}

class List extends React.Component {
    render() {
        return <ul>
            {nums.map((num, index) => (
                <ListItem key={index}></ListItem>
            ))}
        </ul>;
    }
}

ReactDOM.render(
    <List></List>,
    document.querySelector('main')
);
```

To have the number show up, we simply create a property on the ListItem component

```JavaScript
const nums = [1,5,8,10];

class ListItem extends React.Component {
    render(){
        return <li>This is a list item: {this.props.number}</li>
    }
}

class List extends React.Component {
    render() {
        return <ul>
            {nums.map((num, index) => (
                <ListItem number={num} key={index}></ListItem>
            ))}
        </ul>;
    }
}

ReactDOM.render(
    <List></List>,
    document.querySelector('main')
);
```

## Customize a component by using the tag's content

If using the component's tag's attribute doesn't seem semantic, you can use the content of the tag.


```JavaScript
class Person extends React.Component {
    render() {
        return <div>
            The name of the person is {this.props.children}
        </div>;
    }
}

ReactDOM.render(
    <section>
        <Person>Bob</Person>
        <Person>Sally</Person>
    </section>,
    document.querySelector('main')
);
```

You can further customize the content with tags and additional HTML/JSX:

```JavaScript
class Person extends React.Component {
    render() {
        return <div>
            The name of the person is {this.props.children}
        </div>;
    }
}

ReactDOM.render(
    <section>
        <Person>
            <em>Bob</em>.  He is awesome.
        </Person>
        <Person>Sally.  All hail Sally</Person>
    </section>,
    document.querySelector('main')
);
```

## Change a component's state through interaction

We want to interact with a component, and have it visually change.  To do this, we use the component's "state"

1. Create a basic form:

    ```JavaScript
    class Auth extends React.Component {
        render(){
            return <form>
                <input type="text" placeholder="Your Name" />
                <input type="submit" value="Log In" />
            </form>;
        }
    }

    ReactDOM.render(
        <Auth></Auth>,
        document.querySelector('main')
    );
    ```

1. In the component's constructor function, initialize the state object:

    ```JavaScript
    constructor(props){
        super(props)
        this.state = { username: "Not logged In" }
    }
    ```

1. Display the component's state's username property:

    ```JavaScript
    render(){
        return <form>
            {this.state.username}<br/>
            <input type="text" placeholder="Your Name" />
            <input type="submit" value="Log In" />
        </form>;
    }
    ```

1. Create an event handler for changing the user name field:

    ```JavaScript
    handleChangeName(event){
        console.log('changed user name');
    }
    ```

1. Set up handleChangeName so that it can access instance properties:

    ```JavaScript
    constructor(props){
        super(props)
        this.handleChangeName = this.handleChangeName.bind(this);        
        this.state = { username: "Not logged In" }
    }
    ```

1. When the input field changes, call handleChangeName:

    ```JavaScript
    render(){
        return <form>
            {this.state.username}<br/>
            <input
                onChange={this.handleChangeName}
                type="text"
                placeholder="Your Name" />
            <input type="submit" value="Log In" />
        </form>;
    }
    ```

1. Have handleChangeName update the component's state:

    ```JavaScript
    handleChangeName(event){
        this.setState({username:event.target.value});
    }
    ```

## Create references to the tags in a component

The previous section for updating state can often be overly complex when dealing with multiple form elements, especially when all you need is a reference to the form elements' values when submitting the form

1. Change input to have a reference, instead of an event handler:

    ```html
    <input
        ref="username"
        type="text"
        placeholder="Your Name" />
    ```

1. Replace handleChangeName with a form submission handler that references the text input

    ```JavaScript
    handleFormSubmit(event){
        event.preventDefault();
        this.setState({username:this.refs.username.value});
    }
    ```

1. Update constructor with correct event handler

    ```JavaScript
    constructor(props){
        super(props)
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = { username: "Not logged In" }
    }
    ```

## Update child component properties with state values

We can pass state values in as properties of child components

1. Create a Greeting component

    ```JavaScript
    class Greeting extends React.Component {
        render(){
            return <h1>Welcome {this.props.name}</h1>
        }
    }
    ```

1. Use Greeting component in Auth component

    ```JavaScript
    render(){
        return <form onSubmit={this.handleFormSubmit}>
            <Greeting name={this.state.username}></Greeting>
            <input
                ref="username"
                type="text"
                placeholder="Your Name" />
            <input type="submit" value="Log In" />
        </form>;
    }
    ```

## Call parent component methods

Sometimes you want to pass information to a parent component

1. Delete Greeting component class
1. Delete Greeting component instance within Auth JSX
1. You will no longer need state within Auth component

    ```JavaScript
    constructor(props){
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
    handleFormSubmit(event){
        event.preventDefault();
    }
    ```

1. Create a Heading around the Auth Section

    ```JavaScript
    class Heading extends React.Component {
        render(){
            return <header>
                <h1>Welcome</h1>
                <Auth></Auth>
            </header>
        }
    }

    ReactDOM.render(
        <Heading></Heading>,
        document.querySelector('main')
    );
    ```

1. Create constructor for Heading with state properties for username

    ```JavaScript
    class Heading extends React.Component {
        constructor(props){
            super(props);
            this.state = { username: null }
        }
        render(){
            return <header>
                <h1>Welcome {this.state.username}</h1>
                <Auth></Auth>
            </header>
        }
    }
    ```

1. Create a method for Heading that will update the state

    ```JavaScript
    updateUsername(newName){
        this.setState({username: newName});
    }    
    ```

1. Bind updateUsername in constructor

    ```JavaScript
    constructor(props){
        super(props);
        this.state = { username: null }
        this.updateUsername = this.updateUsername.bind(this);
    }
    ```

1. Pass this function in as a property to Auth

    ```JavaScript
    render(){
        return <header>
            <h1>Welcome {this.state.username}</h1>
            <Auth onLogin={this.updateUsername}></Auth>
        </header>
    }    
    ```

1. When the Auth component handles the form submission, call that property/function

    ```JavaScript
    handleFormSubmit(event){
        event.preventDefault();
        this.props.onLogin(this.refs.username.value);
    }    
    ```

## Make AJAX requests within React

React doesn't have any built-in functionality to handle AJAX.  Either use jQuery, fetch, or some other library to handle this

1. Set up a form that logs value of input on submit:

    ```JavaScript
    class OMDBQueryForm extends React.Component {
        constructor(props){
            super(props);
            this.queryOMDB = this.queryOMDB.bind(this);
        }
        queryOMDB(event){
            event.preventDefault();
            console.log(this.refs.title.value);
        }
        render(){
            return <form onSubmit={this.queryOMDB}>
                <input
                    ref="title"
                    type="text"
                    placeholder="Movie Title" />
                <input type="submit" value="Find Movie Info" />
            </form>
        }
    }

    ReactDOM.render(
        <OMDBQueryForm></OMDBQueryForm>,
        document.querySelector('main')
    );    
    ```

1. When submitting, make request to OMBD

    ```JavaScript
    queryOMDB(event){
        event.preventDefault();
        fetch('http://www.omdbapi.com/?t=' + this.refs.title.value).then(function(response){
            response.json().then(function(data){
                console.log(data);
            });
        });
    }    
    ```

1. Create a component to handle movie data

    ```JavaScript
    class MovieInfo extends React.Component {
        render(){
            return <ul>
                <li>Title:</li>
                <li>Director:</li>
                <li>Actors:</li>
                <li>Year:</li>
                <li>Rated:</li>
            </ul>
        }
    }    
    ```

1. Add it to OMDBQueryForm

    ```JavaScript
    render(){
        return <form onSubmit={this.queryOMDB}>
            <input
                ref="title"
                type="text"
                placeholder="Movie Title" />
            <input type="submit" value="Find Movie Info" />
            <MovieInfo></MovieInfo>
        </form>
    }
    ```

1. Set up state for found movie

    ```JavaScript
    constructor(props){
        super(props);
        this.queryOMDB = this.queryOMDB.bind(this);
        this.state = { foundMovie: null }
    }    
    ```

1. `this` inside the fetch callback is not the instantiated component.  Let's use arrow functions to fix this

    ```JavaScript
    queryOMDB(event){
        event.preventDefault();
        fetch('http://www.omdbapi.com/?t=' + this.refs.title.value).then((response) => {
            response.json().then((data) => {
                console.log(this);
            });
        });
    }
    ```

1. Now we can set the state of the form appropriately

    ```JavaScript
    queryOMDB(event){
        event.preventDefault();
        fetch('http://www.omdbapi.com/?t=' + this.refs.title.value).then((response) => {
            response.json().then((data) => {
                this.setState({foundMovie: data});
            });
        });
    }
    ```

1. And pass on the variable to the MovieInfo component

    ```html
    <MovieInfo data={this.state.foundMovie}></MovieInfo>
    ```

1. Within the MovieInfo component, we can display the info appropriately

    ```JavaScript
    render(){
        return <ul>
            <li>Title: {this.props.data.Title}</li>
            <li>Director: {this.props.data.Director}</li>
            <li>Actors: {this.props.data.Actors}</li>
            <li>Year: {this.props.data.Year}</li>
            <li>Rated: {this.props.data.Rated}</li>
        </ul>
    }
    ```

1. We'll get an error on page load because this.props.data isn't defined initially.  Let's display the component conditionally

    ```JavaScript
    render(){
        return <form onSubmit={this.queryOMDB}>
            <input
                ref="title"
                type="text"
                placeholder="Movie Title" />
            <input type="submit" value="Find Movie Info" />
            {
                (this.state.foundMovie !== null)?
                    <MovieInfo data={this.state.foundMovie}></MovieInfo>
                :
                    null
            }
        </form>
    }
    ```

## Handle component lifecycle events

A component has specific moments in its life:

1. It is created
1. It is updated
1. It is destroyed

We can perform actions during each of these moments.  Let's create an app that just counts down starting at 100.

1. Create the setup code:

    ```JavaScript
    class Counter extends React.Component {
        render(){
            return <section>
                The value:
            </section>
        }
    }

    ReactDOM.render(
        <Counter></Counter>,
        document.querySelector('main')
    );    
    ```

1. Create a state property for the count

    ```JavaScript
    class Counter extends React.Component {
        constructor(props){
            super(props)
            this.state = { count: 100 }
        }
        render(){
            return <section>
                The value: {this.state.count}
            </section>
        }
    }
    ```

1. Once the component has loaded, we want to call a function every 1000 milliseconds:

    ```JavaScript
    componentDidMount(){
        window.setInterval(
            function(){
                console.log('tick');
            },
            1000
        )
    }
    ```

1. The problem is that `this` is not correctly bound

    ```JavaScript
    componentDidMount(){
        window.setInterval(
            function(){
                console.log(this);
            },
            1000
        )
    }    
    ```

1. Let's use an arrow function

    ```JavaScript
    componentDidMount(){
        window.setInterval(
            () => {
                console.log(this);
            },
            1000
        )
    }    
    ```

1. Now we can decrement the state property

    ```JavaScript
    componentDidMount(){
        window.setInterval(
            () => {
                this.setState({ count: (this.state.count - 1) });
            },
            1000
        )
    }
    ```

1. Let's create a container that will bring the counter into existence:

    ```JavaScript
    class Container extends React.Component {
        render(){
            return <Counter></Counter>
        }
    }

    ReactDOM.render(
        <Container></Container>,
        document.querySelector('main')
    );    
    ```

1. Now were going to create a button that will create the counter and create a state property which will determine whether or not to show the counter

    ```JavaScript
    class Container extends React.Component {
        constructor(props){
            super(props)
            this.state = { buttonExists: false }
        }
        render(){
            return <section>
                <button>Toggle Counter</button>
                {
                    (this.state.buttonExists)?
                        <Counter></Counter>
                    :
                        null
                }
            </section>
        }
    }    
    ```

1. When the button is pressed, it toggles the counter's existence

    ```JavaScript
    class Container extends React.Component {
        constructor(props){
            super(props)
            this.state = { buttonExists: false }
            this.toggleButton = this.toggleButton.bind(this); //bind function
        }
        toggleButton(){ //create function
            this.setState({buttonExists: !this.state.buttonExists});
        }
        render(){ //add onClick listener
            return <section>
                <button onClick={this.toggleButton}>Toggle Counter</button>
                {
                    (this.state.buttonExists)?
                        <Counter></Counter>
                    :
                        null
                }
            </section>
        }
    }    
    ```

1. You'll notice we get a warning because the interval still exists, even though the component does not.  Let's create a pointer so that the interval can be cleared

    ```JavaScript
    componentDidMount(){
        this.timerID = window.setInterval(
            () => {
                this.setState({ count: (this.state.count - 1) });
            },
            1000
        )
    }
    ```

1. And now clear the interval when the component is destroyed

    ```JavaScript
    componentWillUnmount(){
        clearInterval(this.timerID);
    }    
    ```

1. Lastly, if some prop/state property is updated on the component, we can perform an action.

    ```JavaScript
    componentDidUpdate(previousProps, previousState){
        console.log('This component has changed.  The previous count was: ' + previousState.count);
    }    
    ```

## Style a component

You can use CSS as normal, but if you want to stick with React's component based architecture, you can use JavaScript to style a component without leaving the file

```JavaScript
let basicStyles = {
    background:'red',
    borderWidth:'2px',
    borderStyle:'solid',
    borderColor:'black'
};

class AwesomeSection extends React.Component {
    render(){
        return <section style={basicStyles}>
            sure is awesome
        </section>
    }
}

ReactDOM.render(
    <AwesomeSection></AwesomeSection>,
    document.querySelector('main')
);
```

You can extend your styles with `Object.assign()`

```JavaScript
let basicStyles = {
    background:'red',
    borderWidth:'2px',
    borderStyle:'solid',
    borderColor:'black'
};

let awesomeStyles = Object.assign({}, basicStyles, { padding: '10px'})

class AwesomeSection extends React.Component {
    render(){
        return <section style={awesomeStyles}>
            sure is awesome
        </section>
    }
}
```

You could also use composition to mimic inheritance:

```JavaScript
let basicStyles = {
    background:'red',
    borderWidth:'2px',
    borderStyle:'solid',
    borderColor:'black'
};

class BasicSection extends React.Component {
    render(){
        return <section style={Object.assign({}, basicStyles, this.props.style)}>
            {this.props.children}
        </section>
    }
}

let awesomeStyles = { padding: '10px'};

class AwesomeSection extends React.Component {
    render(){
        return <BasicSection style={awesomeStyles}>
            sure is awesome
        </BasicSection>
    }
}

ReactDOM.render(
    <AwesomeSection></AwesomeSection>,
    document.querySelector('main')
);
```
