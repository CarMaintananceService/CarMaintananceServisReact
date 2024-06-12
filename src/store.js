// src/store.js
// import { createStore } from "redux";
// import rootReducer from "./reducers";

// const store = createStore(
//   rootReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

// export default store;
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer"; // Dosya yolunu doğru şekilde ayarlayın

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
