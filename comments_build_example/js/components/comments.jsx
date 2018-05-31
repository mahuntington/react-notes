import React from 'react';
import CommentsList from './commentslist.jsx'
import CommentsForm from './commentsform.jsx'

class Comments extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            comments: []
        }
        this.addComment = this.addComment.bind(this);
    }
    addComment(comment){
        this.state.comments.push(comment); //this alone won't notify React to update the DOM
        this.setState({
            comments: this.state.comments
        });
    }
    render(){
        return <section>
            <CommentsList comments={this.state.comments}></CommentsList>
            <CommentsForm handleSubmit={this.addComment}></CommentsForm>
        </section>
    }
}

export default Comments;
