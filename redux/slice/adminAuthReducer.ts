import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserById } from "@/services/api/service/getUser";
import { IAdmin } from "@/types/interfaces";
import { getAdminById } from "@/services/api/service/getAdmin";

const adminData = createAsyncThunk("admin-data", async () => {
  try {
    const id = localStorage.getItem("adminId");
    if (id === null) {
      return;
    }
    const response = await getAdminById(id);
    return response;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  user: null as IAdmin | null,
  isAdminAuthorized: false,
  adminLoading: "idle",
  error: null as string | null,
};

const adminSlice = createSlice({
  name: "authAdmin",
  initialState,
  reducers: {
    loginAdmin: (state) => {
      state.isAdminAuthorized = true;
    },
    logoutAdmin: (state) => {
      localStorage.clear();
      state.user = null;
      state.isAdminAuthorized = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminData.pending, (state) => {
        state.adminLoading = "pending";
      })
      .addCase(adminData.fulfilled, (state, action) => {
        state.adminLoading = "fulfilled";
        state.user = action.payload;
        state.isAdminAuthorized = true;
      })
      .addCase(adminData.rejected, (state, action) => {
        state.adminLoading = "rejected";
        state.error = action.error.message || null;
      });
  },
});

export const { loginAdmin, logoutAdmin } = adminSlice.actions;
export const adminAsyncActions = { adminData };

export default adminSlice.reducer;
