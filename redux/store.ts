// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authReducer";
import adminReducer from "./slice/adminAuthReducer";

const store = configureStore({
  devTools: true,
  reducer: {
    auth: authReducer,
    admin: adminReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
