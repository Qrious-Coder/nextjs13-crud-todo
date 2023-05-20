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
    case todoActionTypes.GET_TODO_FEATURE_REQUEST:
    case todoActionTypes.ADD_TODO_REQUEST:
    case todoActionTypes.EDIT_TODO_REQUEST:
    case todoActionTypes.DELETE_TODO_REQUEST:
    case todoActionTypes.SEARCH_TODO_REQUEST:  
      return {
        ...state,
        loading: true,
      }
  
    case todoActionTypes.GET_TODO_FAILURE:
    case todoActionTypes.GET_TODO_FEATURE_FAILURE:
    case todoActionTypes.ADD_TODO_FAILURE:
    case todoActionTypes.EDIT_TODO_FAILURE:  
    case todoActionTypes.DELETE_TODO_FAILURE:  
    case todoActionTypes.SEARCH_TODO_FAILURE:  
      return {
        ...state,
        loading: false,
        error: action.payload
      }
      
    case todoActionTypes.GET_TODO_SUCCESS:
    case todoActionTypes.GET_TODO_FEATURE_SUCCESS:  
      return {
        ...state,
        loading: false,
        todoList: action.payload,
      }
       
    case todoActionTypes.ADD_TODO_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false
      }
 
    case todoActionTypes.EDIT_TODO_SUCCESS:
      let editTodoId = state.todoList.findIndex( item => item._id.includes(action.payload._id))
      Object.assign(state.todoList[editTodoId], action.payload )
      return {
        ...state,
        loading: false,
      };
   
   
    case todoActionTypes.DELETE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todoList.filter((todo) => todo._id !== action.payload),
        loading: false,
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

    default:
      return state;
  }
};

export default todoReducer;
