'use client'
import axios from 'axios'
import { getAccessToken } from "@/utils/token";

export const todoActionTypes = {
  SEND_TODOS_REQUEST: 'SEND_TODOS_REQUEST',
  SEND_TODOS_FAILURE: 'SEND_TODOS_FAILURE',

  GET_TODOS_SUCCESS: 'GET_TODOS_SUCCESS',

  GET_TODOS_FEATURE_SUCCESS: 'GET_TODOS_FEATURE_SUCCESS',

  ADD_TODO_SUCCESS: 'ADD_TODO_SUCCESS',

  SET_TODO_EDITABLE: 'SET_TODO_EDITABLE',

  EDIT_TODO_SUCCESS: 'EDIT_TODO_SUCCESS',

  DELETE_TODO_SUCCESS: 'DELETE_TODO_SUCCESS',

  SEARCH_TODO_SUCCESS: 'SEARCH_TODO_SUCCESS',

  ADD_NOTE_SUCCESS: 'ADD_NOTE_SUCCESS',

  SHOW_NOTE: 'SHOW_NOTE',
  CLOSE_NOTE: 'CLOSE_NOTE',

  SHOW_ENTRY_MODAL: 'SHOW_ENTRY_MODAL',
  CLOSE_ENTRY_MODAL: 'CLOSE_ENTRY_MODAL',

  SAVE_CURRENT_PAGE: 'SAVE_CURRENT_PAGE',
  SAVE_CURRENT_LIMIT: 'SAVE_CURRENT_LIMIT',

  GET_TODO_BY_ID_SUCCESS: 'GET_TODO_BY_ID_SUCCESS',

  GET_COMPLETED_TODOS_SUCCESS: 'GET_COMPLETED_TODOS_SUCCESS',
}

export const getDemoTodos = (page = 1, limit = 5) => async(dispatch) => {
  dispatch({ type: todoActionTypes.SEND_TODOS_REQUEST});
  try{
    const res = await axios.get('/api/todos', {
      params: {
        page,
        limit,
      }
    })
    const { todos, totalCount } = res.data
    dispatch({
      type: todoActionTypes.GET_TODOS_SUCCESS,
      payload: { todos, totalCount }
    })
  } catch(err) {
    dispatch({
      type: todoActionTypes.SEND_TODOS_FAILURE,
      payload: err
    })
  }
}

export const getAllTodosWithFeatures = ( priority = null, status = null, sortBy = null, page = 1, limit = 5) => async(dispatch) => {
  const accessToken = getAccessToken()
  dispatch({
    type: todoActionTypes.SEND_TODOS_REQUEST
  })
  try{
    const res = await axios.get('/api/todos', {
      headers: {
        Authorization: accessToken
      },
      params: {
        priority,
        status,
        page,
        limit,
        sortBy
      }
    })
    const { todos, totalCount } = res.data

    //Pagination
    dispatch(saveCurLimit(page))
    dispatch(saveCurPage(limit))

    dispatch({
      type: todoActionTypes.GET_TODOS_FEATURE_SUCCESS,
      payload: { todos, totalCount }
    })

  }catch(err){
    dispatch({
      type: todoActionTypes.SEND_TODOS_FAILURE,
      payload: err
    })
  }
}

export const getCompletedTodosCount = () => async(dispatch) => {
  const accessToken = getAccessToken()
  dispatch({ type: todoActionTypes.SEND_TODOS_REQUEST })
  try{
    const res = await axios.get(`/api/todos/completed/count`, {
      headers: {
        Authorization: accessToken
      }
    })
    const { doneTodoCount } = res.data
    dispatch({
      type: todoActionTypes.GET_COMPLETED_TODOS_SUCCESS,
      payload: doneTodoCount
    })
  }catch(err){
    dispatch({
      type: todoActionTypes.SEND_TODOS_FAILURE,
      payload: err
    })
  }
}

