import React from 'react';

class CommentsForm extends React.Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event){
    event.preventDefault();
    this.props.handleSubmit({
        body: this.refs.body.value,
        author: this.refs.author.value
    });
}
    render() {
        return <form onSubmit={this.handleSubmit}>
            <input ref="author" type="text" placeholder="author"/><br/>
            <textarea ref="body" placeholder="comment"></textarea><br/>
            <input type="submit" value="Post Comment"/>
        </form>
    }
}

export default CommentsForm;
