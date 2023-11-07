import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAdmin } from "@/types/interfaces";
import { getAdminById } from "@/services/api/service/getAdmin";

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

const isAuthenticated = () => {
  if (typeof document === "undefined") {
    return false;
  }

  const userId = localStorage.getItem("userId");
  const accessToken = localStorage.getItem("accessToken");

  return !!userId && !!accessToken;
};

const initialState = {
  adminUser: null as IAdmin | null,
  isAdminAuthorized: isAuthenticated(),
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
