import { todoActionTypes } from '@/redux/actions/todoActions'

const initialState = {
  editableTodoId: '',
  addNoteTodoId:'',
  todoList: [],
  total: 0,
  currentTodo: null,
  error: null,
  loading: false,
  showModal: false,

  curPage: 1,
  limit: 5,
};

const todoReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case todoActionTypes.GET_TODOS_REQUEST:
    case todoActionTypes.GET_TODOS_FEATURE_REQUEST:
    case todoActionTypes.ADD_TODO_REQUEST:
    case todoActionTypes.EDIT_TODO_REQUEST:
    case todoActionTypes.DELETE_TODO_REQUEST:
    case todoActionTypes.SEARCH_TODO_REQUEST:
    case todoActionTypes.ADD_NOTE_REQUEST:
    case todoActionTypes.GET_TODO_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      }
  
    case todoActionTypes.GET_TODOS_FAILURE:
    case todoActionTypes.GET_TODOS_FEATURE_FAILURE:
    case todoActionTypes.ADD_TODO_FAILURE:
    case todoActionTypes.EDIT_TODO_FAILURE:  
    case todoActionTypes.DELETE_TODO_FAILURE:  
    case todoActionTypes.SEARCH_TODO_FAILURE:
    case todoActionTypes.ADD_NOTE_FAILURE:
    case todoActionTypes.GET_TODO_BY_ID_FAILURE:  
      return {
        ...state,
        loading: false,
        error: payload
      }
      
    case todoActionTypes.GET_TODOS_SUCCESS:
    case todoActionTypes.GET_TODOS_FEATURE_SUCCESS:  
      return {
        ...state,
        loading: false,
        todoList: payload.todos,
        total: payload.totalCount
      }
       
    case todoActionTypes.ADD_TODO_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false
      }
    case todoActionTypes.SET_TODO_EDITABLE:
      return {
        ...state,
        editableTodoId: payload,
        loading: false
      }
    case todoActionTypes.EDIT_TODO_SUCCESS:
      let addNoteTodoId = state.todoList.findIndex( item => item._id.includes(payload._id))
      Object.assign(state.todoList[addNoteTodoId], payload )
      return {
        ...state,
        editableTodoId: '',
        loading: false,
      };

    case todoActionTypes.DELETE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todoList.filter((todo) => todo._id !== payload),
        loading: false,
      };
    
    case todoActionTypes.SEARCH_TODO_SUCCESS:
      const { title } = payload;
      const filteredList = state.todoList.filter(
        (todo) => todo.title.toLowerCase().includes(title.toLowerCase())
      );
    
    case todoActionTypes.GET_TODO_BY_ID_SUCCESS:
      return {
        ...state,
        currentTodo: payload,
        loading: false,
      };

    case todoActionTypes.ADD_NOTE_SUCCESS:
      let editNoteId = state.todoList.findIndex( item => item._id.includes(payload._id))
      Object.assign(state.todoList[editNoteId], payload )
      return {
        ...state,
        showModal: false,
        addNoteTodoId: '',
        loading: false,
      };

    case todoActionTypes.SHOW_MODAL:
      return {
        ...state,
        showModal: true,
        addNoteTodoId: payload,
        loading: false,
      }

    case todoActionTypes.CLOSE_MODAL:
      return {
        ...state,
        showModal: false,
        addNoteTodoId: '',
        loading: false,
      }  

    case todoActionTypes.SAVE_CURRENT_PAGE:
      return {
        ...state,
        curPage: payload,
        loading: false,
      };
    case todoActionTypes.SAVE_CURRENT_LIMIT:
      return {
        ...state,
        limit: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default todoReducer;
