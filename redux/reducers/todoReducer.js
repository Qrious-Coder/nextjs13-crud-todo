import { todoActionTypes } from '@/redux/actions/todoActions'

const initialState = {
  todoList: [],
  todoItem: '',
  error: null,
  loading: false
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case todoActionTypes.GET_TODO_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case todoActionTypes.GET_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todoList: action.payload,
      }
    case todoActionTypes.GET_TODO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case todoActionTypes.ADD_TODO_REQUEST:
      return {
        ...state,
        loading: true
      }
    case todoActionTypes.ADD_TODO_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false
      }
    case todoActionTypes.ADD_TODO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case todoActionTypes.EDIT_TODO_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case todoActionTypes.EDIT_TODO_SUCCESS:
      let editTodoId = state.todoList.findIndex( item => item._id.includes(action.payload._id))
      Object.assign(state.todoList[editTodoId], action.payload )
      return {
        ...state,
        loading: false,
      };
    case todoActionTypes.EDIT_TODO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case todoActionTypes.DELETE_TODO_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case todoActionTypes.DELETE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todoList.filter((todo) => todo._id !== action.payload),
        loading: false,
      };
    case todoActionTypes.DELETE_TODO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case todoActionTypes.SEARCH_TODO_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case todoActionTypes.SEARCH_TODO_SUCCESS:
      const { title } = action.payload;
      const filteredList = state.todoList.filter(
        (todo) => todo.title.toLowerCase().includes(title.toLowerCase())
      );

      return {
        ...state,
        loading: false,
        todoList: filteredList,
      };

    case todoActionTypes.SEARCH_TODO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default todoReducer;
