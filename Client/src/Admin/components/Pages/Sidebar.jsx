import Button from "@mui/material/Button";
import { FaAngleRight, FaProductHunt, FaUser, FaBell } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { MdDashboard, MdCategory } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {  useState } from "react";
import { IoMdLogOut } from "react-icons/io";
/* import { AdminProvider } from "../../context/AdminContext"; */
import { GrContact } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { adminLogoutFetchApi } from "../../../User/redux/Admin/AdminThunk";
import { toast } from "react-toastify";

export default function SidebarComponent() {

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [activeTab, setActiveTab] = useState(0);
  const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);

  const isOpenSubMenu = (index) => {
    setActiveTab(index);
    setIsToggleSubmenu(activeTab === index ? !isToggleSubmenu : true);
  };


  const adminLogout=()=>{
    dispatch(adminLogoutFetchApi({toast,navigate,dispatch}))
  }


  return (
    <>
      <div className="sidebar">
        <ul>
          <li>
            <Link>
              <Button className="w-100">
                <span className="icon">
                  <MdDashboard />
                </span>
                Dashboard
              </Button>
            </Link>
          </li>
          <li>
            <NavLink to={"/admin/allUsers"}>
              <Button className="w-100">
                <span className="icon">
                  <FaUser />
                </span>
                Users
              </Button>
            </NavLink>
          </li>
          <li>
            <Button
              className={`w-100 ${
                activeTab === 2 && isToggleSubmenu === true ? "active" : ""
              }`}
              onClick={() => isOpenSubMenu(2)}
            >
              <span className="icon">
                <MdCategory />
              </span>
              Categories
              <span className="arrow">
                <FaAngleRight />
              </span>
            </Button>

            <div
              className={`submenuWrapper ${
                activeTab === 2 && isToggleSubmenu ? "colapse" : "colapsed"
              }`}
            >
              <ul className="submenu">
                <li>
                  <NavLink to={"/admin/category/list"}>Category Manage</NavLink>
                </li>

                <li>
                  <NavLink to={"/admin/category"}>Category Add</NavLink>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <Button
              className={`w-100 ${
                activeTab === 3 && isToggleSubmenu === true ? "active" : ""
              }`}
              onClick={() => isOpenSubMenu(3)}
            >
              <span className="icon">
                <FaProductHunt />
              </span>
              Products
              <span className="arrow">
                <FaAngleRight />
              </span>
            </Button>

            <div
              className={`submenuWrapper ${
                activeTab === 3 && isToggleSubmenu ? "colapse" : "colapsed"
              }`}
            >
              <ul className="submenu">
                <li>
                  <NavLink to={"/admin/productManage"}>Product Manage</NavLink>
                </li>

                <li>
                  <NavLink to={"/admin/addproducts"}>Product Add</NavLink>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <NavLink to={"/admin/allOrders1"}>
              <Button className="w-100">
                <span className="icon">
                  <FaShoppingCart />
                </span>
                Orders
              </Button>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/contact-messages"}>
              <Button className="w-100">
                <span className="icon">
                  <GrContact />
                </span>
                Contact Messages
              </Button>
            </NavLink>
          </li>
        
        </ul>

        <br />
        <div className="logoutWrapper">
          <div className="logoutBox">
            <Button variant="contained" onClick={adminLogout}>
              <IoMdLogOut />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
