import React, { Component } from 'react';

class UserInput  extends Component {
  
  render() {
    return (
      <div>
        <input type="text" name="userinput" onChange={this.props.onHandler} />
      </div>
    );
  }
}

export default UserInput;