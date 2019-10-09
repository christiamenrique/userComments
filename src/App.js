import React, { Component } from 'react';
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      commentList: []

    }
}

handleCommentChange = (event) => {
  // Making copies on objects
  const newState = Object.assign({}, this.state);

  newState.comment = event.target.value;

  this.setState({
    comment: newState.comment
  })
}

handleCommentSubmit = () => {
  console.log('submit');
  const commentObject = {
      message: this.state.comment,
      like: 0 , 
      dislike: 0 ,
      reply: '',
      replies: []
  }
  // Making copies on array
  const newCommentList = [...this.state.commentList];
  newCommentList.push(commentObject);
  this.setState({
    commentList: newCommentList,
    comment: ''
  })
}

handleCommentLike (index) {
  let newCommentList = [...this.state.commentList];
  // // ++ is shorthand for + 1
  newCommentList[index].like++;
  this.setState({
    commentList: newCommentList
  });
}

handleCommentDislike (index) {
  let newCommentList = [...this.state.commentList];
  // // ++ is shorthand for + 1
  newCommentList[index].dislike++;
  this.setState({
    commentList: newCommentList
  });
}

handleCommentDelete (index) {
  let newCommentList = [...this.state.commentList];
  newCommentList.splice(index, 1)
  this.setState ({
    commentList: newCommentList
  });
}

handleReplyChange = (event, index) => {
  const newState = Object.assign({}, this.state);
  const userInput = event.target.value;

  newState.commentList[index].reply = userInput;

  this.setState({
    commentList: newState.commentList
  });
}

handleReplySubmit (index) {
  const newCommentList = [...this.state.commentList];
  const replyObj = {
    message: this.state.commentList[index].reply,
    like: 0, 
    dislike: 0,
  };

  newCommentList[index].replies.push(replyObj);
  newCommentList[index].reply = '';
  this.setState({
    commentList: newCommentList
  })
}

handleReplyLike (parentIndex, childIndex) {
  const newCommentList = [...this.state.commentList];

  newCommentList[parentIndex].replies[childIndex].like++

  this.setState({
    commentList: newCommentList
  })
}


handleReplyDislike (parentIndex, childIndex) {
  const newCommentList = [...this.state.commentList];

  newCommentList[parentIndex].replies[childIndex].dislike++

  this.setState({
    commentList: newCommentList
  })
}

handleReplyDelete(parentIndex, childIndex) {
  let newCommentList = [...this.state.commentList];
  newCommentList[parentIndex].replies.splice(childIndex, 1)
  this.setState ({
    commentList: newCommentList
  });
}

render() {
  // Create comments
  const comments = this.state.commentList.map((comment, parentIndex) => {
    const replies = comment.replies.map((reply, childIndex) => {
      return (
        <div>
          <p>{reply.message}</p>
          <button className="btn btn-success" onClick={() => this.handleReplyLike(parentIndex, childIndex)}>{reply.like} <i class="fas fa-thumbs-up"></i></button>
          <button className="btn btn-warning" onClick={() => this.handleReplyDislike(parentIndex, childIndex)}>{reply.dislike} <i class="fas fa-thumbs-down"></i></button>
          <button className="btn btn-danger" onClick={() => this.handleReplyDelete(parentIndex, childIndex)}><i class="far fa-trash-alt"></i></button>
        </div>
      );
    });

    return (
      <div key={parentIndex}>
        <h3 className="commentMessage">{comment.message}</h3>
        <input className="replyBox" onChange={(event) => this.handleReplyChange(event, parentIndex)} value={this.state.commentList[parentIndex].reply} type="text"/>
        <button className="btn btn-primary" onClick={() => this.handleReplySubmit(parentIndex)}>Reply</button>
        <div className="comment-like-button">
          <button className="btn btn-success" onClick={() => this.handleCommentLike(parentIndex)}>{comment.like}<i class="fas fa-thumbs-up"></i></button>
          <button className="btn btn-warning" onClick={() => this.handleCommentDislike(parentIndex)}>{comment.dislike} <i class="fas fa-thumbs-down"></i></button>
          <button className="btn btn-danger" onClick={() => this.handleCommentDelete(parentIndex)}><i class="far fa-trash-alt"></i></button>
          {replies}
        </div>
      </div>
    )
  }, this)

  return (
    <React.Fragment className="App">
      {/* <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2552&q=80" alt= "beach"/> */}
      <h1>Enter your comment here :</h1>
      <div className="commentSubmit">
      <input className="commentBox" onChange={this.handleCommentChange} value={this.state.comment}/>
      <button className="btn btn-primary" type="submit" onClick={this.handleCommentSubmit}>Comment</button>
      {comments}
      </div>
    </React.Fragment>
  )

  
    
  }
}

export default App;