

import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { categoryFetchApi } from "../../../User/redux/Admin/AdminThunk";
import { getAllCategories2 } from "../../../User/redux/User/UserThunk";



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

export default function AdminAddCategory() {
  const dispatch = useDispatch();
  /* const { categoriesData, categoryFields, allUsers } = useSelector(
    (state) => state.UserSliceProvider
  ); */
  /* console.log(categoriesData);
  console.log(categoryFields);

  console.log(allUsers); */
  const [formdata, setFormdata] = useState({
    categoryname: "",
    fields: [""],
  });

  const inputHandeler = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const addFields = () => {
    setFormdata((prev) => ({
      ...prev,
      fields: [...prev.fields, ""],
    }));
  };

  const handeleFieldChange = (index, value) => {
    const newFields = [...formdata.fields];
    newFields[index] = value;
    setFormdata({ ...formdata, fields: newFields });
  };

  const formhandeler = async (e) => {
    e.preventDefault();

    try {
     await dispatch(categoryFetchApi({ formdata, toast, setFormdata }));
     dispatch(getAllCategories2())

    } catch (error) {
      console.error("Error:", error);
    }
  };



  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4 justify-between">
          <h5 className="mb-3">Category Add</h5>
          <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb
              component="a"
              href="/admin"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb component="a" href="#" label="Category" />
            <StyledBreadcrumb component="a" href="#" label="Category Add" />
          </Breadcrumbs>
        </div>

        <form className="form" onSubmit={formhandeler}>
          <div className="row">
            <div className="col-sm-8 offset-md-2">
              <div className="card p-4">
                <h5 className="mb-4">Category Add</h5>

                <div className="form-group">
                  <h6>CATEGORY NAME</h6>
                  <input
                    type="text"
                    name="categoryname"
                    value={formdata.categoryname}
                    onChange={inputHandeler}
                  />
                </div>
                <div className="form-group">
                  {formdata.fields.map((field, index) => (
                    <div key={index} className="">
                      <input
                        type="text"
                        value={field}
                        placeholder={`Field ${index + 1}`}
                        className="border-2 border-black w-[70%] p-[5px] rounded-[15px] outline-none text-black mt-3"
                        onChange={(e) =>
                          handeleFieldChange(index, e.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addFields}
                  className="bg-green-400 mt-[20px] w-[200px] h-[40px] font-bold text-black rounded-[10px] "
                >
                  Add Another  Fields
                </button>
              </div>
            </div>
          </div>
          <div className="col-sm-8 offset-md-2"> 

          <Button type="submit" className="mt-3 btn-blue w-100">
            Category ADD
          </Button>
          </div>
        </form>
      </div>
    </>
  );
}
