/* eslint-disable react-hooks/exhaustive-deps */
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
/* import {
  deleteFieldFromCategory,
  getAllCategories2,
  updateCategory,
} from "../../../redux/user/UserThunk"; */
import { useLocation } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
/* import { deleteFieldFromCategory } from "../../../../../Server/controllers/categoryController"; */
import { deleteFieldFromCategory, getAllCategories2, updateCategory } from "../../../User/redux/User/UserThunk";
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

export default function AdminUpdateCategory() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { category } = location.state || {};

  const [formdata, setFormdata] = useState({
    categoryname: category?.categoryname || "",
    fields: category?.fields || [""],
  });

  useEffect(() => {
    if (category) {
      setFormdata({
        categoryname: category.categoryname || "",
        fields: category.fields || [""],
      });
    }
  }, [category]);

  const inputHandler = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const addFields = () => {
    setFormdata((prev) => ({
      ...prev,
      fields: [...prev.fields, ""],
    }));
  };
  const removeField = async (index) => {
    const fieldToRemove = formdata.fields[index];
  
    if (!fieldToRemove) {
      console.error("Field to remove is not specified.");
      return;
    }
  
    try {
      // Remove the field from the backend
      await dispatch(deleteFieldFromCategory(category._id, fieldToRemove,toast));
  
      // Remove the field locally
      setFormdata((prev) => ({
        ...prev,
        fields: prev.fields.filter((_, idx) => idx !== index),
      }));
  
      // Fetch updated categories and update local state
      const updatedCategories = await dispatch(getAllCategories2());
  
      if (updatedCategories && updatedCategories.payload) {
        const updatedCategory = updatedCategories.payload.find(cat => cat._id === category._id);
        if (updatedCategory) {
          setFormdata({
            ...formdata,
            fields: updatedCategory.fields, // Update the fields with the latest from the API
          });
        }
      } 
  
      console.log("Categories updated successfully.");
    } catch (error) {
      console.error("Failed to delete field or fetch updated categories:", error);
    }
  };
  
  useEffect(() => {
    const fetchUpdatedCategories = async () => {
      try {
        const updatedCategories = await dispatch(getAllCategories2());
        const updatedCategory = updatedCategories.payload.find(cat => cat._id === category._id);
         if (updatedCategory) {
          setFormdata({
            ...formdata,
            fields: updatedCategory.fields,
          });
        } 
      } catch (error) {
        console.error("Failed to fetch updated categories:", error);
      }
    };
  
    fetchUpdatedCategories();
  }, [dispatch]);
  
  const handleFieldChange = (index, value) => {
    const newFields = [...formdata.fields];
    newFields[index] = value;
    setFormdata({ ...formdata, fields: newFields });
  };

  const formHandler = async (e) => {
    e.preventDefault();
    console.log(formdata);
  
    try {
      // Update the category with the form data
       await dispatch(
        updateCategory({ categoryId: category._id, categoryData: formdata,toast})
      ).unwrap(); 
  
      // Call getAllCategories2 after successfully updating the category
      await dispatch(getAllCategories2());
  
      console.log("Category updated and categories fetched successfully.");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4 justify-between">
          <h5 className="mb-3">Update Category</h5>
          <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb
              component="a"
              href="/admin"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb component="a" href="#" label="Category" />
            <StyledBreadcrumb component="a" href="#" label="Update Category" />
          </Breadcrumbs>
        </div>

        <form className="form" onSubmit={formHandler}>
          <div className="row">
            <div className="col-sm-8 offset-md-2">
              <div className="card p-4">
                <h5 className="mb-4">Update Category</h5>

                <div className="form-group">
                  <h6>CATEGORY NAME</h6>
                  <input
                    type="text"
                    name="categoryname"
                    value={formdata.categoryname}
                    onChange={inputHandler}
                    className="border-2 border-black w-[70%] p-[5px] rounded-[15px] outline-none text-black"
                  />
                </div>
                <div className="form-group">
                  <h6>FIELDS</h6>
                  {formdata.fields && formdata.fields.length > 0 ? (
                    formdata.fields.map((field, index) => (
                      <div key={index} className="relative mt-3">
                        <div className="absolute top-0 right-0 m-2">
                          <Button
                            color="error"
                            className="error" // Adjust margin for spacing
                            onClick={() => removeField(index)}
                          >
                            <MdDelete />
                          </Button>
                        </div>
                        <input
                          type="text"
                          value={field}
                          placeholder={`Field ${index + 1}`}
                          className="border-2 border-black w-[70%] p-[5px] rounded-[15px] outline-none text-black pl-8"
                          onChange={(e) =>
                            handleFieldChange(index, e.target.value)
                          }
                        />
                      </div>
                    ))
                  ) : (
                    <h3 className="text-center text-[25px]">
                      No Fields Available
                    </h3>
                  )}
                </div>

                <button
                  type="button"
                  onClick={addFields}
                  className="bg-green-400 mt-[20px] w-[200px] h-[40px] font-bold text-black rounded-[10px]"
                >
                  Add Another Field
                </button>
              </div>
            </div>
          </div>
          <div className="col-sm-8 offset-md-2">
            <Button type="submit" className="mt-3 btn-blue w-100">
              Update Category
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
