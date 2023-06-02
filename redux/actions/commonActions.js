'use client'
export const commonActionTypes = {
  SHOW_ALERT: 'SHOW_ALERT',
  HIDE_ALERT: 'HIDE_ALERT',
}

export const clearAlert = () => async(dispatch) => {
  setTimeout(() =>
    dispatch({
      type: commonActionTypes.HIDE_ALERT,
    })
  , 3000)
}
export const displayAlert = ({alertText, alertType}) => async(dispatch) => {
  dispatch({
    type: commonActionTypes.SHOW_ALERT,
    payload: {
      alertText,
      alertType
    }
  })
  dispatch(clearAlert())
}

