import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      video_url: props.url || ''
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }
  
  render() {
    return (
      <div className="video-field">
        <input type="text"
               name="video_url"
               value={this.state.video_url}
               placeholder="Video URL..."
               onKeyUp={this.props.inputHandler}
               onChange={this.handleChange}
               autoFocus />
      </div>
    );
  }
}

export default Form;
