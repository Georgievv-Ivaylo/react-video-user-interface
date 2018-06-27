import React from 'react';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: props.comment || ''
    }
  }

  handleChange = (e) => {
    if (e.keyCode === 13) {
      this.props.inputHandler(e.target.value);
      this.setState({[e.target.name]: ''});
    } else {
      this.setState({[e.target.name]: e.target.value});
    }
  }
  
  render() {
    return (
      <div className="comment-field">
        <textarea
          name="comment"
          value={this.state.comment}
          placeholder="comment..."
          onKeyUp={this.handleChange}
          onChange={this.handleChange}
          className="field"
          autoFocus
        ></textarea>
      </div>
    );
  }
}

export default CommentForm;
