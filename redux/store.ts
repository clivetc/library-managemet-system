// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import adminReducer from './adminAuthReducer'

const store = configureStore({
  reducer: {
    auth: authReducer,
    admin:adminReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
