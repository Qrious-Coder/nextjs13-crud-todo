'use client'
import axios from 'axios'
import { getAccessToken } from "@/utils/token";

export const todoActionTypes = {
  GET_TODO_REQUEST: 'GET_TODO_REQUEST',
  GET_TODO_SUCCESS: 'GET_TODO_SUCCESS',
  GET_TODO_FAILURE: 'GET_TODO_FAILURE',

  GET_TODO_FEATURE_REQUEST: 'GET_TODO_FEATURE_REQUEST',
  GET_TODO_FEATURE_SUCCESS: 'GET_TODO_FEATURE_SUCCESS',
  GET_TODO_FEATURE_FAILURE: 'GET_TODO_FEATURE_FAILURE',

  ADD_TODO_REQUEST: 'ADD_TODO_REQUEST',
  ADD_TODO_SUCCESS: 'ADD_TODO_SUCCESS',
  ADD_TODO_FAILURE: 'ADD_TODO_FAILURE',

  SET_TODO_EDITABLE: 'SET_TODO_EDITABLE',
  EDIT_TODO_REQUEST: 'EDIT_TODO_REQUEST',
  EDIT_TODO_SUCCESS: 'EDIT_TODO_SUCCESS',
  EDIT_TODO_FAILURE: 'EDIT_TODO_FAILURE',

  DELETE_TODO_REQUEST: 'DELETE_TODO_REQUEST',
  DELETE_TODO_SUCCESS: 'DELETE_TODO_SUCCESS',
  DELETE_TODO_FAILURE: 'DELETE_TODO_FAILURE',

  SEARCH_TODO_REQUEST: 'SEARCH_TODO_REQUEST',
  SEARCH_TODO_SUCCESS: 'SEARCH_TODO_SUCCESS',
  SEARCH_TODO_FAILURE: 'SEARCH_TODO_FAILURE',

  ADD_NOTE_REQUEST: 'ADD_NOTE_REQUEST',
  ADD_NOTE_SUCCESS: 'ADD_NOTE_SUCCESS',
  ADD_NOTE_FAILURE: 'ADD_NOTE_FAILURE',


  SHOW_MODAL: 'SHOW_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',

  SAVE_CURRENT_PAGE: 'SAVE_CURRENT_PAGE',
  SAVE_CURRENT_LIMIT: 'SAVE_CURRENT_LIMIT'
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

export const getAllTodos = () => async(dispatch) => {
  const accessToken = getAccessToken()
  dispatch({
    type: todoActionTypes.GET_TODO_REQUEST
  })
  try{
    const res = await axios.get('/api/todos', {
      headers: {
        Authorization: accessToken
      }
    })
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

export const getAllTodosWithFeatures = ( priority = null, status = null, sortBy = null, page = 1, limit = 5) => async(dispatch) => {
  const accessToken = getAccessToken()
  dispatch({
    type: todoActionTypes.GET_TODO_FEATURE_REQUEST
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
      type: todoActionTypes.GET_TODO_FEATURE_SUCCESS,
      payload: { todos, totalCount }
    })

  }catch(err){
    dispatch({
      type: todoActionTypes.GET_TODO_FEATURE_FAILURE,
      payload: err
    })
  }
}

export const createTodo = (formTodo) => async(dispatch) => {
  const accessToken = getAccessToken()
  dispatch({ type: todoActionTypes.ADD_TODO_REQUEST })
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
      type: todoActionTypes.ADD_TODO_FAILURE,
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
    type: todoActionTypes.EDIT_TODO_REQUEST
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
  }catch(err){
    dispatch({
      type: todoActionTypes.EDIT_TODO_FAILURE,
      payload: err
    })
  }
}

export const deleteTodo = (id) => async(dispatch) => {
  const accessToken = getAccessToken()
  dispatch({
    type: todoActionTypes.DELETE_TODO_REQUEST
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
      type: todoActionTypes.DELETE_TODO_FAILURE,
      payload: err
    })
  }
}

export const searchTodo = (title) => async (dispatch) => {
  dispatch({ type: todoActionTypes.SEARCH_TODO_REQUEST });
  try {
    dispatch({ type: todoActionTypes.SEARCH_TODO_SUCCESS, payload: { title } });
  } catch (err) {
    dispatch({ type: todoActionTypes.SEARCH_TODO_FAILURE, payload: err });
  }
};

export const addNote = (id, note) => async(dispatch) => {
  const accessToken = getAccessToken()
  dispatch({
    type: todoActionTypes.ADD_NOTE_REQUEST
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
      type: todoActionTypes.ADD_NOTE_FAILURE,
      payload: err
    })
  }
}

export const openModal = (id) => async(dispatch) => {
  dispatch({
    type: todoActionTypes.SHOW_MODAL,
    payload: id
  })
}

