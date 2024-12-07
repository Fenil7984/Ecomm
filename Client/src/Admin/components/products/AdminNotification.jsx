
import {
    Breadcrumbs,
    Button,
    Chip,
    emphasize,
    Pagination,
    styled,
  } from "@mui/material";
  import HomeIcon from "@mui/icons-material/Home";
  import { useEffect, useState } from "react";
 // import { getAllCategories2, getAllProductsFecthApi, getNotification, getUsersCategoryAdded } from "../../../redux/user/UserThunk";
  import { useDispatch, useSelector } from "react-redux";
  import { useNavigate } from "react-router-dom";
 // import { approvalCategory, approvedProduct, deleteCategoryNotification, deleteNotification } from "../../../redux/admin/AdminThunk";
  import { toast } from "react-toastify";
  import { FaEye } from "react-icons/fa";
  import { FaPencil } from "react-icons/fa6";
  import { MdDelete } from "react-icons/md";
  import { FcApproval } from "react-icons/fc";
  // Styled Breadcrumb component using Material-UI's styled API
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
  
  // AdminNotification Component
  export default function AdminNotification() {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const notificationsPerPage = 5;
    const notificationsCategoryPerPage = 5;
  
    const { notifications = [],UsersCategory } = useSelector(
      (state) => state.UserSliceProvider
    );
    // useEffect(() => {
    //   dispatch(getUsersCategoryAdded());
    // }, [dispatch]);
    
    // const { UsersCategory } = useSelector((state) => state.AdminSliceProvider);
    console.log("Redux UsersCategory:", UsersCategory);
    const navigate = useNavigate();
  
    const indexOfLastNotification = currentPage * notificationsPerPage;
    const indexOfFirstNotification =
      indexOfLastNotification - notificationsPerPage;
    const currentNotifications = notifications.slice(
      indexOfFirstNotification,
      indexOfLastNotification
    );
  
  
  
    const indexOfLastCategoryNotification = currentPage * notificationsPerPage;
    const indexOfFirstCategoryNotification =
      indexOfLastNotification - notificationsPerPage;
    const currentCategoryNotifications = UsersCategory.slice(
      indexOfFirstCategoryNotification,
      indexOfLastCategoryNotification
    );
  
  /*   useEffect(() => {
      dispatch(getNotification());
    }, [dispatch]); */
  
    const handleApprove = async (productId, notificationId) => {
     /*  await dispatch(approvedProduct({ productId, notificationId,toast }));
      await dispatch(getAllProductsFecthApi());
      dispatch(getNotification()); */
    };
  
    const handleProductClick = (id) => {
      navigate(`/admin/productsdetailspage/products/${id}`);
    };
    const handeleDeleteNotification = async (notificationId,productId) => {
   /*  await dispatch(deleteNotification({notificationId,productId,toast}))
   await dispatch(getNotification())
   dispatch(getAllProductsFecthApi()) */
    }
    const handleCategoryApprove = async (categoryId) => {
     /*  await dispatch(approvalCategory({ categoryId,toast }));
      await dispatch(getAllCategories2());
      dispatch(getUsersCategoryAdded()); */
    };
  
  
    const handeleCategoryDelete = async (categoryId) => {
    await dispatch(deleteCategoryNotification({categoryId,toast}))
   await dispatch(getUsersCategoryAdded())
  //  dispatch(getAllProductsFecthApi())
    }
    
  
    useEffect(() => {
      dispatch(getUsersCategoryAdded())
    },[dispatch])
    return (
      <>
      <div className="right-content w-100">
        <div className="card border-0 w-100 flex-row p-4 justify-between">
          <h5 className="mb-3">Notifications</h5>
          <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb
              component="a"
              href="/admin"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb component="a" href="#" label="Notification" />
          </Breadcrumbs>
        </div>
  
        <div className="card border-0 p-3 mt-4">
          <div className="flex justify-between">
            <h3 className="hd">Notifications  For Product Added</h3>
          </div>
  
          <div
            className="table-responsive-scrollable mt-3 tableAdmin"
            style={{ overflowX: "auto" }}
          >
            <table className="table table-bordered v-aligns text-center">
              <thead className="thead-dark">
                <tr>
                  <th>UID</th>
                  <th style={{ whiteSpace: "nowrap" }}>User Name</th>
                  <th>User Email Id</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentNotifications.length > 0 ? (
                  currentNotifications.map((notification, index) => {
                    return (
                      <tr key={notification._id}>
                        <td>#{indexOfFirstNotification + index + 1}</td>
                        <td>{`${notification.recipient.fname} ${notification.recipient.lname}`}</td>
                        <td>{notification.recipient.email}</td>
                        <td>
                          <div className="d-flex align-items-center productBox gap-[20px]">
                            <div className="imageWrapper">
                              <div className="img">
                                <img
                                  src={notification.products.img1}
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
                              <h6>{notification.products.title}</h6>
                            </div>
                          </div>
                        </td>
                        <td className="w-[170px]">
                          <div>
                            <span className="new text-green-700 text-[15px] flex justify-center ">
                              ₹ {notification.products.discount}
                            </span>
                          </div>
                        </td>
                 <td>
                            <div className="actions d-flex align-items-center gap-3">
                              <Button
                              color="secondary"
                              className="secondary"
                              onClick={() =>
                                handleProductClick(notification.products.productId)}
                              >
                                <FaEye />
                              </Button>
  
                              <Button
                                color="success"
                                className="success"
                                onClick={() =>
                                  handleApprove(
                                    notification.products.productId,
                                    notification._id
                                  )
                                }
                              >
                                <FcApproval />
                              </Button>
                              <Button
                                color="error"
                                className="error"
                                onClick={()=>handeleDeleteNotification(notification._id,notification.products.productId)}
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
                      No notifications available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
  
            {notifications.length > 0 && (
              <div className="d-flex tableFooter">
                <p>
                  Showing <b>{notifications.length}</b> of{" "}
                  <b>{notifications.length}</b> results
                </p>
                <Pagination
                  count={Math.ceil(notifications.length / notificationsPerPage)}
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
          
  
          <div className="card border-0 p-3 mt-4">
          <div className="flex justify-between">
            <h3 className="hd">Notifications  For Category Added</h3>
          </div>
  
          <div
            className="table-responsive-scrollable mt-3 tableAdmin"
            style={{ overflowX: "auto" }}
          >
            <table className="table table-bordered v-aligns text-center">
              <thead className="thead-dark">
                <tr>
                  <th>UID</th>
                  <th style={{ whiteSpace: "nowrap" }}>User Name</th>
                  <th>User Email Id</th>
                  <th>Category Name</th>
                  <th>Fields</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
    {currentCategoryNotifications.length > 0 ? (
      currentCategoryNotifications.map((categoryUsers, index) => {
        // Check if categoryUsers.recipient exists
        const recipient = categoryUsers.recipient || {};
  
        return (
          <tr key={categoryUsers._id}>
            <td>#{indexOfFirstCategoryNotification + index + 1}</td>
            
            {/* Check if recipient has fname, lname, and email */}
            <td>{`${recipient.fname || "N/A"} ${recipient.lname || ""}`}</td>
            <td>{recipient.email || "No email available"}</td>
            
            {/* Display category name */}
            <td className="w-[170px]">
              <div>
                <span className="new text-green-700 text-[15px] flex justify-center ">
                  {categoryUsers.categoryname}
                </span>
              </div>
            </td>
  
            {/* Display fields associated with the category */}
            <td>
              {categoryUsers.fields.length > 0 ? (
                <ul>
                  {categoryUsers.fields.map((field, i) => (
                    <li key={i}>{field}</li>
                  ))}
                </ul>
              ) : (
                <span>No fields available</span>
              )}
            </td>
            
            <td>
              <div className="actions d-flex align-items-center gap-3">
               
  
                <Button color="success" className="success" onClick={()=>handleCategoryApprove(categoryUsers._id)}>
                  <FcApproval />
                </Button>
  
                <Button color="error" className="error" onClick={()=>handeleCategoryDelete(categoryUsers._id)}>
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
          No notifications available
        </td>
      </tr>
    )}
  </tbody>
  
  
            </table>
  
            {UsersCategory.length > 0 && (
              <div className="d-flex tableFooter">
                <p>
                  Showing <b>{UsersCategory.length}</b> of{" "}
                  <b>{UsersCategory.length}</b> results
                </p>
                <Pagination
                  count={Math.ceil(UsersCategory.length / notificationsCategoryPerPage)}
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
      </div>
      </>
    );
  }
  