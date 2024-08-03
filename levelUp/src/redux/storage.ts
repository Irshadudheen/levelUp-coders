import { configureStore } from "@reduxjs/toolkit";
import {persistReducer,persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./userSlice"; 

const persistConfig = {
    key: "root",
    version:1,
    storage,
  };
  const persistedReducer = persistReducer(persistConfig, userReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);