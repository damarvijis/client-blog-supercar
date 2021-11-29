import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers/index";
import { createWrapper } from "next-redux-wrapper"

const initStore = () => {
  return createStore(reducers, applyMiddleware(thunk));
}

export const wrapper = createWrapper(initStore);
