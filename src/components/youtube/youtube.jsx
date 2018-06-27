import React from 'react';
import ReactPlayer from 'react-player';

class YouTubeVideo extends React.Component {

  constructor (props) {
    super(props);

    this.state = { 
      video: this.props,
      showVideo: ' ',
      playing: true,
      volume: 0.4,
      muted: true,
      played: 0,
      duration: 0,
      playIcon: 'pause',
      mutedIcon: 'up',
      progress: {'width': '16px'},
      error: false,
      remaining: true
    };
  }
  
  render() {

    const videoId = this.props.video.id;
    const playing = this.state.playing;
    const muted = this.state.muted;
    const volume = this.state.volume;
    const played = this.state.played;
    const progress = this.state.progress;
    const duration = this.state.duration;
    const url = 'https://www.youtube.com/watch?v='+ videoId;

    const opts = {
      playerVars: {
        color: 'white',
        controls: 0,
        fs: 0,
        rel: 0,
        showinfo: 0,
        start: 0,
        modestbranding: 1,
        vq: 'hd1080'
      }
    };

    return (
      <div
        className={ "video-grid delay"+ this.state.showVideo}>
        <div className="video-place relative">
          <ReactPlayer
            className='video-player'
            ref={this.ref}
            url={url}
            config={{
              youtube: {
                playerVars: { opts }
              }
            }}
            width='100%'
            height='100%'
            playing={playing}
            muted={muted}
            volume={volume}
            onProgress={this.onProgress}
            onDuration={this.onDuration}
            onError={this.playerError}
            onReady={this.playerOnReady}
            onStart={this.onStart}
          />
          <div className="controllers-grid">
            <div className="container">
              <div className="action" onClick={this.handelPlay}>
                <i className={ "fas fa-"+ this.state.playIcon}></i>
              </div>
              <div className="sound" onClick={this.handelSound}>
                <i className={ "fas fa-volume-"+ this.state.mutedIcon}></i>
              </div>
              <div className="progress-bar-grid">
                <div className="progress-bar">
                  <div className="progress" style={progress}>
                  </div>
                  <input
                    type='range' min={0} max={1} step='any'
                    value={played}
                    onMouseDown={this.onSeekMouseDown}
                    onChange={this.onSeekChange}
                    onMouseUp={this.onSeekMouseUp}
                    className="progress-slider"
                  />
                </div>
              </div>
              <p className="remaining-box" onClick={this.toggleTime}>
                {this.state.remaining ?
                  '-'+ ((duration * (1 - played))/60).toFixed(2).replace('.', ':') :
                  ((duration * played)/60).toFixed(2).replace('.', ':')
                }
              </p>
              <div className="clear"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  
  playerError = (e) => {
    const errorData = {
      'error': 'error',
      'url': this.props.video.url
    }
    this.props.validateVideo(errorData);
  }

  ref = player => {
    this.player = player
  }

  onStart = (e) => {
    this.props.validateVideo({video: this.props.video, success: true});
    this.setState({ showVideo: ' show' });
  }
 
  handelPlay = (event) => {
    this.setState({ playing: !this.state.playing });
    this.setState({ playIcon: this.state.playIcon === 'play' ?
                     'pause' :
                     'play' 
                  });
  }
 
  toggleTime = (event) => {
    this.setState({ remaining: !this.state.remaining });
  }
 
  handelSound = (event) => {
    this.setState({ muted: !this.state.muted });
    this.setState({
      mutedIcon: this.state.mutedIcon === 'off' ?
        'up' :
        'off'
    });
  }
  
  onDuration = (duration) => {
    this.setState({ duration });
  }

  onSeekMouseDown = e => {
    this.setState({ seeking: true });
  }

  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) }, function () {
      const progressLength = (this.state.played * 100).toFixed(3);
      this.setState({progress: {'width': progressLength +'%'}});
    })
  }

  onSeekMouseUp = e => {
    this.setState({ seeking: false });
    this.player.seekTo(parseFloat(e.target.value));
  }

  onProgress = state => {
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state, function () {
        const progressLength = (this.state.played * 100).toFixed(3);
        this.setState({progress: {'width': progressLength +'%'}});
      })
    }
  }
}

export default YouTubeVideo;
