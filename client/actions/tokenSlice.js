import { createSlice } from "@reduxjs/toolkit";
import { bleafApi } from "../api/bleafApi";
import { setItem, getItem } from "../utils/asyncStorage";
console.log(getItem("token"));
const initialState = {
  token: getItem("token") === null ? "" : JSON.parse(getItem("token")),
};
const tokenSlice = createSlice({
  name: "tokenSlice",
  initialState,
  reducers: {
    updateToken: (state, { payload }) => {
      state.token = payload;
      setItem("token", JSON.stringify(state.token));
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      bleafApi.endpoints.createUsers.matchFulfilled,
      (state, { payload }) => {
        state.token = payload;
        // update local storage with the token
        setItem("token", JSON.stringify(state.token));
      }
    );

    builder.addMatcher(
      bleafApi.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        state.token = payload;
        // update local storage with the token
        setItem("token", JSON.stringify(state.token));
      }
    );
  },
});
export const { updateToken } = tokenSlice.actions;

export const selectToken = (state) => state.token;

export default tokenSlice.reducer;
