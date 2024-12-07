import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
/* import {
  categoryByFieldsFetchApi,
  getAllProductsFecthApi,
} from "../../../redux/user/UserThunk"; */
/* import {
  productUpdatedFetchApi,
} from "../../../redux/admin/AdminThunk"; */
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { categoryByFieldsFetchApi, getAllProductsFecthApi } from "../../../User/redux/User/UserThunk";
import { productUpdatedFetchApi } from "../../../User/redux/Admin/AdminThunk";


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

export default function AdminProductsUpdateds() {
  const dispatch = useDispatch();
  const { categoriesData, categoryFields, allUsers } = useSelector(
    (state) => state.user
  );

  const location = useLocation();
  const { product } = location.state || {};
  console.log(categoriesData);
  console.log(categoryFields);

  console.log(allUsers);
  const [formdata, setFormdata] = useState({
    category: "",
    fields: "",
    img1: null,
    img1Preview: null,
    img2: null,
    img2Preview: null,
    img3: null,
    img3Preview: null,
    img4: null,
    img4Preview: null,
    img5: null,
    img5Preview: null,
    title: "",
    price: "",
    discount: "",
    qnt: "",
    discription: "",
  });


  useEffect(() => {
    if (product) {
      setFormdata({
        ...formdata,
        category: product.category || "",
        fields: product.fields || "",
        img1Preview: product.img1 || null,
        img2Preview: product.img2 || null,
        img3Preview: product.img3 || null,
        img4Preview: product.img4 || null,
        img5Preview: product.img5 || null,
        title: product.title || "",
        price: product.price || "",
        discount: product.discount || "",
        qnt: product.qnt || "",
        discription: product.discription || "",
      });
    }
  }, [product]);

   useEffect(() => {
    if (formdata.category) {
      dispatch(categoryByFieldsFetchApi(formdata.category));
    }
  }, [formdata.category, dispatch]); 
  
  const handleInputChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };
  const selectHandeler = (e) => {
    setFormdata({ ...formdata, category: e.target.value });
  };
  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormdata((prevState) => ({
        ...prevState,
        [fieldName]: file, // Store the actual file object
        [`${fieldName}Preview`]: URL.createObjectURL(file), // Create a URL for preview
      }));
    } else {
      console.error("Please upload a valid image file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("product id:", product._id);
    const formData = new FormData();

    Object.keys(formdata).forEach((key) => {
      if (formdata[key] instanceof File) {
        formData.append(key, formdata[key]); // Append file objects
      } else {
        formData.append(key, formdata[key]); // Append other fields
      }
    });

    try {
      const response = await dispatch(
         productUpdatedFetchApi({ formdata, productId: product._id,toast }) 
      );
      console.log("Product updated successfully:", response);

      // Fetch all products after successful addition
     await dispatch(getAllProductsFecthApi());
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const fielSelectHandeler = (e) => {
    setFormdata({ ...formdata, fields: e.target.value });
  };
  const handleEditClick = (fieldName) => {
    document.getElementById(fieldName).click();
  };
  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4 justify-between">
          <h5 className="mb-3">Product Update</h5>
          <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb
              component="a"
              href="/admin"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb component="a" href="#" label="Products" />
            <StyledBreadcrumb component="a" href="#" label="Product Update" />
          </Breadcrumbs>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-7">
              <div className="card p-4">
                <h5 className="mb-4">Basic Information</h5>

                <div className="form-group">
                  <h6>TITLE</h6>
                  <input
                    type="text"
                    name="title"
                    value={product.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <h6>DESCRIPTION</h6>
                  <textarea
                    name="discription"
                    rows={5}
                    cols={10}
                    value={product.discription}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <h6>CATEGORY</h6>
                      <select
                        name="category"
                        id="category"
                        className="cursor-pointer"
                        onChange={selectHandeler}
                        value={formdata.category}
                      >
                        <option value="">
                          Select Category
                        </option>
                        {categoriesData &&
                          categoriesData.map((category) => (
                            <option
                              key={category._id}
                              value={category.categoryname}
                            >
                              {category.categoryname}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <h6>FIELDS</h6>
                      <select
                        type="text"
                        name="fields"
                        value={formdata.fields}
                        placeholder="fields"
                        className="fields_selects cursor-pointer"
                        onChange={fielSelectHandeler}
                      >
                        <option value="">Select Field</option>
                        {categoryFields &&
                          Array.isArray(categoryFields.fields) &&
                          categoryFields.fields.map((field, index) => (
                            <option key={index} value={field}>
                              {field}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <h6>REGULAR PRICE</h6>
                      <input
                        type="text"
                        name="price"
                        value={formdata.price}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <h6>DISCOUNT PRICE</h6>
                      <input
                        type="text"
                        name="discount"
                        value={formdata.discount}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <h6>QUANTITY</h6>
                      <input
                        type="text"
                        name="qnt"
                        value={formdata.qnt}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-5">
              <div className="card p-4">
                <h1 className="mb-4">Upload Images</h1>
                <div className="flex justify-between">
                  <div>
                    <label>IMAGE 1</label>
                    <div className="file_upload">
                      <input
                        id="img1"
                        name="img1"
                        type="file"
                        onChange={(e) => handleFileChange(e, "img1")}
                        style={{ display: "none" }}
                      />
                      <div
                        style={{
                          width: "150px",
                          height: "150px",
                          border: "1px dashed grey",
                          borderRadius: "5px",
                          cursor: "pointer",
                          backgroundImage: formdata.img1Preview
                            ? `url(${formdata.img1Preview})`
                            : `url(../../../assets/uploaded.jpg)`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          position: "relative",
                        }}
                        onClick={() => handleEditClick("img1")}
                      >
                        {!formdata.img1Preview && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              height: "100%",
                              color: "grey",
                              fontSize: "14px",
                            }}
                          >
                            Upload Image
                          </div>
                        )}
                      </div>
                      <Button
                        className="btn-blue w-100 mt-[10px]"
                        onClick={() => handleEditClick("img1")}
                      >
                        {formdata.img1Preview ? "Change Image" : "Upload Image"}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label>IMAGE 2</label>
                    <div className="file_upload">
                      <input
                        id="img2"
                        name="img2"
                        type="file"
                        onChange={(e) => handleFileChange(e, "img2")}
                        style={{ display: "none" }}
                      />
                      <div
                        style={{
                          width: "150px",
                          height: "150px",
                          border: "1px dashed grey",
                          borderRadius: "5px",
                          cursor: "pointer",
                          backgroundImage: formdata.img2Preview
                            ? `url(${formdata.img2Preview})`
                            : `url(../../../assets/uploaded.jpg)`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          position: "relative",
                        }}
                        onClick={() => handleEditClick("img2")}
                      >
                        {!formdata.img2Preview && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              height: "100%",
                              color: "grey",
                              fontSize: "14px",
                            }}
                          >
                            Upload Image
                          </div>
                        )}
                      </div>
                      <Button
                        className="btn-blue w-100 mt-[10px]"
                        onClick={() => handleEditClick("img2")}
                      >
                        {formdata.img2Preview ? "Change Image" : "Upload Image"}
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <label>IMAGE 3</label>
                    <div className="file_upload">
                      <input
                        id="img3"
                        name="img3"
                        type="file"
                        onChange={(e) => handleFileChange(e, "img3")}
                        style={{ display: "none" }}
                      />
                      <div
                        style={{
                          width: "150px",
                          height: "150px",
                          border: "1px dashed grey",
                          borderRadius: "5px",
                          cursor: "pointer",
                          backgroundImage: formdata.img3Preview
                            ? `url(${formdata.img3Preview})`
                            : `url(../../../assets/uploaded.jpg)`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          position: "relative",
                        }}
                        onClick={() => handleEditClick("img3")}
                      >
                        {!formdata.img3Preview && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              height: "100%",
                              color: "grey",
                              fontSize: "14px",
                            }}
                          >
                            Upload Image
                          </div>
                        )}
                      </div>
                      <Button
                        className="btn-blue w-100 mt-[10px]"
                        onClick={() => handleEditClick("img3")}
                      >
                        {formdata.img3Preview ? "Change Image" : "Upload Image"}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label>IMAGE 4</label>
                    <div className="file_upload">
                      <input
                        id="img4"
                        name="img4"
                        type="file"
                        onChange={(e) => handleFileChange(e, "img4")}
                        style={{ display: "none" }}
                      />
                      <div
                        style={{
                          width: "150px",
                          height: "150px",
                          border: "1px dashed grey",
                          borderRadius: "5px",
                          cursor: "pointer",
                          backgroundImage: formdata.img4Preview
                            ? `url(${formdata.img4Preview})`
                            : `url(../../../assets/uploaded.jpg)`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          position: "relative",
                        }}
                        onClick={() => handleEditClick("img4")}
                      >
                        {!formdata.img4Preview && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              height: "100%",
                              color: "grey",
                              fontSize: "14px",
                            }}
                          >
                            Upload Image
                          </div>
                        )}
                      </div>
                      <Button
                        className="btn-blue w-100 mt-[10px]"
                        onClick={() => handleEditClick("img4")}
                      >
                        {formdata.img4Preview ? "Change Image" : "Upload Image"}
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <label>IMAGE 5</label>
                    <div className="file_upload">
                      <input
                        id="img5"
                        name="img5"
                        type="file"
                        onChange={(e) => handleFileChange(e, "img5")}
                        style={{ display: "none" }}
                      />
                      <div
                        style={{
                          width: "150px",
                          height: "150px",
                          border: "1px dashed grey",
                          borderRadius: "5px",
                          cursor: "pointer",
                          backgroundImage: formdata.img5Preview
                            ? `url(${formdata.img5Preview})`
                            : `url(../../../assets/uploaded.jpg)`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          position: "relative",
                        }}
                        onClick={() => handleEditClick("img5")}
                      >
                        {!formdata.img5Preview && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              height: "100%",
                              color: "grey",
                              fontSize: "14px",
                            }}
                          >
                            Upload Image
                          </div>
                        )}
                      </div>
                      <Button
                        className="btn-blue w-100 mt-[10px]"
                        onClick={() => handleEditClick("img5")}
                      >
                        {formdata.img5Preview ? "Change Image" : "Upload Image"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Button type="submit" className="mt-3 btn-blue w-100">
            PRODUCT UPDATE
          </Button>
        </form>
      </div>
    </>
  );
}