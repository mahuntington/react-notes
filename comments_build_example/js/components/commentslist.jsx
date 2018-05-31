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
