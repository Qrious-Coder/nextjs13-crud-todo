import { todoActionTypes } from '@/redux/actions/todoActions'

const initialState = {
  editableTodoId: '',
  addNoteTodoId:'',
  todoList: [],
  total: 0,
  currentTodo: null,
  error: null,
  loading: false,
  showNote: false,
  showModal: false,
  doneTodoCount: 0,
  curPage: 1,
  limit: 5,
};

const todoReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case todoActionTypes.SEND_TODOS_REQUEST:
      return {
        ...state,
        loading: true,
      }
  
    case todoActionTypes.SEND_TODOS_FAILURE:
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
        todoList: state.todoList.filter((todo) => todo._id !== payload),
        loading: false,
      };
    
    case todoActionTypes.SEARCH_TODO_SUCCESS:
      const { title } = payload;
      const filteredList = state.todoList.filter(
        (todo) => todo.title.toLowerCase().includes(title.toLowerCase())
      );

      console.log(`filteredList:`, filteredList)
      return {
        ...state,
        todoList: filteredList,
        loading: false,
      };

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
        showNote: false,
        addNoteTodoId: '',
        loading: false,
      };

    case todoActionTypes.SHOW_NOTE:
      return {
        ...state,
        showNote: true,
        addNoteTodoId: payload,
        loading: false,
      }

    case todoActionTypes.CLOSE_NOTE:
      return {
        ...state,
        showNote: false,
        addNoteTodoId: '',
        loading: false,
      }

    case todoActionTypes.SHOW_ENTRY_MODAL:
      return {
        ...state,
        showModal: true,
        loading: false,
      }

    case todoActionTypes.CLOSE_ENTRY_MODAL:
      return {
        ...state,
        showModal: false,
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
    case todoActionTypes.GET_COMPLETED_TODOS_SUCCESS:
      return {
        ...state,
        doneTodoCount: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default todoReducer;
