import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";

class AddTodo extends Component {
  state = {
    todo: ""
  };
  handleSubmit = e => {
    e.preventDefault();
    const data = {
      title: this.state.todo
    };
    const { firestore } = this.props;

    firestore.add({ collection: "todo" }, data);
    this.setState({ todo: "" });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          onChange={e => this.setState({ todo: e.target.value })}
          type="text"
          className="form-control form-control-lg"
          placeholder="Enter todo and press Enter"
        />
      </form>
    );
  }
}

export default firestoreConnect()(AddTodo);
