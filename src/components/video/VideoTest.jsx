import React from 'react';


class VideoTest extends React.Component {
  
  render() {
    // const match = { match } || {};
    // console.log(match);
    console.log('Test: ', this.props)
    return (
      <h2 className='clear'>
        {this.props.match.params.test}
      </h2>
    );
  }
}

export default VideoTest;
