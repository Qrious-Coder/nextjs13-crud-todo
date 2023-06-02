import { commonActionTypes } from "@/redux/actions/commonActions";

const initialState = {
  showAlert: false,
  alertText: '',
  alertType: '',

};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case commonActionTypes.SHOW_ALERT:
      const { alertText, alertType } = action.payload
      return {
        ...state,
        showAlert: true,
        alertText: alertText,
        alertType: alertType
      }
    case commonActionTypes.HIDE_ALERT:
      return {
        ...state,
        showAlert: false,
        alertText: '',
        alertType: ''
      }
    default:
      return state;
  }
};

export default commonReducer;