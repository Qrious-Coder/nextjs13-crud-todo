export const todoActionTypes = {
  GET_TODO_REQUEST = 'GET_TODO_REQUEST',
  GET_TODO_SUCCESS = 'GET_TODO_SUCCESS',
  GET_TODO_FAILURE = 'GET_TODO_FAILURE',

  EDIT_TODO_REQUEST = 'EDIT_TODO_REQUEST',
  EDIT_TODO_SUCCESS = 'EDIT_TODO_SUCCESS',
  EDIT_TODO_FAILURE = 'EDIT_TODO_FAILURE'
}

export const getAllTodos = () => async(dispatch) => {
  try{
    const res = await axios.get('/api/todos')
    const data = res.data
    dispatch({
      type: todoActionTypes.GET_TODO_SUCCESS,
      payload: data
    })

  }catch(err){
    dispatch({
      type: todoActionTypes.GET_TODO_FAILURE,
      payload: err
    })
  }
}

export const editTodo = (id, todo) => async(dispatch) => {
  try{
    await axios.patch(`/api/todos/${id}`, todo)
    dispatch({
      type: todoActionTypes.EDIT_TODO_SUCCESS,
      payload: data
    })

  }catch(err){
    dispatch({
      type: todoActionTypes.EDIT_TODO_FAILURE,
      payload: err
    })
  }
}