import { entryActionTypes } from "@/redux/actions/entryActions";

const initialState = {
  isLoading: false,
  user: null,
  error: null,
};

const entryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case entryActionTypes.ENTRY_REQUEST:
      return {
        ...state,
        isLoading: false
      }
    case entryActionTypes.REGISTER_SUCCESS:
      console.log('REGISTER_SUCCESS Reducer user:', payload)
      return {
        ...state,
        user: payload,
        isLoading: true
      }
    case entryActionTypes.ENTRY_FAILURE:
      return {
        ...state,
        error: payload,
        isLoading: true
      }
    default:
      return state;
  }
};

export default entryReducer;