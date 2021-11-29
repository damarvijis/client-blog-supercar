import {
  SET_BLOGS,
  SET_ISERROR,
  SET_ISLOADING,
  SET_BLOG_ID,
  SET_MYBLOG
} from "../actionTypes";

const initialState = {
  dataBlogs: [],
  myBlogs: [],
  isLoading: false,
  isError: null,
  dataBlogById: {},
};

function blogReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BLOGS:
      return { ...state, dataBlogs: action.payload };
    case SET_MYBLOG:
      return { ...state, myBlogs: action.payload };
    case SET_ISLOADING:
      return { ...state, isLoading: action.payload };
    case SET_ISERROR:
      return { ...state, isError: action.payload };
    case SET_BLOG_ID:
      return { ...state, dataBlogById: action.payload };
    default:
      return state;
  }
}

export default blogReducer;