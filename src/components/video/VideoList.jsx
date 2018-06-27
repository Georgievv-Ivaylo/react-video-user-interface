import React from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';
import VideoBox from './VideoBox';
import Video from './Video';

class VideoList extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      videos: this.props.videos,
      vlid: this.props.vlid || '',
      listURI: this.props.listURI || ''
    };
  }

  componentDidMount() {
    console.log('mount')
    fetch('/data/get/videos?vlid='+ this.state.vlid)
    .then(res => res.json())
    .then(
      (result) => {
        let { dispatch } = this.props;
        const action = actions.importVideos(result);
        dispatch(action);
      },
      (error) => {}
    )
  }
  
  componentWillReceiveProps(nextProps){
    const videos = this.state.videos;
    this.setState({...videos, videos: nextProps.videos})
  }

  render() {
    const videos = this.state.videos;
    const match = this.props.match || {};
    let videoList = {};
    if (videos) {
      videoList = videos.map((video, id) => 
        <VideoBox
          key={id}
          elData={video}
          match={match}
          routes={this.props.routes}
          vlid={this.state.vlid}
          listURI={this.state.listURI}
        />
      );
    }
    
    return (
      <section className="list-grid">
        <Link to={`${match.url}/video`} className="box slow add-video">
          <i className="fa fa-plus"></i>
        </Link>
        {videos && videoList}
       
        <Route
          path={`${match.url}/:video`}
          render={(props) => {
            return <Video vlid={this.state.vlid} showModal='true' closeModal={this.closeVideo} {...props} />
          }}
        />
      </section>
    );
  }
 
  setModal = () => {
    this.setState({ modal: !this.state.modal });
  }
 
  closeVideo = () => {
    return this.props.history.goBack();
  }
}

function mapStateToProps (state) {
  return {
    videos: state.videoData.videos
  };
}

export default connect(mapStateToProps)(VideoList);