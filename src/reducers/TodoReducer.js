const initialState = {
  books: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "GET_TODO":
      return {
        ...state,
        books: action.payload
      };
    case "ADD_TODO":
      return {
        ...state,
        books: [action.payload, ...state.books]
      };
    case "DELETE_TODO":
      return {
        ...state,
        books: state.books.filter(book => book.id !== action.payload)
      };
    case "UPDATE_TODO":
      return {
        ...state,
        books: state.books.map(
          book => (book.id === action.id ? book === action.payload : book)
        )
      };
    default:
      return state;
  }
}
