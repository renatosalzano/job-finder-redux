import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { themuseApi } from "../service/themuseAPI";
import apiSlice from "./apiSlice";
import jobSlice from "./jobSlice";

export const store = configureStore({
  reducer: {
    request: apiSlice,
    job: jobSlice,
    [themuseApi.reducerPath]: themuseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(themuseApi.middleware),
});

/* setupListeners(store.dispatch); */

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
