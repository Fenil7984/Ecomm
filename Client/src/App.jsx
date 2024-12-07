import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./Index";
import UserIndex from "./User/UserIndex";
import Home from "./User/components/Home";
import Register from "./User/components/Register";
import AdminIndex from "./Admin/AdminIndex";
import "./App.css";
import Login from "./User/components/Login";
import ForgetPassword from "./User/components/Forgetpassword";
import VerifyOtp from "./User/components/Verifyotp";
import ResetPassword from "./User/components/Resetpassword";
import UpdatePassword from "./User/components/Updatepassword";
import AdminLogin from "./Admin/components/AdminLogin";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminAddProduct from "./Admin/components/products/AdminAddProduct";
import AdminAddCategory from "./Admin/components/products/AdminAddCategory";
import AdminCategoryList from "./Admin/components/products/AdminCategoryList";
import AdminUpdateCategory from "./Admin/components/products/AdminUpdateCategory";
import AdminNotification from "./Admin/components/products/AdminNotification";
import AdminProductManage from "./Admin/components/products/AdminProductManage";
import AdminProductsUpdateds from "./Admin/components/products/AdminProductsUpdate";
import AdminProductsDetails from "./Admin/components/products/AdminProductDetails";
import AdminDashbord from "./Admin/components/Dashboard";
import AdminAllUsers from "./Admin/components/AdminAllUsers";
import Products from "./User/components/Products/Products";
import { Herosec } from "./User/components/Products/ProductsDetails";
import ProductFilter from "./User/components/Products/ProductFilter";
import FilteredProductsPage from "./User/components/Products/FilterProductsRange";
import FilteredProducts from "./User/components/Products/FilteredProducts";
import SearchResults from "./User/components/Products/SearchResult";
import CartsPage from "./User/components/Products/CartsPage";
import ProcessToCheckoutPage from "./User/components/Products/ProcessToCheckoutPage";
import OrderConfirmPopupBox from "./User/components/Products/OrderConfirmPopupBox";
import Productspage from "./User/components/Products/ProductsPage";
import WishlistPages from "./User/components/Products/WishlsitPage";
import UserOrders from "./User/components/orders/UserOrders";
import RelatedProducts from "./User/components/Products/ReletedProducts";
import AdminAllOrders from "./Admin/components/products/AdminAllOrders";
import Footer from "./User/modules/Footer";
import PrivacyPolicy from "./User/components/PrivacyPolicy";
import TermsAndConditions from "./User/components/TermsCondition";
import ContactUs from "./User/components/ContectUs";
import AdminContacts from "./Admin/AdminContacts";



const Router = createBrowserRouter([
    {
        path: "/",
        element: <Index />,
        children: [
            {
                path: "/",
                element: <UserIndex />,
                children: [
                    { path: "/", element: <Home /> },
                    { path: "/register", element: <Register /> },
                    { path: "/login", element: <Login /> },
                    { path: "/forget-password", element: <ForgetPassword /> },
                    { path: "/verify-otp", element: <VerifyOtp /> },
                    { path: "/reset-password", element: <ResetPassword /> },
                    { path: "/update-password", element: <UpdatePassword /> },
                    { path: "/products", element: <Productspage /> },
                    //{ path: "/add/products", element: <UserProductsAdd /> },
                    { path: "/viewProduct/:id", element: <Herosec /> },
                    { path: "/productFilter", element: <ProductFilter /> },
                    { path: "/filtered-products", element: <FilteredProductsPage /> },
                    { path: "/filtered-products/:category", element: <FilteredProducts /> },
                    { path: "/search-results", element: <SearchResults /> },
                    { path: "/wishlsit", element: <WishlistPages /> },
                    { path: "/carts", element: <CartsPage /> },
                    { path: "/processToCheckout", element: <ProcessToCheckoutPage /> },
                    { path: "/related/:productId", element: <RelatedProducts /> },
                    { path: "/oderConfirmMsg", element: <OrderConfirmPopupBox /> },
                    { path: "/orders", element: <UserOrders /> },
                    { path: "/footer", element: <Footer /> },
                    { path: "/privacyPolicy", element: <PrivacyPolicy /> },
                    { path: "/termsCondition", element: <TermsAndConditions /> },
                    { path: "/contact-us", element: <ContactUs /> },
                    //{ path: "/category/add", element: <UserCategoryAdd /> },

                ]
            },

            {
                path: "/admin",
                element: <AdminIndex />,
                children: [
                    { path: "/admin", element: <AdminDashbord /> },
                    { path: "/admin/login", element: <AdminLogin /> },
                    { path: "/admin/addproducts", element: <AdminAddProduct /> },
                    { path: "/admin/category", element: <AdminAddCategory /> },
                    { path: "/admin/category/list", element: <AdminCategoryList /> },
                    { path: "/admin/category/Update/:id", element: <AdminUpdateCategory /> },

                    { path: "/admin/notification", element: <AdminNotification /> },
                    { path: "/admin/productsdetails/products/:id", element: <AdminProductsDetails /> },
                    /*   { path: "/admin/productsdetails/products/:id", element: <AdminProductsDetails /> }, */
                    { path: "/admin/productManage", element: <AdminProductManage /> },
                    /*   { path: "/admin/allUsers", element: <AdminAllUsers /> }, */
                    { path: "/admin/products/update/:id", element: <AdminProductsUpdateds /> },
                    { path: "/admin/allUsers", element: <AdminAllUsers /> },
                    { path: "/admin/allOrders1", element: <AdminAllOrders /> },
                    { path: "/admin/contact-messages", element: <AdminContacts /> },
                      /*   { path: "/admin/productsdetailspage/products/:id", element: <AdminProductsDetailsPage /> },
                      { path: "/admin/contacts", element: <AdminContacts /> }, */


                ]
            }
        ]
    }

])

function App() {
    return (
        <>
            <RouterProvider router={Router}></RouterProvider>
        </>
    )
}

export default App


