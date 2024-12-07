import { useDispatch, useSelector } from "react-redux";
import { Button, Pagination } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
/* import {
  getCartByUserId,
  userAddToCart,
  userRemoveToWishlist,
  UserValidation,
} from "../../../redux/user/UserThunk"; */
import { toast } from "react-toastify";
import { UserValidation, userRemoveToWishlist, userAddToCart, getCartByUserId } from "../../redux/User/UserThunk";

export default function WishlistPages() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const { allProducts, userData } = useSelector(
    (state) => state.user
  );
  const [wishlist, setWishlist] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userData && userData.wishlist) {
      setWishlist(userData.wishlist);
    }
  }, [userData]);

  // Filter products that are in the wishlist
  const wishlistProducts = allProducts.filter((product) =>
    wishlist.includes(product._id)
  );

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = wishlistProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleChangePage = (e, value) => {
    setCurrentPage(value);
  };

  const handleRemoveWishlist = async (productId) => {
    await dispatch(
      userRemoveToWishlist({
        productId,
        userId: userData._id,
        toast,
      })
    );

    dispatch(UserValidation());
  };

  const handleAddToCart = async (productId) => {
    if (!userData) {
      toast.success("Please log in to add items to your cart.");
      return;
    }

    await dispatch(
      userAddToCart({
        productId,
        userId: userData._id,
        toast

      })
    );

    dispatch(getCartByUserId(userData._id));

    await dispatch(UserValidation());


  };

  return (
    <div className="right-content w-100">
      <div className="card border-0 p-3 mt-4">
        <div className="flex justify-between">
          <h3 className="hd">Wishlist</h3>
        </div>

        <div className="table_responsive mt-3">
          <table className="table table-bordered v-aligns">
            <thead className="thead-dark">
              <tr>
                <th>UID</th>
                <th>Product</th>
                <th>Category</th>
                <th>Field</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Action</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.length > 0 ? (
                currentProducts.map((product, index) => (
                  <tr key={product._id}>
                    <td>#{indexOfFirstProduct + index + 1}</td>
                    <td>
                      <div className="d-flex align-items-center productBox gap-[20px]">
                        <div className="imageWrapper">
                          <div className="img">
                            <img
                              src={product.img1}
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
                          <p>{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td>{product.category}</td>
                    <td>{product.fields}</td>
                    <td className="w-[170px]">
                      <div style={{ width: "70px" }}>
                        <span className="new text-green-700 text-[15px] flex justify-center">
                          ₹{product.discount}
                        </span>
                        <div className="flex gap-4 text-[15px]">
                          <del className="old text-danger">
                            ₹{product.price}
                          </del>
                        </div>
                      </div>
                    </td>
                    <td>{product.qnt}</td>
                    <td className="w-[200px]">
                      <button className="secondary1 flex gap-[10px] text-[18px] bg-green-400 w-[100%] p-[10px] rounded-[10px] hover:bg-green-500" onClick={() => handleAddToCart(product._id)}>
                        <IoCartOutline className="flex items-center text-[27px]" />
                        <span>Add To Cart</span>
                      </button>
                    </td>
                    <td>
                      <Button
                        color="error"
                        className="error text-[22px]"
                        onClick={() => handleRemoveWishlist(product._id)}
                      >
                        <MdDelete />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    Wishlisit not available
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {wishlistProducts.length > 0 && (
            <div className="d-flex tableFooter">
              <p>
                Showing <b>{currentProducts.length}</b> of{" "}
                <b>{wishlistProducts.length}</b> results
              </p>
              <Pagination
                count={Math.ceil(wishlistProducts.length / productsPerPage)}
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
    </div>
  );
}
