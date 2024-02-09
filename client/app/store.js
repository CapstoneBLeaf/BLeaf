import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { bleafApi } from "../api/bleafApi";
import tokenSliceReducer from "../actions/tokenSlice";

const store = configureStore({
  reducer: {
    [bleafApi.reducerPath]: bleafApi.reducer,
    tokenSlice: tokenSliceReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(bleafApi.middleware);
  },
});

setupListeners(store.dispatch);

export default store;