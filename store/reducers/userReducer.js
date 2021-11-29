import {
  SET_ISLOGIN,
  SET_ISERROR,
  SET_DATA_USER,
  SET_ISLOADING,
  SET_REGISTER
} from "../actionTypes";

const initialState = {
  isLogin: false,
  isLoading: false,
  dataUser: {},
  isError: null,
  registered: {},
};

function blogReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ISLOGIN:
      return { ...state, isLogin: action.payload };
    case SET_DATA_USER:
      return { ...state, dataUser: action.payload };
    case SET_ISLOADING:
      return { ...state, isLoading: action.payload };
    case SET_ISERROR:
      return { ...state, isError: action.payload };
    case SET_REGISTER:
      return { ...state, registered: action.payload };
    default:
      return state;
  }
}

export default blogReducer;