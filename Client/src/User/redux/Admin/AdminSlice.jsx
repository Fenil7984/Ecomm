/* eslint-disable react-refresh/only-export-components */
import {createSlice}  from "@reduxjs/toolkit";
import { adminLogoutFetchApi, Loginadmin, VerifyAdminFetchApi } from "./AdminThunk";
/* import { AdminLoginFetchApi, VerifyAdminFetchApi } from "./AdminThunk";
 */
const initialState={
    loading: false,
    error: null,
    process: false,
    adminData: null,
    message: "",
    isAdmin: false,
  
}
    


const adminSlice=createSlice({
    name:'adminSlice',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
     builder
     
     .addCase(Loginadmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(Loginadmin.fulfilled, (state, action) => {
        const { message, data, process } = action.payload;
        state.message = message;
        state.adminData = data; // Data will now be set correctly
        state.process = process;
        state.loading = false;
      })
      .addCase(Loginadmin.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Login failed";
        state.process = false;
      })
      .addCase(VerifyAdminFetchApi.pending, (state) => {
        state.loading = true;
        state.message = "pending";
      })
      .addCase(VerifyAdminFetchApi.fulfilled, (state, action) => {
        state.adminData = action.payload;
        state.isAdmin = action.payload.process;  // Ensure process is set to true or false properly
        state.message = "Verification successful";
        state.loading = false;
    })
    

      .addCase(VerifyAdminFetchApi.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Verification failed";
      })

      .addCase(adminLogoutFetchApi.pending, (state) => {
        state.loading = true;
      })

      .addCase(adminLogoutFetchApi.fulfilled, (state) => {
        state.loading = false;
        state.adminData = null;

      })
     
    }

})

export default adminSlice.reducer