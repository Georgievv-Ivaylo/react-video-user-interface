import React from 'react';

class VideoOptions extends React.Component {
  
  render() {
    return (
      <div className="video-options-grid">
        <div className="left-side">
          <div className="fa-btn">
            <i className="far fa-heart"></i>
            Like
          </div>
          <div className="fa-btn">
            <i className="fas fa-share-alt"></i>
            Share
          </div>
        </div>
        <div className="right-side">
          <div className="info-btn btn">
            Edit
          </div>
          <div className="warning-btn btn">
            Delete
          </div>
        </div>
        <div className="clear"></div>
      </div>
    );
  }
}

export default VideoOptions;
