import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instancePublic from "../../axios/axiosPublic.js";
import { jwtDecode } from 'jwt-decode';

const usersSlice = createSlice({
  name: "users",
  initialState: {
    id: "",
    name: "",
    email: "",
    accessToken: "",
    dataAllUsers: [],
  },
  reducers: {
    addAuthUsers: (state, action) => {
      const decoded = jwtDecode(action.payload.accessToken);
      
      state.id = decoded.userId;
      state.name = decoded.name;
      state.email = decoded.email;
      state.accessToken = action.payload.accessToken;
      // state.userInfo = { ...state.userInfo, ...dataAuthUser }
    },
    addAllUsers: (state, action) => {
      state.dataAllUsers = action.payload.data;
    }

  }
});

export const { addAuthUsers, addAllUsers } = usersSlice.actions;
export default usersSlice.reducer;