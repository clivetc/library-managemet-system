import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserById } from "@/services/api/service/getUser";
import { IAdmin } from "@/types/interfaces";
import { getAdminById } from "@/services/api/service/getAdmin";

interface AuthState {
  admin: IAdmin | null;
  isAdminAuthorized: boolean;
  adminLoading: "pending" | "fulfilled" | "rejected" | "idle"; 
  error: string | any; 
}


const adminData = createAsyncThunk("admin-data", async () => {
  const id =localStorage.getItem('id') 
  const response = await getAdminById(id);
  return response;
});

const initialState: AuthState = {
  admin: null,
  isAdminAuthorized: false,
  adminLoading: "idle", 
  error: null,
};

const adminSlice = createSlice({
  name: "authAdmin",
  initialState, 
  reducers: {
    loginAdmin: (state, action: PayloadAction<IAdmin>) => {
      state.admin = action.payload;
      state.isAdminAuthorized = true;
    },
    logoutAdmin: (state) => {
      localStorage.clear();
      state.admin = null;
      state.isAdminAuthorized = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminData.pending, (state) => {
        state.adminLoading = 'pending';
      })
      .addCase(adminData.fulfilled, (state, action) => {
        state.adminLoading = 'fulfilled';
        state.admin = action.payload;
        state.isAdminAuthorized = true;
      })
      .addCase(adminData.rejected, (state, action) => {
        state.adminLoading = 'rejected';
        state.error = action.error.message; 
      });
  },
});

export const { loginAdmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
