import React from 'react';
import Comment from './Comment';

class Comments extends React.Component {
  
  render() {
    const comments = this.props.commentsData.comment[this.props.videoId];
    let commentsList = [];
    for (var comment_k in comments) {
      commentsList.push(
        <Comment
          key={comment_k}
          commentData={comments[comment_k]}
          history={this.props.history}
        />
      );
    };
    return (
      <section className="comments-grid">
        {commentsList}
      </section>
    );
  }
}

export default Comments;
