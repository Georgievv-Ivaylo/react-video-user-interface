import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import * as commentActions from '../comments/actions';
import Form from './Form';
import Comments from '../comments/Comments';
import CommentForm from '../comments/CommentForm';
import YouTubeVideo from '../youtube/youtube';
import VideoOptions from './VideoOptions';

class Video extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      value: 0,
      status: false,
      modal: true,
      redirect: false,
      user: this.props.user,
      video: this.props.video,
      comments: this.props.comments,
      comment: '',
      isImportedComments: false
    };
  }

  componentWillReceiveProps(nextProps){
    const video = nextProps.video;
    const comments = this.state.comments.comment;

    if (video.embed && !comments[video.id] && !this.state.isImportedComments) {
      fetch('/data/get/comments?vid='+ video.id)
      .then(res => res.json())
      .then(
        (result) => {
          this.props.commentActions.importComments(result);
          this.setState({ isImportedComments: true });
        },
        (error) => {}
      )
    }
  }

  render() {
    let thisVideo = '';
    const location = this.props.location;
    const video = this.props.video;

    if (location && location.pathname !== '/' &&
        (location.search.indexOf('?v=') >= 0 || location.search.indexOf('&v=') >= 0) &&
        !this.state.status) {
      thisVideo = location.pathname + location.search;
      this.startVideo(thisVideo);
    }

    if (this.state.redirect) {
      return <Redirect to='/videos' />;
    }
    
    return (
      this.state.modal &&
        <div className="modal-grid">
          <div className="modal-container">
            <div className="close-btn" onClick={this.setThisModal}>x</div>
            <div id="video">
              {!video.embed &&
                <Form
                  url={thisVideo}
                  inputHandler={this.onKeyUp} />
              }
              {video.error &&
                <p className="error-msg">{video.error}</p>
              }
              {video.url && !video.error &&
                <YouTubeVideo video={video} validateVideo={this.isValid} />
              }
              {video.embed &&
                <div>
                  <VideoOptions />
                  <CommentForm comment={this.state.comment} inputHandler={this.updateVideoComments} />
                </div>
              }
              {this.state.status && !video.embed && !video.error &&
                <p className="info-msg">{this.state.status}</p>
              }
            </div>
            {this.state.comments &&
              <Comments commentsData={this.state.comments} videoId={this.state.video.id} history={this.props.history} />
            }
          </div>
        </div>
    );
  }

  onKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.startVideo(e.target.value);
    }
  }

  startVideo = (video) => {
    const videoURL = video;
    let vlid = this.props.vlid;
    this.setState({
      error: false,
      status: 'Checking video...',
      value: {url: videoURL, vlid: vlid}
    }, function () {
      this.props.actions.validateURL(this.state.value);
    });
  }

  updateVideoComments = (commentText) => {
    const video = this.props.video;
    const user = this.state.user;
    if (!user || !user.id) return this.props.history.push({ 'pathname': '/log-in' });
    
    const commentData = {
      type: 'comment',
      videoId: video.id,
      text: commentText,
      date: new Date().toString(),
      user: user.id
    };
    
    this.props.commentActions.comment(commentData);
    this.props.commentActions.save(commentData);
  }

  isValid = (data) => {
    this.setState({error: false});
    if (data.error === 'error') this.setState({ videoURL: this.state.value });
    this.setState({ video: data.video }, function () {
      this.props.actions.validateURL(data);
    });
  }
 
  setThisModal = () =>  {
    this.props.actions.clearVideo();
    if (this.props.closeModal) {
      this.props.closeModal();
    } else {
      this.setState({
        modal: !this.state.modal,
      });
    }
  }
}

function mapStateToProps (state) {
  return {
    video: state.videoData.video,
    comments: state.handelComment,
    user: state.user,
    error: false
  };
}

function mapDispatchToProps (dispatch) {
  return {
      actions: bindActionCreators(actions, dispatch),
      commentActions: bindActionCreators(commentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Video);