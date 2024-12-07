/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogoutFetchApi, VerifyAdminFetchApi } from "../../User/redux/Admin/AdminThunk";
import { toast } from "react-toastify";
/* import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; */

export const AdminProvider=createContext()

export default function AdminContext({children}) {


    const dispatch = useDispatch();
  const [isToggleSidebar, setisToggleSidebar] = useState(false);
  const navigate = useNavigate();


  const adminLogout=()=>{
    dispatch(adminLogoutFetchApi({ navigate, toast,dispatch }))
  }

  useEffect(() => {
    // alert(isToggleSidebar)
  }, [isToggleSidebar]);

  useEffect(()=>{
    dispatch(VerifyAdminFetchApi())
  },[dispatch])
 
    return(
        <>
        <AdminProvider.Provider 
        value={{
            isToggleSidebar,
            setisToggleSidebar,
            adminLogout
        }}
        
        >
            {children}
        </AdminProvider.Provider>
        
        </>
    )
}