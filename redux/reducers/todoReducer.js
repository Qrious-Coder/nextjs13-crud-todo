// redux/reducers/todoReducer.js
import { todoActionTypes } from '@/redux/actions/todoActions'

const initialState = {
  todoList: [],
  todoItem: '',
  error: null,
  loading: false
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case todoActionTypes.EDIT_TODO_SUCCESS:
      let editTodoId = state.todoList.findIndex( item => item._id.includes(action.payload._id))
      Object.assign(state.todoList[editTodoId], action.payload )
      return {
        ...state,
        loading: true,
      };
    case DELETE:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
};

export default todoReducer;
