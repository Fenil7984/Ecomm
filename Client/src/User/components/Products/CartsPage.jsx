import { useDispatch, useSelector } from "react-redux";
import { Button, Pagination } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
/* import {
  clearCart,
  getCartByUserId,
  removeProductFromCart,
  updateCart,
} from "../../../redux/user/UserThunk"; */
import { NavLink } from "react-router-dom";
import {getCartByUserId, updateCart, clearCart, removeProductFromCart } from "../../redux/User/UserThunk";

export default function CartsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const {
    allProducts,
    userData,
    userCart = { items: [], userId: "" },
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const items = Array.isArray(userCart?.items)
    ? userCart.items.filter(
        () => String(userCart.userId) === String(userData._id)
      )
    : [];

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = items.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleChangePage = (e, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    if (userData?._id) {
      dispatch(getCartByUserId(userData._id));
    }
  }, [dispatch, userData]);

  const calculateTotalAmount = () => {
    return items.reduce((acc, item) => acc + (item.subTotal || 0), 0);
  };

  const totalAmount = calculateTotalAmount();
  // const shippingCost = userCart?.shippingCost || 0;
  const grandTotal = totalAmount;

  const formatPriceWithCommas = (price) => {
    if (price == null || isNaN(price)) return "0"; // Handle null, undefined, or non-numeric values

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

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity <= 0) {
      toast.error("Quantity must be greater than 0");
      return;
    }

    const updatedItems = items.map((item) => {
      if (item.productId === productId) {
        const price = item.discount || 0;
        const newSubTotal = newQuantity * price;
        return { ...item, quantity: newQuantity, subTotal: newSubTotal };
      }
      return item;
    });
    console.log("updatedItems:", updatedItems);

    try {
      // Update the cart in the backend
      await dispatch(updateCart({ userId: userData._id, items: updatedItems }));

      dispatch(getCartByUserId(userData._id)); // Refresh cart data
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleClearCart = async () => {
    await dispatch(clearCart(userData._id));
    dispatch(getCartByUserId(userData._id)); // Refresh cart data
  };

  const handleRemoveProductFromCart = async (productId) => {
    const product = allProducts.find(
      (p) => p._id.toString() === productId.toString()
    );

    if (product) {
      try {
        await dispatch(
          removeProductFromCart({
            userId: userData._id,
            productId: product._id,
          })
        );

        dispatch(getCartByUserId(userData._id));
      } catch (error) {
        console.error("Error removing product from cart:", error);
      }
    }
  };

  return (
    <div className="right-content w-100">
      <div className="card border-0 p-3 mt-4">
        <div className="flex justify-between">
          <h3 className="hd">Carts</h3>
        </div>

        <div className="table_responsive mt-3">
          <table className="table table-bordered v-aligns text-center">
            <thead className="thead-dark">
              <tr>
                <th>UID</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>SubTotal</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.length > 0 ? (
                currentProducts.map((item, index) => {
                  const product =
                    allProducts.find(
                      (product) => product._id === item.productId
                    ) || {};
                  return (
                    <tr key={item._id}>
                      <td>#{indexOfFirstProduct + index + 1}</td>
                      <td>
                        <div className="d-flex align-items-center productBox gap-[20px]">
                          <div className="imageWrapper">
                            <div className="img">
                              <img
                                src={product.img1 || ""}
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
                      </td>
                      <td className="w-[170px]">
                        <div style={{ width: "70px" }}>
                          <span className="new text-green-700 text-[15px] flex justify-center">
                            ₹{formatPriceWithCommas(product.discount || 0)}
                          </span>
                        </div>
                      </td>
                      <td className="">
                        <div className="flex justify-center">
                          <div className="w-[25px] h-[25px] flex items-start justify-center ">
                            <button
                              className="btn btn-danger rounded-[100%]"
                              onClick={() =>
                                handleQuantityChange(
                                  item.productId,
                                  item.quantity - 1
                                )
                              }
                            >
                              -
                            </button>
                          </div>
                          <input
                            type="text"
                            className="w-[36px] h-[36px] outline-none border-0 text-center bg-transparent text-[20px]"
                            readOnly
                            value={item.quantity}
                          />
                          <div className="w-[25px] h-[25px] flex items-start justify-center">
                            <button
                              className="btn btn-primary rounded-[100%] text-center"
                              onClick={() =>
                                handleQuantityChange(
                                  item.productId,
                                  item.quantity + 1
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="w-[200px]">
                        ₹ {formatPriceWithCommas(item.subTotal || 0)}
                      </td>
                      <td>
                        <Button
                          color="error"
                          className="error text-[22px]"
                          onClick={() =>
                            handleRemoveProductFromCart(item.productId)
                          }
                        >
                          <MdDelete />
                        </Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    Carts not available
                  </td>
                </tr>
              )}
              {items.length > 0 && (
                <>
                  <tr>
                    <td colSpan="6" className="text-right">
                      <Button
                        color="secondary"
                        variant="contained"
                        startIcon={<MdDelete />}
                        onClick={handleClearCart}
                      >
                        Clear Cart
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="6" className="text-right">
                      <NavLink to={"/products"}>
                        <Button
                          color="primary"
                          variant="contained"
                          startIcon={<IoCartOutline />}
                          style={{ marginLeft: "10px" }}
                        >
                          Continue Shopping
                        </Button>
                      </NavLink>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>

          {items.length > 0 && (
            <div className="d-flex tableFooter">
              <p>
                Showing <b>{items.length}</b> of <b>{items.length}</b> results
              </p>
              <Pagination
                count={Math.ceil(items.length / productsPerPage)}
                color="primary"
                className="pagination"
                showFirstButton
                showLastButton
                onChange={handleChangePage}
              />
            </div>
          )}
        </div>
      </div>
      {items.length > 0 && (
        <div className="border-2 border-gray-300 w-[40%] h-auto p-[30px] relative float-right mt-4 mb-[50px]">
          <div className="">
            <div className="table_responsive mt-3">
              <table className="table table-bordered v-aligns">
                <thead className="thead-dark">
                  <tr className="text-center">
                    <th colSpan={2}>Cart Totals</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b text-center">
                    <td className="py-2">Total</td>
                    <td className="text-center text-green-600 font-semibold">
                      ₹{formatPriceWithCommas(grandTotal || 0)}
                    </td>
                  </tr>
                </tbody>
              </table>
              <NavLink
                to={"/processToCheckout"}
                state={{ grandTotal, totalAmount, currentProducts }}
              >
                <Button
                  color="success"
                  variant="contained"
                  className="w-full mt-2"
                >
                  Proceed to Checkout
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
