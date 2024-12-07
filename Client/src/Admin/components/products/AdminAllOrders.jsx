import { Breadcrumbs, Button, Chip, emphasize, styled } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { FaPencil } from "react-icons/fa6";
import { toast } from "react-toastify";

import { TiTick } from "react-icons/ti";
import { getAllOrdersByUserId, getAllOrdersShowByAdmin } from "../../../User/redux/User/UserThunk";
import { userOrderStatusUpdated } from "../../../User/redux/Admin/AdminThunk";

//import { MdOutlineCancel } from "react-icons/md";
//import { userOrderStatusUpdated } from "../../../redux/admin/AdminThunk";
//import { getAllOrdersByUserId } from "../../../../../Server/controllers/Admin/OrderController";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

export default function AdminAllOrders() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;
  const [orderStatus, setOrderStatus] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null);

  const { AllOrders=[], userData } = useSelector(
    (state) => state.user
  );
  console.log("All Orders: line:28", AllOrders);

   useEffect(() => {
    dispatch(getAllOrdersShowByAdmin());
  }, [dispatch]);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = Array.isArray(AllOrders)
  ? AllOrders.slice(indexOfFirstOrder, indexOfLastOrder)
  : [];
  useEffect(() => {
    if (userData?._id) {
       dispatch(getAllOrdersByUserId(userData._id)); 
    }
  }, [dispatch, userData]);

  const formatPriceWithCommas = (price) => {
    if (price == null || isNaN(price)) return "0";

    const priceString = price.toString();
    const lastThreeDigit = priceString.slice(-3);
    const otherDigits = priceString.slice(0, -3);
    const formattedOtherDigits = otherDigits.replace(
      /\B(?=(\d{2})+(?!\d))/g,
      ","
    );
    return otherDigits
      ? `${formattedOtherDigits},${lastThreeDigit}`
      : lastThreeDigit;
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "text-blue-400 ";
      case "Canceled":
        return "text-red-700 ";
      case "Delivered":
        return "text-green-700 ";
      case "Shipped":
        return "text-blue-700 ";
      default:
        return " text-gray-500";
    }
  };
  const handleOrderCancellation = async () => {
    if (!selectedOrder || !orderStatus) {
      toast.error("Please select a reason for cancellation");
      return;
    }

    try {
      await dispatch(
        userOrderStatusUpdated({
          orderId: selectedOrder._id,
          orderStatus:orderStatus,
        })
      ); 


      console.log("orderStatus:",orderStatus)
      toast.success("Order Status Updated successfully");
    await  dispatch(getAllOrdersShowByAdmin())
      dispatch(getAllOrdersByUserId(userData._id));
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="right-content w-100">
        <div className="card  border-0 w-100 flex-row p-4 justify-between">
          <h5 className="mb-3">Users Orders</h5>
          <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb
              component="a"
              href="/admin"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb component="a" href="#" label="Orders" />
          </Breadcrumbs>
        </div>
        <div className="card border-0 p-3 mt-4">
          <div className="flex justify-between">
            <h3 className="hd">Orders</h3>
          </div>

          <div
            className="table-responsive-scrollable mt-3 tableAdmin"
            style={{ overflowX: "auto" }}
          >
            <table className="table table-bordered v-aligns text-center">
              <thead className="thead-dark">
                <tr>
                  <th>UID</th>
                  <th className="w-[250px]" style={{ whiteSpace: "nowrap" }}>
                    User Id
                  </th>
                  <th className="w-[250px]" style={{ whiteSpace: "nowrap" }}>
                    Order Number
                  </th>
                  <th className="w-[250px]" style={{ whiteSpace: "nowrap" }}>
                    User Name
                  </th>
                  <th className="w-[250px]" style={{ whiteSpace: "nowrap" }}>
                    Contact Number
                  </th>
                  <th className="w-[250px]" style={{ whiteSpace: "nowrap" }}>
                    Email Id
                  </th>

                  <th className="w-[400px]">Product</th>
                  <th>Quantity</th>
                  <th className="w-[200px]" style={{ whiteSpace: "nowrap" }}>
                    Total Amount
                  </th>
                  <th className="w-[200px]" style={{ whiteSpace: "nowrap" }}>
                    Order Date
                  </th>
                  <th style={{ whiteSpace: "nowrap" }} className="w-[150px]">
                    Payment Method
                  </th>
                  <th style={{ whiteSpace: "nowrap" }} className="w-[150px]">
                    Order Status
                  </th>
                  <th className="w-[250px]" style={{ whiteSpace: "nowrap" }}>
                    Shipping Address
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.length > 0 ? (
                  currentOrders.map((order, index) => {
                    return (
                      <tr key={order._id}>
                        <td>#{indexOfFirstOrder + index + 1}</td>
                        <td>{order.userId}</td>
                        <td>{order.orderNumber}</td>
                        <td>
                          {order.shippingAddress.fname}{" "}
                          {order.shippingAddress.lname}
                        </td>
                        <td>{order.shippingAddress.mobileNo} </td>
                        <td>{order.shippingAddress.email} </td>

                        <td key={index}>
                          {order.orderItems.map((product, index) => (
                            <div
                              className="d-flex align-items-center productBox gap-[20px]"
                              key={index}
                            >
                              <div className="imageWrapper">
                                <div className="img">
                                  <img
                                    src={product.img || ""}
                                    alt={product.title}
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
                              </div>
                            </div>
                          ))}
                        </td>
                        <td>
                          {order.orderItems.map((product) => (
                            <li className="list-none p-3" key={product._id}>
                              {product.quantity}
                            </li>
                          ))}
                        </td>
                        <td className="w-[170px]">
                          ₹ {formatPriceWithCommas(order.totalPrice)}
                        </td>

                        <td>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td>{order.paymentMethod}</td>
                        <td className={`w-[200px]  `}>
                          <p
                            className={`${getStatusClass(
                              order.orderStatus
                            )} font-bold`}
                          >
                            {order.orderStatus}
                          </p>
                        </td>
                        <td>
                          {order.shippingAddress.addressLine1}{" "}
                          {order.shippingAddress.country} ,
                          {order.shippingAddress.state} ,{" "}
                          {order.shippingAddress.city}
                        </td>
                        <td>
                          {order.isDelivered ? (
                            <div className="flex justify-center items-center">
                              <TiTick className="text-[30px] text-green-600 " />
                            </div>
                          ) : (
                            <Button
                              color="success"
                              className="success"
                              data-toggle="modal"
                              data-target="#cancelOrderModal"
                              onClick={() => setSelectedOrder(order)}
                            >
                              <FaPencil />
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      Orders not available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {AllOrders.length > 0 && (
              <div className="d-flex tableFooter">
                <p>
                  Showing <b>{AllOrders.length}</b> of <b>{AllOrders.length}</b>{" "}
                  results
                </p>
                <Pagination
                  count={Math.ceil(AllOrders.length / ordersPerPage)}
                  page={currentPage}
                  onChange={(event, value) => setCurrentPage(value)}
                  color="primary"
                  className="pagination"
                  showFirstButton
                  showLastButton
                />
              </div>
            )}
          </div>
        </div>

        <div
          className="modal fade"
          id="cancelOrderModal"
          aria-labelledby="cancelOrderModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header text-center text-[20px]">
                <h5
                  className="modal-title ml-auto text-red-700"
                  id="cancelOrderModalLabel "
                >
                  Order Status
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body">
                <form
                  className="text-left p-[10px]"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleOrderCancellation();
                  }}
                >
                  <div className="form-group text-[18px]">
                    <label htmlFor="cancelReason">Order Status</label>
                    <select
                      className="form-control"
                      id="orderStatus"
                      name="orderStatus" 
                      value={orderStatus}
                      onChange={(e) => setOrderStatus(e.target.value)}
                    >
                      <option value="">Select Order Status</option>
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Deliverd">Deliverd</option>
                      <option value="Canceled">Canceled</option>
                    </select>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Update Order
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