export const createTodo = (formTodo) => async(dispatch) => {
  const accessToken = getAccessToken()
  dispatch({ type: todoActionTypes.SEND_TODOS_REQUEST })
  try{
    const res = await axios.post(`/api/todos/new`, formTodo, {
      headers: {
        Authorization: accessToken
      }
    })
    const data = res.data
    dispatch({
      type: todoActionTypes.ADD_TODO_SUCCESS,
      payload: data
    })
    dispatch(getAllTodosWithFeatures())
  }catch(err){
    dispatch({
      type: todoActionTypes.SEND_TODOS_FAILURE,
      payload: err
    })
  }
}

export const setEditableTodo = (id) => async(dispatch) => {
  dispatch({ 
    type: todoActionTypes.SET_TODO_EDITABLE,
    payload: id
  })
}

export const editTodo = (id, todo) => async(dispatch) => {
  const accessToken = getAccessToken()
  dispatch({
    type: todoActionTypes.SEND_TODOS_REQUEST
  })
  try{
    const res = await axios.patch(`/api/todos/${id}`, todo, {
      headers: {
        Authorization: accessToken
      },
    })

    const updatedTodo = res.data
    dispatch({
      type: todoActionTypes.EDIT_TODO_SUCCESS,
      payload: updatedTodo
    })
    dispatch(getAllTodosWithFeatures())
    dispatch(getCompletedTodosCount())
  }catch(err){
    dispatch({
      type: todoActionTypes.SEND_TODOS_FAILURE,
      payload: err
    })
  }
}

export const deleteTodo = (id) => async(dispatch) => {
  const accessToken = getAccessToken()
  dispatch({
    type: todoActionTypes.SEND_TODOS_REQUEST
  })
  try{
    await axios.delete(`/api/todos/${id}`, {
      headers: {
        Authorization: accessToken
      },
    })
    dispatch({
      type: todoActionTypes.DELETE_TODO_SUCCESS,
      payload: id
    })
    dispatch(getAllTodosWithFeatures())
  }catch(err){
    dispatch({
      type: todoActionTypes.SEND_TODOS_FAILURE,
      payload: err
    })
  }
}

export const searchTodo = (title) => async (dispatch) => {
  dispatch({ type: todoActionTypes.SEARCH_TODO_SUCCESS, payload: { title } });
};

export const addNote = (id, note) => async(dispatch) => {
  const accessToken = getAccessToken()
  dispatch({
    type: todoActionTypes.SEND_TODOS_REQUEST
  })
  try{
    const res = await axios.patch(`/api/todos/${id}`, JSON.stringify({ note }), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      },
    })

    const updatedTodo = res.data
    dispatch({
      type: todoActionTypes.ADD_NOTE_SUCCESS,
      payload: updatedTodo
    })
    dispatch(getAllTodosWithFeatures())

  }catch(err){
    dispatch({
      type: todoActionTypes.SEND_TODOS_FAILURE,
      payload: err
    })
  }
}

export const openNote = (id) => (dispatch) => {
  dispatch({
    type: todoActionTypes.SHOW_NOTE,
    payload: id
  })
}

export const closeNote = () => {
  return{
    type: todoActionTypes.CLOSE_NOTE
  }
}

export const openEntryModal = () => async(dispatch) => {
  dispatch({
    type: todoActionTypes.SHOW_ENTRY_MODAL
  })
}

export const closeEntryModal = () => {
  return{
    type: todoActionTypes.CLOSE_ENTRY_MODAL
  }
}
export const saveCurPage = (curPage) => async(dispatch) => {
  dispatch({
    type: todoActionTypes.SAVE_CURRENT_PAGE,
    payload: curPage
  })
}

export const saveCurLimit = (limit) => async(dispatch) => {
  dispatch({
    type: todoActionTypes.SAVE_CURRENT_LIMIT,
    payload: limit
  })
}

export const getTodoById = (id) => async(dispatch) => {
  const accessToken = getAccessToken()
  dispatch({
    type: todoActionTypes.SEND_TODOS_REQUEST
  })
  try{
    const res = await axios.get(`/api/todos/${id}`, {
      headers: {
        Authorization: accessToken
      }
    })
    const todo = res.data
    dispatch({
      type: todoActionTypes.GET_TODO_BY_ID_SUCCESS,
      payload: todo
    })

  }catch(err){
    dispatch({
      type: todoActionTypes.SEND_TODOS_FAILURE,
      payload: err
    })
  }
}
