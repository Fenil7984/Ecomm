/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */


import { createContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
/* import { adminLogoutFetchApi, VerifyAdminFetchApi } from '../User/redux/Admin/AdminThunk';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; */
// import { useDispatch } from 'react-redux';
// import { VerifyAdminFetchApi } from '../../redux/admin/AdminThunk';
// import { getAllCategories2 } from '../../redux/user/UserThunk';

export const GlobelProvider = createContext();

export default function GlobelContext({ children }) {
 // const dispatch = useDispatch();
  const [isToggleSidebar, setisToggleSidebar] = useState(false);
  //const navigate = useNavigate();/*  */

 /*  const adminLogout = () => {
    dispatch(adminLogoutFetchApi({ dispatch, navigate, toast }));
  };
 */
 /*  useEffect(() => {
    alert(isToggleSidebar)
  }, [isToggleSidebar]);


  useEffect(() => {
    dispatch(VerifyAdminFetchApi());
  }, [dispatch]); */
  return (
    <GlobelProvider.Provider
      value={{
        isToggleSidebar,
        setisToggleSidebar,
       
      }}
    >
      {children}
    </GlobelProvider.Provider>
  );
}
