
import { FaCircleUser, FaPencil } from "react-icons/fa6";
import { FaShoppingCart, FaEye } from "react-icons/fa";
import { RiShoppingBagFill } from "react-icons/ri";
import { TbStarsFilled } from "react-icons/tb";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { IoIosTimer } from "react-icons/io";
import { HiDotsVertical } from "react-icons/hi";
import Button from "@mui/material/Button";
import { Chart } from "react-google-charts";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MdDelete } from "react-icons/md";
import Pagination from "@mui/material/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
/* import {
  deleteProduct,
  getAllOrdersShowByAdmin,
  getAllProductsFecthApi,
  getContactsFetchApi,
  getNotification,
} from "../../redux/user/UserThunk"; */
import { toast } from "react-toastify";
import { deleteProduct, getAllOrdersShowByAdmin, getAllProductsFecthApi, getAllUsersFetchApi } from "../../User/redux/User/UserThunk";
import DashboardBox from "./Dashboards/DashboardBox";


export const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
];

export const options = {
    title: "Daily Company Profit",
    backgroundColor: "transparent",
    chartArea: {
        left: 5,
        top: 60,
        width: "100%",
        height: "350",
    },
};

export default function AdminDashbord() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [showBy, setShowBy] = useState("");
    const [categoryBy, setCategoryBy] = useState("");
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const { allProducts,allUsers,AllOrders } = useSelector((state) => state.user);

   

    console.log("allUsers:", allUsers?.data?.length)
    console.log("AllOrders from Redux Store:", AllOrders?.length);

     useEffect(() => {
        dispatch(getAllOrdersShowByAdmin())
       
     },[dispatch])

    const handeleProductClick = (id) => {
        navigate(`/admin/productsdetails/products/${id}`);
    };

    const handeleDeleteProduct = (productId) => {
        dispatch(deleteProduct({ productId, toast }))
            .unwrap()
            .then(() => {
                dispatch(getAllProductsFecthApi());
            })
            .catch((err) => {
                console.error("Failed to delete product: ", err);
            });
    };
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = Array.isArray(allProducts)
        ? allProducts.slice(indexOfFirstProduct, indexOfLastProduct)
        : [];

    const handeleChangePerPage = (e, value) => {
        setCurrentPage(value);
    };

    const productUpdateHandeler = (product) => {
        navigate(`/admin/products/update/${product._id} `, { state: { product } });
    };

    // console.log(allUsers.username)

    const formatPriceWithCommas = (price) => {
        const priceString = price.toString();
        const lastThreeDigits = priceString.slice(-3);
        const otherDigits = priceString.slice(0, -3);
        const formattedOtherDigits = otherDigits.replace(
            /\B(?=(\d{2})+(?!\d))/g,
            ","
        );
        return otherDigits
            ? `${formattedOtherDigits},${lastThreeDigits}`
            : lastThreeDigits;
    };




    useEffect(() => {
        dispatch(getAllProductsFecthApi())
    }, [dispatch]) 


    useEffect(()=>{
        dispatch(getAllUsersFetchApi())
    },[dispatch])

    return (
        <>
            <div className="right-content w-100">
                <div className="row dashboardWrapperRow">
                    <div className="col-md-8">
                        <div className="dashboardBoxWrapper d-flex">
                            <DashboardBox
                                color={["#1da256", "#48d483"]}
                                icon={<FaCircleUser />}
                                grow={<TrendingUpIcon />}
                                name={"Total Users"}
                                  total={allUsers?.data?.length} 
                                onClick={() => navigate("/admin/allUsers")}
                            />
                            <DashboardBox
                                color={["#c012e2", "#eb64fe"]}
                                icon={<FaShoppingCart />}
                                grow={<TrendingDownIcon />}
                                name={"Total Orders"}
                                 total={AllOrders?.length}
                                onClick={() => navigate("/admin/allOrders1")}
                            />
                            <DashboardBox
                                color={["#2c78e5", "#60aff5"]}
                                icon={<RiShoppingBagFill />}
                                grow={<TrendingDownIcon />}
                                name={"Total Products"}
                                total={allProducts.length}
                                onClick={() => navigate("/admin/productManage")}
                            />
                            <DashboardBox
                                color={["#e1950e", "#f3cd29"]}
                                icon={<TbStarsFilled />}
                                grow={<TrendingUpIcon />}
                                name={"Total Reviews"}
                                total={52}
                            />
                        </div>
                    </div>

                    <div className="col-md-4 pl-0">
                        <div className="box graphBox">
                            <div className="d-flex align-items-center w-100 bottomEle">
                                <h5 className="text-white mt-0 mb-0">Total Sales</h5>
                                <Button className="ml-auto toggleIcon" onClick={handleClick}>
                                    <HiDotsVertical />
                                </Button>

                                <Menu
                                    className="dropdown_menu"
                                    MenuListProps={{
                                        "aria-labelledby": "long-button",
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    PaperProps={{
                                        style: {
                                            maxHeight: " ITEM_HEIGHT * 4.5",
                                            width: "20ch",
                                        },
                                    }}
                                >
                                    <MenuItem onClick={handleClose}>
                                        <IoIosTimer /> Last Day
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <IoIosTimer /> Last Week
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <IoIosTimer /> Last Month
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <IoIosTimer /> Last Year
                                    </MenuItem>
                                </Menu>
                            </div>

                            <h3 className="text-white font-bold text-[35px]">₹ 30,000,00</h3>

                            <p>₹ 150,00,00 In The Last Month</p>

                            <Chart
                                chartType="PieChart"
                                data={data}
                                options={options}
                                width={"100%"}
                                height={"200px"}
                                top={"500px"}
                            />
                        </div>
                    </div>
                </div>

                <div className="card  border-0 p-3 mt-4">
                    <h3 className="hd">Best Selling Products</h3>
                    <div className="row cardFilters mt-3 ">
                        <div className="col-md-3">
                            <h4>Show By</h4>
                            <FormControl
                                sx={{ m: 1, minWidth: 120 }}
                                size="small"
                                className="w-100"
                            >
                                <Select
                                    value={showBy}
                                    onChange={(e) => setShowBy(e.target.value)}
                                    displayEmpty
                                    inputProps={{ "aria-label": "Without label" }}
                                    className="w-100 mt-2"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="col-md-3">
                            <h4>Category By</h4>
                            <FormControl
                                sx={{ m: 1, minWidth: 120 }}
                                size="small"
                                className="w-100"
                            >
                                <Select
                                    value={categoryBy}
                                    onChange={(e) => setCategoryBy(e.target.value)}
                                    displayEmpty
                                    inputProps={{ "aria-label": "Without label" }}
                                    className="w-100 mt-2"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    <div className="table_responsive mt-3">
                        <table className="table table-bordered v-aligns">
                            <thead className="thead-dark ">
                                <tr>
                                    <th>UID</th>
                                    <th>Product</th>
                                    <th>Category</th>
                                    <th>Field</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Rating</th>

                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentProducts && currentProducts.length > 0 ? (
                                    currentProducts.map((product, index) => {
                                        const regularPrice = product.price || 0; // or provide a default value
                                        const discountPrice = product.discount || 0;
                                        const discountPercentage = Math.round(
                                            ((regularPrice - discountPrice) / regularPrice) * 100
                                        );

                                        return (
                                            <tr key={product._id}>
                                                <td> #{indexOfFirstProduct + index + 1} </td>
                                                <td>
                                                    <div className="d-flex align-items-center productBox gap-[20px]">
                                                        <div className="imageWrapper">
                                                            <div className="img">
                                                                <img
                                                                    src={product.img1}
                                                                    alt="Profile"
                                                                    style={{
                                                                        width: "50px",
                                                                        height: "50px",
                                                                        borderRadius: "50%",
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="info">
                                                            <h6>{product.title}</h6>
                                                            <p>{product.discription}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{product.category}</td>
                                                <td>{product.fields}</td>
                                                <td className="w-[170px]">
                                                    <div style={{ width: "100px" }}>
                                                        {regularPrice ? (
                                                            <>
                                                                <span className="new text-green-700 text-[15px] flex justify-center">
                                                                    ₹ {formatPriceWithCommas(discountPrice)}
                                                                </span>
                                                                <div className="flex gap-4 text-[15px]">
                                                                    <del className="old text-danger">
                                                                        ₹{formatPriceWithCommas(regularPrice)}
                                                                    </del>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <span className="text-danger">
                                                                Price not available
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>

                                                <td> {product.qnt} </td>
                                                <td> {product.ratings} </td>

                                                <td>
                                                    <div className="actions d-flex align-items-center gap-3">
                                                        <Button
                                                            color="secondary"
                                                            className="secondary"
                                                            onClick={() => handeleProductClick(product._id)}
                                                        >
                                                            <FaEye />
                                                        </Button>

                                                        <Button
                                                            color="success"
                                                            className="success"
                                                            onClick={() => productUpdateHandeler(product)}
                                                        >
                                                            <FaPencil />
                                                        </Button>
                                                        <Button
                                                            color="error"
                                                            className="error"
                                                            onClick={() => handeleDeleteProduct(product._id)}
                                                        >
                                                            <MdDelete />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center">
                                            Product not available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {allProducts && allProducts.length > 0 && (
                            <div className="d-flex tableFooter">
                                <p>
                                    Showing <b>{currentProducts.length}</b> of{" "}
                                    <b> {allProducts.length} </b> results
                                </p>
                                <Pagination
                                    count={Math.ceil(allProducts.length / productsPerPage)}
                                    color="primary"
                                    className="pagination"
                                    showFirstButton
                                    showLastButton
                                    onChange={handeleChangePerPage}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
