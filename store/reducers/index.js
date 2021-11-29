import { combineReducers } from "redux";
import BlogReducer from "./blogReducer";
import UserReducer from "./userReducer";

const reducers = combineReducers({
  BlogReducer,UserReducer
});

export default reducers;