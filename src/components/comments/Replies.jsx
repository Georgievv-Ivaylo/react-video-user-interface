import React from 'react';
import Reply from './Reply';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import Comment from './Comment';

class Replies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
      reply: this.props.comment.reply,
      comment: this.props.comment
    }
  }
  
  render() {
    const reply = this.state.reply;
    const user = this.state.user;
    const comment = this.props.comment;
    const repliesData = this.props.replies;
    let replies =  [];
    if (repliesData[comment.videoId]) {
      const newReplies = repliesData[comment.videoId][comment.id];
      if (newReplies) {
        const checkReplies = newReplies.filter( function (reply) {

          return reply.id === comment.id && comment.type === 'reply';
        });
        if (checkReplies.length <= 0) {
          replies = newReplies;
        }
      }
		}
    let commentsList = {};
    if (replies) {
      commentsList = replies.map((comment, id) => 
        <Comment
          key={id}
          commentData={comment}
        />
      );
    }
    return (
      <section className="replies-grid">
        {user && this.state.comment.user !== user.id && <Reply reply={reply} inputHandler={this.updateReplies} />}
        {replies && commentsList}
      </section>
    );
  }

  updateReplies = (propName, propValue) => {
    let replies = this.state.replies;
    const user = this.state.user;
    if (!user || !user.id) return this.props.history.push({ 'pathname': '/log-in' });
    let elId = 1;
    if (replies) elId = replies.length + 1;
    let videoId = this.props.comment.videoId;
    let parent = this.props.comment.id;
    if (this.props.comment.type === 'reply') {
      videoId = this.props.comment.videoId;
      parent = this.props.comment.parent;
    }
    
    const commentData = {
      id: elId,
      type: 'reply',
      videoId: videoId,
      parent: parent,
      text: propValue,
      date: new Date().toString(),
      user: user.id
    };
    this.props.actions.reply(commentData);
    this.props.actions.save(commentData);
  }
}

function mapStateToProps (state) {
  return {
    replies: state.handelComment.reply,
    user: state.user,
  };
}

function mapDispatchToProps (dispatch) {
  return {
      actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Replies);
