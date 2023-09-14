import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserById } from "@/services/api/service/getUser";
import { IUser } from "@/types/interfaces";

interface AuthState {
  user: IUser | null;
  isAuthorized: boolean;
  loading: "pending" | "fulfilled" | "rejected" | "idle"; 
  error: string | any; 
}


const userData = createAsyncThunk("user-data", async () => {
  const userId =localStorage.getItem('userId') 
  const response = await getUserById(userId);
  return response;
});

const initialState: AuthState = {
  user: null,
  isAuthorized: false,
  loading: "idle", 
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState, // Use the declared initialState directly
  reducers: {
    login: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
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
        state.loading = 'pending';
      })
      .addCase(userData.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.user = action.payload;
        state.isAuthorized = true;
      })
      .addCase(userData.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error.message; 
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
