import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";

class Todo extends Component {
  state = {
    edit: false,
    id: "",
    newInput: ""
  };
  updateTodo = (id, e) => {
    e.preventDefault();
    const NewTodo = this.state.newInput;
    this.props.updateTodo(id, NewTodo);
    this.setState({ edit: false });
  };

  deleteTodo(id) {
    const { firestore } = this.props;

    firestore.delete({ collection: "todo", doc: id });
  }

  render() {
    const books = this.props.books;

    var edit = "";
    if (this.state.id !== "") {
      books.map(book => {
        if (book.id === this.state.id) {
          edit = (
            <li className="list-group-item">
              <form onSubmit={this.updateTodo.bind(this, book.id)}>
                <input
                  onChange={e => this.setState({ newInput: e.target.value })}
                  className="form-control"
                  defaultValue={book.title}
                />
              </form>
            </li>
          );
        }
      });
    }
    if (books) {
      console.log(books);
      return (
        <div className="container text-center text-light">
          <h1 className="">Todo List (Made by M.Alvee)</h1>

          <ul class="list-group text-dark my-2">
            {this.state.edit == false
              ? books.map(book => (
                  <li className="list-group-item">
                    {" "}
                    {book.title}{" "}
                    <Link
                      to={`/edit/${book.id}/${book.title}`}
                      className="float-right ml-3"
                    >
                      <i class="fas fa-marker" />
                    </Link>
                    <a
                      onClick={this.deleteTodo.bind(this, book.id)}
                      href="#!"
                      className="float-right"
                    >
                      <i class="far fa-trash-alt" />
                    </a>{" "}
                  </li>
                ))
              : edit}
          </ul>
        </div>
      );
    } else {
      return <h1>Loading</h1>;
    }
  }
}

const mapStateToProps = state => {
  return {
    books: state.books.books
  };
};

export default compose(
  firestoreConnect([{ collection: "todo" }]),
  connect(state => ({
    books: state.firestore.ordered.todo
  }))
)(Todo);
