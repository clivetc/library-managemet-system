import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserById } from "@/services/api/service/getUser";
import { IUser } from "@/types/interfaces";
import { getLocalStorage } from "@/utils/storage";

const userData = createAsyncThunk("user-data", async () => {
  try {
    const userId = localStorage.getItem("userId");
    if (userId === null) {
      return;
    }

    const response = await getUserById(userId);
    return response.user;
  } catch (error) {
    throw error; // Rethrow the error to be caught by .rejected
  }
});

const userId = getLocalStorage("userId");
const accessToken = getLocalStorage("accessToken");

const initialState = {
  user: null as IUser | null,
  isAuthorized: !!userId && !!accessToken,
  loading: "idle",
  error: null as string | null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthorized = true;
    },
    logout: (state) => {
      localStorage.clear();
      state.user = null;
      state.isAuthorized = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userData.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(userData.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.user = action.payload;
        state.isAuthorized = true;
      })
      .addCase(userData.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message || null;
      });
  },
});

export const { login, logout } = authSlice.actions;

export const userAsyncActions = { userData };
export default authSlice.reducer;
