import React from 'react';
import ReplyForm from './ReplyForm';

class Reply extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reply: ''
    }
  }

  handleChange = (e) => {
    if (e.keyCode === 13) {
      this.props.inputHandler(e.target.name, e.target.value);
      this.setState({[e.target.name]: ''});
    } else {
      this.setState({[e.target.name]: e.target.value});
    }
  }
  
  render() {
    return (
      <div className="reply-grid">
        <div className="reply-options">
          <div className="left-side">
            <div className={this.props.reply ? 'simple-btn active': 'simple-btn'}>
              Comment
            </div>
            <div className="simple-btn">
              Photo
            </div>
            <div className="simple-btn">
              Feedback
            </div>
          </div>
          <div className="clear"></div>
        </div>
        {this.props.reply &&
          <ReplyForm reply={this.state.reply} handleChange={this.handleChange} />
        }
      </div>
    );
  }
}

export default Reply;
