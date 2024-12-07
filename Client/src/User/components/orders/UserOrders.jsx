import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
/* import {
  getAllOrdersByUserId,
  userOrderCancellation,
} from "../../../redux/user/UserThunk"; */
// import { userOrderCancellation } from "../../../redux/user/UserSlice";
import { MdOutlineCancel } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { getAllOrdersByUserId, userOrderCancellation } from "../../redux/User/UserThunk";

export default function UserOrders() {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelComment, setCancelComment] = useState("");

  const { userData, UserOrders = [] } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = UserOrders.slice(indexOfFirstOrder, indexOfLastOrder);
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
        return "text-blue-700 ";
      case "Cancelled":
        return "text-red-700 ";
      case "Completed":
        return "text-green-700 ";
      default:
        return " text-gray-500";
    }
  };

  const handleOrderCancellation = async () => {
    if (!selectedOrder || !cancelReason) {
      toast.error("Please select a reason for cancellation");
      return;
    }

    try {
      await dispatch(
        userOrderCancellation({
          userId: userData._id,
          orderId: selectedOrder._id,
          orderNumber: selectedOrder.orderNumber,
          reason: cancelReason,
          comment: cancelComment,
        })
      );
      toast.success("Order cancelled successfully");
      dispatch(getAllOrdersByUserId(userData._id));

      // Refresh orders data

      setCancelReason("");
      setCancelComment("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="right-content w-100">
      <div className="card border-0 p-3 mt-4">
        <div className="flex justify-between">
          <h3 className="hd">Orders</h3>
        </div>

        <div
          className="table-responsive-scrollable mt-3"
          style={{ overflowX: "auto" }}
        >
          <table className="table table-bordered v-aligns text-center">
            <thead className="thead-dark">
              <tr>
                <th>UID</th>
                <th className="w-[250px]">Order Number</th>
                <th className="w-[200px]" style={{ whiteSpace: "nowrap" }}>
                  Order Date
                </th>
                <th className="w-[400px]">Product</th>
                <th>Quantity</th>
                <th className="w-[200px]" style={{ whiteSpace: "nowrap" }}>
                  Total Amount
                </th>
                <th style={{ whiteSpace: "nowrap" }} className="w-[150px]">
                  Payment Method
                </th>
                <th style={{ whiteSpace: "nowrap" }} className="w-[150px]">
                  Payment Status
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
                      <td>{order.orderNumber}</td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
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
                      <td>{order.paymentMethod}</td>
                      <td className={`w-[200px]  `}>
                        <p
                          className={`${getStatusClass(
                            order.paymentResult.status
                          )}`}
                        >
                          {order.paymentResult.status}
                        </p>
                      </td>
                      <td>{order.shippingAddress.addressLine1}</td>
                      <td>
                        {order.isCancelled ? (
                          <div className="pl-2 cursor-pointer text-[30px]">
                            <TiTick className="text-green-600" />
                          </div>
                        ) : (
                          <div
                            onClick={() => setSelectedOrder(order)}
                            data-toggle="modal"
                            data-target="#cancelOrderModal"
                            className="pl-2 cursor-pointer text-[30px]"
                          >
                            <MdOutlineCancel className="text-red-600" />
                          </div>
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

          {UserOrders.length > 0 && (
            <div className="d-flex tableFooter">
              <p>
                Showing <b>{UserOrders.length}</b> of <b>{UserOrders.length}</b>{" "}
                results
              </p>
              <Pagination
                count={Math.ceil(UserOrders.length / ordersPerPage)}
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

      {/* Modal for Order Cancellation */}
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
                Cancel Order
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
                  <label htmlFor="cancelReason">
                    Choose a Reason for Order Cancellation
                  </label>
                  <select
                    className="form-control"
                    id="cancelReason"
                    name="cancelReason"
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                  >
                    <option value="">Select a reason</option>
                    <option value="Found a better price elsewhere.">
                      Found a better price elsewhere.
                    </option>
                    <option value="Change of mind.">Change of mind</option>
                    <option value="Delivery took too long.">
                      Delivery took too long
                    </option>
                    <option value="Order placed by mistake.">
                      Order placed by mistake
                    </option>
                  </select>
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="cancelComment">Additional Comment</label>
                  <textarea
                    className="form-control"
                    name="cancelComment"
                    id="cancelComment"
                    rows="3"
                    value={cancelComment}
                    onChange={(e) => setCancelComment(e.target.value)}
                  />
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
                    Confirm Cancellation
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
