import { Outlet } from "react-router-dom";
/* import AdminNavigation from "./modules/AdminNav"; */
import "./AdminApp.css";
// import AdminContext, { AdminProvider } from "./context/AdminContext";
/* import AdminLogin from "./components/AdminLogin"; */
import { useSelector } from "react-redux";
import { useContext } from "react";
/* import { GlobelProvider } from "../context/globelContext"; */
/* import AdminContext from "./context/AdminContext"; */
import SidebarComponent from "./components/Pages/Sidebar";
import AdminLogin from "./components/AdminLogin";
import { GlobelProvider } from "../context/globelContext";
import AdminNavigation from "./Modules/AdminNavigation";

export default function AdminIndex() {
  const { loading, isAdmin } = useSelector((state) => state.admin);
  const { isToggleSidebar } = useContext(GlobelProvider);
  return (
    <>
      <div className="bg_Color">
    
          {loading ? (
            <div className="main_spinner">
              <div className="spinner-border text-primary spinner_grow"></div>
            </div>
          ) : isAdmin ? (
            <>
              <AdminNavigation />

              <div className="main d-flex">
                <div
                  className={`sidebarWrapper ${
                    isToggleSidebar ? "toggle" : ""
                  } `}
                >
                  <SidebarComponent />
                </div>
                <div className={`content ${isToggleSidebar ? "toggle" : ""}`}>
                  <Outlet />
                </div>
              </div>
            </>
          ) : (
            <AdminLogin />
          )}
     
      </div>
    </>
  );
}
