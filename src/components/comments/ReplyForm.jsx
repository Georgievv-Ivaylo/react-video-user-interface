import React from 'react';

class ReplyForm extends React.Component {
  
  render() {
    return (
      <div className="comment-field">
        <textarea
          name="reply"
          value={this.props.reply}
          placeholder="Reply..."
          onKeyUp={this.props.handleChange}
          onChange={this.props.handleChange}
          className="field"
        ></textarea>
      </div>
    );
  }
}

export default ReplyForm;
