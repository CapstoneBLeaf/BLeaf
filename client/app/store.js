
import { configureStore } from "@reduxjs/toolkit";
import { bleafApi } from "../api/bleafApi";

export const store = configureStore({

  reducer: { [bleafApi.reducerPath]: bleafApi.reducer 

  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bleafApi.middleware) 
});


