import axios from "axios";

export const getTodo = () => dispatch => {
  axios.get("https://jsonplaceholder.typicode.com/todos").then(res =>
    dispatch({
      type: "GET_TODO",
      payload: res.data
    })
  );
};

export const addTodo = data => dispatch => {
  axios
    .post("https://jsonplaceholder.typicode.com/todos", { title: data })
    .then(res => dispatch({ type: "ADD_TODO", payload: res.data }));
};

export const deleteTodo = id => dispatch => {
  axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
  dispatch({
    type: "DELETE_TODO",
    payload: id
  });
};

export const updateTodo = (id, newInput) => dispatch => {
  axios
    .put(`https://jsonplaceholder.typicode.com/todos/${id}`, newInput)
    .then(res =>
      dispatch({
        type: "UPDATE_TODO",
        payload: res.data,
        id
      })
    );
};
