import { useContext, useState } from 'react';
import { Button, ListItem } from '@mui/material';
import { MdEmail, MdMenuOpen, MdOutlineLightMode, MdOutlineMenu } from 'react-icons/md';
import { IoIosCart, IoIosNotifications } from 'react-icons/io';
import { Menu, MenuItem, Divider } from '@mui/material';
import { IoShieldHalfSharp } from 'react-icons/io5';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';
import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import SearchBox from '../components/Search/SerchBox';
import { GlobelProvider } from '../../context/globelContext';
import { useDispatch, useSelector } from 'react-redux';
import AdminAvtarImg from '../AdminAvatarImg';
import { toast } from 'react-toastify';
import { adminLogoutFetchApi } from '../../User/redux/Admin/AdminThunk';
/* import { AdminProvider } from '../context/AdminContext'; */
/* import { GlobelProvider } from '../../context/globelContext'; */
/* import  AdminProvider  from '../context/AdminContext'; */

export default function AdminNavigation() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpenNotificationDrop, setIsOpenNotificationDrop] = useState(false);


  const { adminData } = useSelector((state) => state.admin)

  /* console.log("adminData :",adminData.userData.fname) */

  const { isToggleSidebar, setisToggleSidebar } = useContext(GlobelProvider);

  const openMyAcc = Boolean(anchorEl);
  const openNotifications = Boolean(isOpenNotificationDrop);

  const handleOpenAccDrop = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMyDrop = () => {
    setAnchorEl(null);
  };

  const handleOpenNotificationDrop = () => {
    setIsOpenNotificationDrop(true);
  };

  const handleCloseNotificationDrop = () => {
    setIsOpenNotificationDrop(false);
  };
  const adminLogout = () => {
    dispatch(adminLogoutFetchApi({ toast, navigate, dispatch }))
  }

  return (
    <header className="row d-flex align-items-center">
      <div className="container-fluid">
        <div className="row d-flex align-items-center w-100">
          <div className="col-sm-2 part-1">
            <Link className="d-flex align-items-center pl-4 relative bottom-1" style={{ textDecoration: "none" }}>
              <img src={logo} alt="Logo" />
              <span>Ecomm</span>
            </Link>
          </div>

          <div className="col-sm-3 d-flex align-items-center part-2 pl-4">
            <Button
              className="rounded-circle mr-3"
              onClick={() => setisToggleSidebar(!isToggleSidebar)}
            >
              {isToggleSidebar ? (
                <MdOutlineMenu className="text-[22px]" />
              ) : (
                <MdMenuOpen className="text-[22px]" />
              )}
            </Button>
            <SearchBox />
          </div>

          <div className="col-sm-7 d-flex align-items-center part-3 pl-4 justify-content-end">
            <Button className="rounded-circle mr-3">
              <MdOutlineLightMode className="text-[22px]" />
            </Button>
            <Button className="rounded-circle mr-3">
              <IoIosCart className="text-[22px]" />
            </Button>
            <Button className="rounded-circle mr-3">
              <MdEmail className="text-[22px]" />
            </Button>

            <div className="dropdownWrapper">
              <Button
                className="rounded-circle mr-3"
                onClick={handleOpenNotificationDrop}
              >
                <IoIosNotifications className="text-[22px]" />
              </Button>

              <Menu
                anchorEl={isOpenNotificationDrop ? document.body : null}
                open={openNotifications}
                onClose={handleCloseNotificationDrop}
                onClick={handleCloseNotificationDrop}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <div className="head pl-3 pb-2">
                  <h4>Orders (12)</h4>
                </div>
                <Divider className="mb-1" />
                <div className="scroll">
                  {/* Loop through notifications if needed */}
                  <MenuItem onClick={handleCloseNotificationDrop}>
                    <div className="d-flex align-items-center">
                      <div className="myAcc adminImg">
                        <span className="rounded-circle">
                          <img src={""} alt="" className="w-[50px]" />
                        </span>
                      </div>
                      <div className="dropdownInfo">
                        <h4>
                          <b className="font-bold">Mahmudul</b> added to his favorite list <b>Leather belt steve madden</b>
                        </h4>
                        <p className="text-sky mb-0">Few seconds ago</p>
                      </div>
                    </div>
                  </MenuItem>

                  <div className="pl-3 pr-3 w-100 pt-2 pb-2">
                    <Button className="btn-blue w-100">
                      View all notifications
                    </Button>
                  </div>
                </div>
              </Menu>
            </div>

            <div className="myAccWrapper">
              <Button
                className="myAcc d-flex align-items-center"
                onClick={handleOpenAccDrop}
              >
                <img src={adminData.userData.profileImg} alt="" style={{ width: "50px", height: "50px", backgroundImage: "cover", borderRadius: "100%" }} />
                <div className="adminInfo">
                  <h4> {adminData.userData.fname} {adminData.userData.lname}</h4>

                </div>
              </Button>

              <Menu
                anchorEl={anchorEl}
                open={openMyAcc}
                onClose={handleCloseMyDrop}
                onClick={handleCloseMyDrop}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleCloseMyDrop}>
                  <ListItem>
                    <PersonAdd fontSize="small" />
                  </ListItem>
                  My Account
                </MenuItem>

                <MenuItem onClick={handleCloseMyDrop}>
                  <ListItem>
                    <IoShieldHalfSharp />
                  </ListItem>
                  Reset Password
                </MenuItem>

                <MenuItem onClick={adminLogout}>
                  <ListItem>
                    <Logout fontSize="small" />
                  </ListItem>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
