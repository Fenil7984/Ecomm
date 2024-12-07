import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./User/UserSlice";
import adminSlice from "./Admin/AdminSlice";

export const Store=configureStore({
    reducer:{
        user : UserSlice,
        admin: adminSlice
    }
})