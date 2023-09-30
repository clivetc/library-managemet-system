import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAdmin } from "@/types/interfaces";
import { getAdminById } from "@/services/api/service/getAdmin";
import { getLocalStorage } from "@/utils/storage";

const isAdminAuthorized = () => {
  const adminId = getLocalStorage("adminId");
  const accessToken = getLocalStorage("accessToken");
  return !!accessToken && !!adminId;
};

const adminData = createAsyncThunk("user-data", async () => {
  try {
    const adminId = localStorage.getItem("adminId");
    if (adminId === null) {
      return;
    }

    const response = await getAdminById(adminId);
    return response.admin;
  } catch (error) {
    throw error; // Rethrow the error to be caught by .rejected
  }
});

const initialState = {
  adminUser: null as IAdmin | null,
  isAdminAuthorized: isAdminAuthorized(),
  loading: "idle",
  error: null as string | null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAdmin: (state) => {
      state.isAdminAuthorized = true;
    },
    logoutAdmin: (state) => {
      localStorage.clear();
      state.adminUser = null;
      state.isAdminAuthorized = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminData.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(adminData.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.adminUser = action.payload;
        state.isAdminAuthorized = true;
      })
      .addCase(adminData.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message || null;
      });
  },
});

export const { loginAdmin, logoutAdmin } = authSlice.actions;

export const adminAsyncActions = { adminData };
export default authSlice.reducer;
