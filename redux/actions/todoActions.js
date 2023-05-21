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

  EDIT_TODO_REQUEST: 'EDIT_TODO_REQUEST',
  EDIT_TODO_SUCCESS: 'EDIT_TODO_SUCCESS',
  EDIT_TODO_FAILURE: 'EDIT_TODO_FAILURE',

  DELETE_TODO_REQUEST: 'DELETE_TODO_REQUEST',
  DELETE_TODO_SUCCESS: 'DELETE_TODO_SUCCESS',
  DELETE_TODO_FAILURE: 'DELETE_TODO_FAILURE',

  SEARCH_TODO_REQUEST: 'SEARCH_TODO_REQUEST',
  SEARCH_TODO_SUCCESS: 'SEARCH_TODO_SUCCESS',
  SEARCH_TODO_FAILURE: 'SEARCH_TODO_FAILURE',
}
const accessToken = getAccessToken()
export const getAllTodos = () => async(dispatch) => {
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

export const getAllTodosWithFeatures = ( priority = null, status = null, sortBy = null) => async(dispatch) => {
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
        page: 1,
        limit: 10,
        sortBy
      }
    })
    const data = res.data

    dispatch({
      type: todoActionTypes.GET_TODO_FEATURE_SUCCESS,
      payload: data
    })

  }catch(err){
    dispatch({
      type: todoActionTypes.GET_TODO_FEATURE_FAILURE,
      payload: err
    })
  }
}


export const createTodo = (formTodo) => async(dispatch) => {
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
    dispatch(getAllTodos())
  }catch(err){
    dispatch({
      type: todoActionTypes.ADD_TODO_FAILURE,
      payload: err
    })
  }
}

export const editTodo = (id, todo) => async(dispatch) => {
  dispatch({
    type: todoActionTypes.EDIT_TODO_REQUEST
  })
  try{
    await axios.patch(`/api/todos/${id}`, todo, {
      headers: {
        Authorization: accessToken
      },
    })
    dispatch({
      type: todoActionTypes.EDIT_TODO_SUCCESS,
      payload: todo
    })
    dispatch(getAllTodos())
  }catch(err){
    dispatch({
      type: todoActionTypes.EDIT_TODO_FAILURE,
      payload: err
    })
  }
}

export const deleteTodo = (id) => async(dispatch) => {
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
    dispatch(getAllTodos())
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
