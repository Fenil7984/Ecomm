import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
/* import {
   categoryByFieldsFetchApi, 
   clearCart, 
  fetchAllCitiesByStateAndCountry,
  fetchAllCitiesByStateAndCountry,
  fetchAllCountries,
  fetchAllStatesByCountry,
  fetchPlaceOrderApi,
   getAllProductsFecthApi, 
   getCartByUserId, 
} from "../../../redux/user/UserThunk"; */ 
//import { productAddFetchApi } from "../../../redux/admin/AdminThunk";
// import uploadedImg from "../../../assets/uploaded.jpg"
import { toast } from "react-toastify";
import { MdPayment } from "react-icons/md";
//import paymentMethod from "../../../assets/payment-method.png";
//import cashOnDelivery from "../../../assets/Cashondelivery.png";
import { IoCashOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
/* import OrderConfirmPopupBox from "./OrderConfirmPopupBox"; */
import {fetchAllCitiesByStateAndCountry, fetchAllCountries, fetchPlaceOrderApi, fetchAllStatesByCountry } from "./../../redux/User/UserThunk";
import OrderConfirmPopupBox from "./OrderConfirmPopupBox";

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

export default function ProcessToCheckoutPage() {
  const dispatch = useDispatch();
  const { allProducts, country, states, allCity, userData, loading } =
    useSelector((state) => state.user);

  const location = useLocation();
  const navigate = useNavigate();
  const { currentProducts = [], totalAmount } = location.state || {};
  /* console.log("states:", states); */
  const [selectedOption, setSelectedOption] = useState("free");
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("COD");
  const [paymentWrite, setPaymentWrite] = useState("COD");
  const [shippingPrice, setShippingPrice] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  /* console.log("allCity:", allCity); */
  const handleOptionClick = (option) => {
    setSelectedOption(option);

    if (option === "free") {
      setShippingPrice(0); // Store Pickup is ₹0
    } else if (option === "express") {
      setShippingPrice(500); // Express Delivery is ₹500
    }
  };

  const handlePaymentOptionClick = (option) => {
    setSelectedPaymentOption(option);

    if (option === "COD") {
      setPaymentWrite("COD");
    } else if (option === "CreditCard/DebitCard") {
      setPaymentWrite("CreditCard/DebitCard");
    }
  };
  const [formdata, setFormdata] = useState({
    email_id: "",
    fname: "",
    lname: "",
    addressLine1: "",
    addressLine2: "",
    country: "",
    zipCode: "",
    state: "",
    city: "",
    mobileNo: "",
  });

  const handleInputChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      userId: userData._id,
      orderItems: currentProducts.map((item) => {
        const product =
          allProducts.find((product) => product._id === item.productId) || {};

        return {
          productId: product._id,
          img: product.img1,
          title: product.title,
          quantity: item.quantity,
          price: product.price,
        };
      }),

      shippingAddress: formdata,
      paymentMethod: paymentWrite,
      shippingPrice: shippingPrice,
      totalPrice: grandTotals,
    };

    console.log("Order data to be sent:", orderData);

    const response = await dispatch(
      fetchPlaceOrderApi({
        orderData,
        navigate,
        dispatch,
        userData,
        toast,
        setShowPopup,
      })
    );

     console.log("Response from fetchPlaceOrderApi: ", response); 

    const orderNumber = response?.payload?.createOrder?.orderNumber;
     console.log("Extracted order number: ", orderNumber); 

    if (orderNumber) {
      setShowPopup({ show: true, orderId: orderNumber });
      setTimeout(() => {
        setShowPopup({ show: false });
        navigate("/");
      }, 3000);
    } else {
 //console.error("Order number not found in the response."); 
    }
  };

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    setFormdata({ ...formdata, country: countryCode });
  };
  const handleStateChange = (e) => {
    const stateCode = e.target.value;
    setFormdata({ ...formdata, state: stateCode });
  };
  const handleCityChange = (e) => {
    const cityCode = e.target.value;
    setFormdata({ ...formdata, city: cityCode });
  };
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

  // console.log("allCity :",allCity)

  useEffect(() => {
    dispatch(fetchAllCountries());
  }, [dispatch]);

  useEffect(() => {
    if (formdata.country) {
      const selectedCountry = country.find(
        (c) => c.isoCode === formdata.country
      );

      if (selectedCountry) {
        dispatch(fetchAllStatesByCountry(selectedCountry.isoCode));
      }
    }
  }, [formdata.country, country, dispatch]);
  useEffect(() => {
     console.log("State Value:", formdata.state);
    console.log("Country Value:", formdata.country); 
    if (formdata.state && formdata.country) {
      console.log(
        "Fetching cities for state:",
        formdata.state,
        "and country:",
        formdata.country
      );
      dispatch(
        fetchAllCitiesByStateAndCountry({
          stateCode: formdata.state,
          countryCode: formdata.country,
        })
      );
    } else {
       console.log("State or country is not selected yet."); 
    }
  }, [formdata.state, formdata.country, dispatch]);
  const shippingCostValue = selectedOption === "free" ? 0 : 500;

  // const amountIncludingShipping = totalAmount + shippingCostValue;
  const CGST = totalAmount + shippingCostValue;
  const GSTRATE = 0.18;
  const CGSTCalculator = CGST * GSTRATE;
  const CGSTCalculatorFixed = parseFloat(CGSTCalculator.toFixed(2));
  // const finalTotalAmount = CGST + CGSTCalculator;
  const finalTotalAmount = CGSTCalculatorFixed;
  const grandTotals = totalAmount + finalTotalAmount;

  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4 justify-between">
          <h5 className="mb-3">Product Add</h5>
          <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb
              component="a"
              href="/admin"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb component="a" href="#" label="Products" />
            <StyledBreadcrumb component="a" href="#" label="Product Add" />
          </Breadcrumbs>
        </div>

        <div>
          {loading ? (
            <p>loading...</p>
          ) : (
            <form className="form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-sm-7">
                  <div className="card p-4">
                    <h5 className="mb-4">Shipping Address</h5>

                    <div className="form-group">
                      <h6>Email :</h6>
                      <input
                        type="email_id"
                        name="email_id"
                        value={formdata.email_id}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <h6>First Name :</h6>
                          <input
                            type="text"
                            name="fname"
                            value={formdata.fname}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <h6>Last Name :</h6>
                          <input
                            type="text"
                            name="lname"
                            value={formdata.lname}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <h6>Address Line 1 :</h6>
                          <input
                            type="text"
                            name="addressLine1"
                            value={formdata.addressLine1}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <h6>Address Line 2 :</h6>
                          <input
                            type="text"
                            name="addressLine2"
                            value={formdata.addressLine2}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <h6>Country</h6>
                          <select
                            name="country"
                            id="country"
                            className="cursor-pointer"
                            value={formdata.country}
                            onChange={handleCountryChange}
                          >
                            <option value="">Select Country</option>
                            {country &&
                              country.map((country) => (
                                <option
                                  key={country._id}
                                  value={country.isoCode}
                                >
                                  {country.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <h6>Zip Code :</h6>
                          <input
                            type="text"
                            name="zipCode"
                            value={formdata.zipCode}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <h6>State</h6>
                          <select
                            name="state"
                            id="state"
                            className="cursor-pointer"
                            value={formdata.state}
                            onChange={handleStateChange}
                          >
                            <option value="">Select State</option>
                            {states &&
                              states.map((state) => (
                                <option key={state._id} value={state.isoCode}>
                                  {state.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <h6>City</h6>
                          <select
                            type="text"
                            name="city"
                            value={formdata.city}
                            placeholder="fields"
                            className="fields_selects cursor-pointer"
                            onChange={handleCityChange}
                          >
                            <option value="">Select City</option>
                            {allCity &&
                              allCity.map((city) => (
                                <option key={city._id} value={city.isoCode}>
                                  {city.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <h6>Mobile Phone :</h6>
                          <input
                            type="text"
                            name="mobileNo"
                            value={formdata.mobileNo}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-5">
                  <div className="card p-4">
                    <h1 className="mb-4">Shipping Service</h1>
                    <div className="flex justify-between text-center">
                      {/* Store Pickup Option */}
                      <div
                        className={`relative w-[45%] h-[290px] p-[15px] gap-[20px] shippinCheckout border-2 cursor-pointer ${
                          selectedOption === "free"
                            ? "shippinCheckoutChangeColor"
                            : "shippinCheckout"
                        }`}
                        onClick={() => handleOptionClick("free")}
                      >
                        <div>
                          <h4>Store Pickup</h4>
                        </div>
                        <div>
                          <h4>Free</h4>
                        </div>
                        <div>
                          <h1>Pickup your purchase today</h1>
                        </div>
                        {selectedOption === "free" && (
                          <div className="absolute right-2 top-2 text-orange-500">
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Express Delivery Option */}
                      <div
                        className={`relative w-[45%] h-[290px] p-[15px]  border-2 cursor-pointer ${
                          selectedOption === "express"
                            ? "shippinCheckoutChangeColor"
                            : "shippinCheckout"
                        }`}
                        onClick={() => handleOptionClick("express")}
                      >
                        <div>
                          <h4>Express Delivery</h4>
                        </div>
                        <div>
                          <h4>₹ 500</h4>
                        </div>
                        <div>
                          <h1>Estimated 3-5 days delivery</h1>
                        </div>
                        {selectedOption === "express" && (
                          <div className="absolute right-2 top-2 text-orange-500">
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4>Selected Shipping Price: ₹ {shippingPrice}</h4>
                  </div>
                  <div className="card p-4">
                    <h1 className="mb-4">Payment Method</h1>

                    <div
                      className={`card p-4 ${
                        selectedPaymentOption === "CreditCard/DebitCard"
                          ? "paymentCardChangeColor"
                          : "paymentCard"
                      }`}
                      onClick={() =>
                        handlePaymentOptionClick("CreditCard/DebitCard")
                      }
                    >
                      <div className="flex justify-between">
                        <div className="flex gap-[10px]">
                          <div className="pt-[2px]">
                            <MdPayment className="text-[25px]" />
                          </div>
                          <div>
                            <h1> Credit / Debit Card</h1>
                            <p>
                              Pay with mastercard , visa or american express.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center">
                        {/*   { <img src={paymentMethod} alt="" /> } */}
                        </div>
                      </div>

                      {selectedPaymentOption === "CreditCard/DebitCard" && (
                        <div className="absolute right-2 top-2 text-orange-500">
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        </div>
                      )}
                    </div>

                    <div
                      className={`card p-4 ${
                        selectedPaymentOption === "COD"
                          ? "paymentCardChangeColor"
                          : "paymentCard"
                      }`}
                      onClick={() => handlePaymentOptionClick("COD")}
                    >
                      <div className="flex justify-between">
                        <div className="flex gap-[10px] items-center">
                          <div>
                            <IoCashOutline className="text-[25px]" />
                          </div>
                          <div>
                            <h1> Cash On Delivery</h1>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {/* <img
                            src={cashOnDelivery}
                            alt=""
                            className="w-[170px]"
                          /> */}
                        </div>
                      </div>

                      {selectedPaymentOption === "COD" && (
                        <div className="absolute right-2 top-2 text-orange-500">
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="mt-4">
                      <h4>Selected payment option: ₹ {paymentWrite}</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-7">
                  <div className="card p-4">
                    <h3 className="hd">Order Summary</h3>

                    <div className="table_responsive mt-3">
                      <table className="table table-bordered v-aligns text-center">
                        <thead className="thead-dark">
                          <tr>
                            <th>UID</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>SubTotal</th>
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
                                  <td>#{+index + 1}</td>
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
                                        ₹
                                        {formatPriceWithCommas(
                                          product.discount || 0
                                        )}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="">
                                    <div className="flex justify-center">
                                      <input
                                        type="text"
                                        className="w-[36px] h-[36px] outline-none border-0 text-center bg-transparent text-[20px]"
                                        readOnly
                                        value={item.quantity}
                                      />
                                    </div>
                                  </td>
                                  <td className="w-[200px]">
                                    ₹{" "}
                                    {formatPriceWithCommas(item.subTotal || 0)}
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
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="col-sm-5">
                  <div className="card p-4">
                    <div className="table_responsive mt-3">
                      <table className="table table-bordered v-aligns">
                        <thead className="thead-dark">
                          <tr className="text-center">
                            <th colSpan={2}> Totals</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b text-center">
                            <td className="py-2 ">Subtotal</td>
                            <td className="text-center font-semibold text-green-600">
                              ₹{formatPriceWithCommas(totalAmount)}
                            </td>
                          </tr>
                          <tr className="border-b text-center">
                            <td className="py-2">Shipping</td>
                            <td className="text-center">
                              ₹ {shippingCostValue}
                            </td>
                          </tr>

                          <tr className="border-b text-center">
                            <td className="py-2">CGST + SGST (18%)</td>
                            <td className="text-center">
                              ₹{formatPriceWithCommas(finalTotalAmount)}
                            </td>
                          </tr>

                          <tr className="border-b text-center">
                            <td className="py-2">Total</td>
                            <td className="text-center text-green-600 font-semibold">
                              ₹{formatPriceWithCommas(grandTotals)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <Button type="submit" className="mt-3 btn-blue w-100">
                Confirm Order
              </Button>
            </form>
          )}

          {showPopup && (
            <OrderConfirmPopupBox
              orderId={showPopup.orderId}
              email_id={formdata.email_id}
            />
          )}
        </div>
      </div>
    </>
  );
}
