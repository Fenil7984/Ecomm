import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
//import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
//import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
//import AdbIcon from '@mui/icons-material/Adb';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutFecthApi, UserValidation } from '../redux/User/UserThunk';
import { toast } from 'react-toastify';
import { FaRegHeart, FaRegUser, FaShoppingCart } from 'react-icons/fa';
import { IoCartOutline, IoLogIn, IoShieldHalfSharp } from 'react-icons/io5';
import { ListItem } from '@mui/material';
//import { MdCategory } from 'react-icons/md';
//import { RiAdminFill } from 'react-icons/ri';
//import PersonAdd from "@mui/icons-material/PersonAdd";
import Logout from "@mui/icons-material/Logout";
//import logo1 from "../../assets/logo1.png";



export default function Navigation() {


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userData, userCart } = useSelector((state) => state.user)

  console.log(userData?.fname) 


  React.useEffect(() => {
    dispatch(UserValidation())

  }, [dispatch])
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMyAcc = Boolean(anchorEl);
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  /* const handleOpenCategoriesMenu = (event) => {
    setAnchorElCategories(event.currentTarget);
  };

  const handleCloseCategoriesMenu = () => {
    setAnchorElCategories(null);
  };
 */


  const logoutButton = async () => {
    await dispatch(LogoutFecthApi({ toast, navigate, dispatch }))
    dispatch(UserValidation())
  };

  const handeleOpenAccDrop = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handeleCloseMyDrop = () => {
    setAnchorEl(null);
  };

  const wishlistLength = userData?.wishlist?.length || 0;
  const userCartLength = userCart?.items?.length || 0
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* {<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />} */}
          <Typography
            variant="h6"
            noWrap
            component="a"
             href="#app-bar-with-responsive-menu" 
            sx={{
              mr: 1,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src="/ecomm.png" className='App-logo' alt="logo1" />
            <span>Ecomm</span>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }} 
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
               <NavLink to="/" style={{ textDecoration: "none" }}>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography sx={{ textAlign: 'center' }}>Home</Typography>
              </MenuItem>
              </NavLink>
              <NavLink to="/products" style={{ textDecoration: "none" }}>
                <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'black', display: 'block' }}>
                  Products
                </Button>
              </NavLink>

              <MenuItem onClick={handleCloseNavMenu}>
                <Typography sx={{ textAlign: 'center' }}>Categories</Typography>
              </MenuItem>
              {/* <Menu
                id="categories-menu"
                anchorEl={anchorElCategories}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElCategories)}
                onClose={handleCloseCategoriesMenu}
              >
                <MenuItem onClick={handleCloseCategoriesMenu}>
                  <Typography>Category 1</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseCategoriesMenu}>
                  <Typography>Category 2</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseCategoriesMenu}>
                  <Typography>Category 3</Typography>
                </MenuItem>
              </Menu> */}
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography sx={{ textAlign: 'center' }}>About Us</Typography>
              </MenuItem>
              <NavLink to="/contact-us" style={{ textDecoration: "none" }}>

                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>Contact Us</Typography>
                </MenuItem>
              </NavLink>
            </Menu>
          </Box>
          {/* //{<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />} */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src="ecomm.png" className='App.logo' alt="logo1" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <NavLink to={"/"} style={{
              textDecoration: "none"
            }}>

              <Button

                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                Home
              </Button>
            </NavLink>
            <NavLink to="/products" style={{ textDecoration: "none" }}>
              <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'black', display: 'block' }}>
                Products
              </Button>
            </NavLink>
            <Button

              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'black', display: 'block' }}
            >
              Categories
            </Button>
              {/*  <Button
              onClick={handleOpenCategoriesMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Categories
            </Button>
            <Menu
              id="categories-menu-desktop"
              anchorEl={anchorElCategories}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElCategories)}
              onClose={handleCloseCategoriesMenu}
            >
              <MenuItem onClick={handleCloseCategoriesMenu}>
                <Typography>Category 1</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseCategoriesMenu}>
                <Typography>Category 2</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseCategoriesMenu}>
                <Typography>Category 3</Typography>
              </MenuItem>
            </Menu> */}
            <Button

              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'black', display: 'block' }}
            >
              About Us
            </Button>
            <NavLink to={"/contact-us"} style={{ textDecoration: "none" }}>

              <Button

                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                Contact Us
              </Button>
            </NavLink>
          </Box>
          {userData ? (
            <>
              <div className="flex gap-[40px]">
                <div className="myAccWrapper">
                  <Button
                    className="myAcc d-flex align-items-center"
                    onClick={handeleOpenAccDrop}
                  >
                    <img
                      src={userData.profileImg}
                      alt=""
                      className="w-[40px] h-[40px] rounded-[100%]"
                    />
                    <div className="adminInfo">
                      <h4>
                        {userData.fname} {userData.lname}
                      </h4>
                      <p>{userData.username}</p>
                    </div>
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={openMyAcc}
                    onClose={handeleCloseMyDrop}
                    onClick={handeleCloseMyDrop}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                  
                    <NavLink to={"/orders"} style={{textDecoration:"none",color:"black"}}>
                      <MenuItem onClick={handeleCloseMyDrop}>
                        <ListItem>
                          <FaShoppingCart />
                        </ListItem>
                        Orders
                      </MenuItem>
                    </NavLink>
                    <NavLink to={"/update-password"} style={{textDecoration:"none",color:"black"}}>
                    <MenuItem onClick={handeleCloseMyDrop}>
                      <ListItem>
                        <IoShieldHalfSharp />
                      </ListItem>
                      Update Password
                    </MenuItem>
</NavLink>

                    <MenuItem onClick={logoutButton}>
                      <ListItem>
                        <Logout fontSize="small" />
                      </ListItem>
                      Logout
                    </MenuItem>

                    
                  </Menu>
                </div>
              </div>
            </>
          ) : (
            <div className="flex gap-[15px]">
              <div className="flex">
                <span className="flex gap-[25px]">
                  <NavLink className="flex items-center gap-[2px]" to={"/login"} style={{
                    textDecoration: "none",
                    color: "black",
                    fontSize: "20px"
                  }}>
                    <span>
                      <IoLogIn style={{ color: 'black',fontSize:"20px" }} />
                    </span>
                    Login
                  </NavLink>
                  <span className="text-[20px] relative -top-[2px] font-semibold">
                    /
                  </span>
                  <NavLink
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontSize: "20px"
                    }}
                    className="flex items-center gap-[2px] "
                    to={"/register"}

                  >
                    <span>
                      <FaRegUser style={{color:"black",fontSize:"20px"}} />
                    </span>
                    Signup
                  </NavLink>
                </span>
              </div>
            </div>
          )}



          {userData ? (
            <div className="flex gap-[15px] text-[25px] font-bold relative pt-[20px]">
              <NavLink to={"/wishlsit"}>
                <FaRegHeart className="font-bold " />
                <div className="w-[25px] h-[25px] flex justify-center items-center rounded-[100%] text-white bg-topnavBorderBottom-400 font-bold absolute -top-1 right-8">
                  <p>{wishlistLength}</p>
                </div>
              </NavLink>
              <NavLink to={"/carts"}>
                <IoCartOutline className="font-bold text-[28px]" />
                <div className="w-[25px] h-[25px] flex justify-center items-center rounded-[100%] text-white bg-topnavBorderBottom-400 font-bold absolute -top-1 -right-3">
                  <p> {userCartLength} </p>
                </div>
              </NavLink>

            </div>
          ) : null}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

