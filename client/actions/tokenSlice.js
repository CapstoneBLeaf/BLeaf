import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
const initialState = {
  user:
    AsyncStorage.getItem("user") === null ? "" : AsyncStorage.getItem("user"),
  token:
    AsyncStorage.getItem("token") === null ? "" : AsyncStorage.getItem("token"),
};
const tokenSlice = createSlice({
  name: "tokenSlice",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      AsyncStorage.setItem("user", JSON.stringify(state.user));
    },
    setToken: (state, action) => {
      const { token } = action.payload;
      state.token = token;
      sessionStorage.setItem("token", JSON.stringify(state.token));
    },
    logOut: (state) => {
      state.token = null;
      state.user = null;
      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("user");
    },
  },
});
export const { setCredentials, logOut, setToken } = tokenSlice.actions;

export default tokenSlice.reducer;
export const selectCurrentToken = (state) => state.tokenSlice.token;
export const selectCurrentUser = (state) => state.tokenSlice.user;
