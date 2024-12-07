import { useDispatch, useSelector, /* useSelector */ } from "react-redux";
import { useNavigate } from "react-router-dom";
/* import {

  getAllProductsFecthApi,
} from "../../../redux/user/UserThunk"; */
import {
  Breadcrumbs,
  Button,
 
  Chip,
  emphasize,
  Pagination, 
  styled,
} from "@mui/material";
import { FaEye, FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import HomeIcon from "@mui/icons-material/Home";
import { useEffect, useState } from "react";
import { deleteProduct, getAllProductsFecthApi } from "../../../User/redux/User/UserThunk";
import { toast } from "react-toastify";



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
export default function AdminProductManage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const { allProducts } = useSelector(
    (state) => state.user
  );
  console.log("allProducts:",allProducts);
  // console.log(allUsers);

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

  const addProduct = () => {
    navigate("/admin/addproducts");
  };

   useEffect(() => {
    dispatch(getAllProductsFecthApi())
  },[]) 
  return (
    <>
      <div className="right-content w-100">
        <div className="card  border-0 w-100 flex-row p-4 justify-between">
          <h5 className="mb-3">Products Manage</h5>
          <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb
              component="a"
              href="/admin"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb component="a" href="#" label="Products" />
          </Breadcrumbs>
        </div>

        <div className="card  border-0 p-3 mt-4">
          <div className="flex justify-between">
            <h3 className="hd"> Products Manage</h3>
            <button
              type="button"
              onClick={addProduct}
              className="bg-green-400 w-[200px] h-[40px] font-bold text-black rounded-[10px] "
            >
              Add Product
            </button>
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
                    const regularPrice = product.price;
                    const discountPrice = product.discount;
                    const discountPercentage = (
                      ((regularPrice - discountPrice) / regularPrice) *
                      100
                    ).toFixed(2); // Calculate percentage difference and format to 2 decimal places

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
                          <div style={{ width: "70px" }}>
                            <span className="new text-green-700 text-[15px] flex justify-center ">
                              ₹ {discountPrice}
                            </span>

                            <div className="flex gap-4 text-[15px]">
                              <del className="old text-danger">
                                ₹{regularPrice}
                              </del>
                           
                            </div>
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