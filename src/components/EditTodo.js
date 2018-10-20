import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";

class EditTodo extends Component {
  state = {
    newTodo: ""
  };
  updateTodo = e => {
    e.preventDefault();
    const { firestore } = this.props;
    const id = this.props.match.params.id;
    firestore
      .update({ collection: "todo", doc: id }, { title: this.state.newTodo })
      .then(() => {
        this.props.history.push("/");
      });
  };
  render() {
    return (
      <div className="text-center text-light">
        <h1>Edit Todo</h1>
        <form onSubmit={this.updateTodo}>
          <input
            onChange={e => this.setState({ newTodo: e.target.value })}
            type="text"
            defaultValue={this.props.match.params.data}
            className="form-control"
          />
          <br />
          <br />
          <input type="submit" value="Update" className="btn btn-info" />
        </form>
      </div>
    );
  }
}

export default firestoreConnect()(EditTodo);
