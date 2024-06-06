// src/reducers/index.js
import { combineReducers } from "redux";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  // diğer reducer'larınızı buraya ekleyin
});

export default rootReducer;
