import { createSlice } from "@reduxjs/toolkit";
import { bleafApi } from "../api/bleafApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const tokenSlice = createSlice({
  name: "tokenSlice",
  initialState: { token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { token } = action.payload;
      state.token = token;
    },
    logOut: (state, action) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      bleafApi.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        const { token } = payload;
        // update local storage with the token
        AsyncStorage.setItem("token", token);
        return token;
      }
    );

    builder.addMatcher(
      bleafApi.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        const { token } = payload;
        // update local storage with the token
        AsyncStorage.setItem("token", token);
        return token;
      }
    );
  },
});
export const { setCredentials, logOut } = tokenSlice.actions;

export default tokenSlice.reducer;
export const selectCurrentToken = (state) => state.tokenSlice.token;
