import axios from 'axios';
import {signIn } from 'next-auth/react';
import { displayAlert } from "@/redux/actions/commonActions";

export const entryActionTypes = {
  ENTRY_REQUEST: 'ENTRY_REQUEST',

  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',

  ENTRY_FAILURE: 'ENTRY_FAILURE',
}

export const register = ({ name, email, password }) => async(dispatch) => {
  const userInfo = { name, email, password }
    dispatch({
    type: entryActionTypes.ENTRY_REQUEST
  })

  try{
    const res = await axios.post('/api/auth/register', userInfo)
    console.log(`@ ===> /api/auth/register ==>res.data`, res)
    const data = res?.data
    dispatch({
      type: entryActionTypes.REGISTER_SUCCESS,
      payload: data,
    })

    dispatch(displayAlert({
      alertText: 'Registered Successfully',
      alertType: 'success'
    }))
    return data;
  }catch(err){
    dispatch({
      type: entryActionTypes.ENTRY_FAILURE,
    })
    console.log(`@ ===> /api/auth/register ==>err:`, err )
    dispatch(displayAlert({
      alertText: err?.response.data.error,
      alertType: 'error'
    }))
    return null;
  }
}

export const login = ({ email, password }) => async(dispatch) => {
  dispatch({
    type: entryActionTypes.ENTRY_REQUEST
  })
  try{
    await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    dispatch(displayAlert({
      alertText: 'Signed in successfully!',
      alertType: 'success'
    }))
  } catch(err) {
    dispatch({
      type: entryActionTypes.ENTRY_FAILURE,
    })
    dispatch(displayAlert({
      alertText: err?.response.data.error,
      alertType: 'error'
    }))
  }
}

