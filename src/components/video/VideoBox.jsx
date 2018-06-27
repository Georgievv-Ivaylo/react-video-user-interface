import React from 'react';
import { Link } from 'react-router-dom';


class VideoBox extends React.Component {
  
  render() {
    const elData = this.props.elData;
    const match = this.props.match || {};
    return (
      <div className="box">
        <Link to={`${match.url}/video?v=${elData.id}&vlid=${this.props.vlid}`}>
          <img src={elData.image} alt=" " className="image" />
        </Link>
      </div>
    );
  }
}

export default VideoBox;
