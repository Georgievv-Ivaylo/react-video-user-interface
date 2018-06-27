import React from 'react';
import { connect } from 'react-redux';
import Replies from './Replies';
import usersData from '../users/usersData.json';

class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: this.props.commentData.type === 'comment' ?
      this.props.comments[this.props.commentData.type][this.props.commentData.videoId] :
      this.props.comments[this.props.commentData.type][this.props.commentData.videoId][this.props.commentData.parent],
      comment: this.props.commentData,
      user: usersData[this.props.commentData.user],
      loggedUser: this.props.user
    }
  }
  
  render() {
    const commentData = this.state.comment;
    const elId = commentData.id - 1;
    const user = this.state.user;
    
    return (
      <div className="box">
        <div className="user">
          <img src={user.avatar} alt=" " className="image" />
          <div className="right-side">
            <h4 className="title">
              {user.fullName}
            </h4>
            <p className="date">
              {this.formatDate(new Date(commentData.date))}
            </p>
          </div>
          <div className="clear"></div>
        </div>
        <div className="comment-grid">
          <p className="comment">
            {commentData.text}
          </p>
          <div className="options">
            <div className="left-side">
              <div className="fa-btn">
                <i className="far fa-heart"></i>
                Like
              </div>
              <div className="fa-btn">
                <i className="fas fa-share-alt"></i>
                Share
              </div>
              {this.state.comments[elId] && 
                <div className={this.state.comments[elId] &&
                  this.state.comments[elId].reply && commentData.reply ?
                  'fa-btn active' : 'fa-btn'}
                  onClick={ () => this.toggleBox( elId, 'reply')}>
                  <i className="fa fa-comment-dots"></i>
                  {this.state.comments[elId].user !== this.state.loggedUser.id ? 'Comment' : 'Comments'}
                </div>
              }
            </div>
            <div className="right-side">
              <div className="fa-btn report right">
                <i className="far fa-flag"></i>
                Report
              </div>
            </div>
            <div className="clear"></div>
          </div>
        </div>
        {this.state.comments[elId].reply && commentData.reply &&
          <Replies reply={this.state.comments[elId].reply} comment={this.state.comments[elId]} history={this.props.history} />
        }
      </div>
    );
  }
 
  toggleBox = (elId, propName) =>  {
    let comments = this.state.comments;
    let comment = this.state.comment;
    this.setState({
        comments: {...comments, [elId]: {...comments[elId], [propName]: !comments[elId][propName]}},
        comment: {...comment, [propName]: !comment[propName]}
      }, function () {}
    )
  }

  formatDate(date) {
    const monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;

    return  monthNames[monthIndex] +' '+ day +', '+ year +' '+ strTime;
  }
}

function mapStateToProps (state) {
  return {
    video: state.video,
    comments: state.handelComment,
    reply: state.handelComment.reply,
    users: state.users,
    user: state.user
  };
}

export default connect(mapStateToProps)(Comment);
