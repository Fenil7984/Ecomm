import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import Pagination from "@mui/material/Pagination";
import { FaPencil } from "react-icons/fa6";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
//import { deleteCategory, getAllCategories2 } from "../../../redux/user/UserThunk";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import { deleteCategory, getAllCategories2 } from "../../../User/redux/User/UserThunk";

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

export default function AdminCategoryList() {
  const { categoriesData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 5; // 5 categories per page

  const handleDeleteCategory = (categoryId) => {
     dispatch(deleteCategory({ categoryId, toast }))
      .unwrap()
      .then(() => {
        dispatch(getAllCategories2());
      })
      .catch((err) => {
        console.error("Failed to delete category: ", err);
      });
  };

  const handleUpdateCategory = (category) => {
    navigate(`/admin/category/Update/${category._id}`, { state: { category } });
  };

  // Pagination logic
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categoriesData?.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };


  useEffect(()=>{
dispatch(getAllCategories2())
  },[dispatch])

  return ( 
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4 justify-between">
          <h5 className="mb-3">Category Manage</h5>
          <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb
              component="a"
              href="/admin"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb component="a" href="#" label="Category" />
          </Breadcrumbs>
        </div>
        <div className="card shadow border-0 p-3 mt-4">
          <h3 className="hd">Category List</h3>
          <div className="table_responsive mt-3">
            {currentCategories && currentCategories.length > 0 ? (
              <table className="table table-bordered v-aligns">
                <thead className="thead-dark">
                  <tr>
                    <th>UID</th>
                    <th>Name</th>
                    <th>Fields</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCategories.map((category, index) => (
                    <tr key={category._id}>
                      <td> #{indexOfFirstCategory + index + 1} </td>
                      <td>{category.categoryname}</td>
                      <td>
                        <div>
                          {category.fields &&
                            category.fields.map((field, idx) => (
                              <div key={idx}>{field}</div>
                            ))}
                        </div>
                      </td>
                      <td>
                        <div className="actions d-flex align-items-center gap-3">
                          <Button
                            color="success"
                            className="success"
                            onClick={() => handleUpdateCategory(category)}
                          >
                            <FaPencil />
                          </Button>
                          <Button
                            color="error"
                            className="error"
                            onClick={() => handleDeleteCategory(category._id)}
                          >
                            <MdDelete />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="no-data-message">
                <p className="text-[30px] text-center">
                  Category not available
                </p>
              </div>
            )}

            {categoriesData && categoriesData.length > 0 && (
              <div className="d-flex tableFooter">
                <p>
                  Showing <b>{currentCategories.length}</b> of{" "}
                  <b>{categoriesData.length}</b> results
                </p>
                <Pagination
                  count={Math.ceil(categoriesData.length / categoriesPerPage)}
                  page={currentPage}
                  color="primary"
                  className="pagination"
                  onChange={handleChangePage}
                  showFirstButton
                  showLastButton
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
