import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slice/usersSlice.js";

const store = configureStore({
  reducer: {
    users: usersReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
});

// console.log("oncreate store : ", store.getState());

// store.subscribe(() => {
//   console.log("STORE CHANGE :", store.getState());
// });

export default store;