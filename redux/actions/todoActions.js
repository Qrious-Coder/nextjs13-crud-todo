'use client'
import axios from 'axios'
import { getSession } from 'next-auth/react';
export const todoActionTypes = {
  GET_TODO_REQUEST: 'GET_TODO_REQUEST',
  GET_TODO_SUCCESS: 'GET_TODO_SUCCESS',
  GET_TODO_FAILURE: 'GET_TODO_FAILURE',

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

export const getAllTodos = () => async(dispatch) => {
  dispatch({
    type: todoActionTypes.GET_TODO_REQUEST
  })
  try{
    const { data: session } = useSession();
    console.log(`sess:`, session)
    const token = session?.user.token;

    const res = await axios.get('/api/todos', {
      headers: {
        Authorization: `Bearer ${token}`
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

export const createTodo = (formTodo) => async(dispatch) => {
  dispatch({ type: todoActionTypes.ADD_TODO_REQUEST })
  try{
    const session = await getSession();
    const token = session?.accessToken;
    const res = await axios.post(`/api/todos/new`, formTodo, {
      headers: {
        Authorization: `Bearer ${token}`
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
    const session = await getSession();
    const token = session?.accessToken;
    await axios.patch(`/api/todos/${id}`, todo, {
      headers: {
        Authorization: `Bearer ${token}`,
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
    const session = await getSession();
    const token = session?.accessToken;
    await axios.delete(`/api/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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
