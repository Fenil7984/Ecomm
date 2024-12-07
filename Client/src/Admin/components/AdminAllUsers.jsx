import {
  Breadcrumbs,
  Button,
  Chip,
  emphasize,
  Pagination,
  styled,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
/* import {

  deleteUser,

} from "../../redux/user/UserThunk"; */

import { MdDelete } from "react-icons/md";
import HomeIcon from "@mui/icons-material/Home";
/* import { getAllUsersFetchApi } from "../../redux/admin/AdminThunk"; */
import { toast } from "react-toastify";
import { deleteUser, getAllUsersFetchApi } from "../../User/redux/User/UserThunk";

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

export default function AdminAllUsers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // Update this to `usersPerPage` to match the context
  const { allUsers } = useSelector((state) => state.user);

  console.log("All Users:", allUsers);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = allUsers?.data?.slice(indexOfFirstUser, indexOfLastUser);

  const handleChangePerPage = (event, value) => {
    setCurrentPage(value);
  };

  const handeleDeleteUser = async (userId) => {
    await dispatch(deleteUser({ userId, toast })); 

    dispatch(getAllUsersFetchApi());
  };

  return (
    <>
      <div className="right-content w-100">
        <div className="card  border-0 w-100 flex-row p-4 justify-between">
          <h5 className="mb-3">Users Manage</h5>
          <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb
              component="a"
              href="/admin"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb component="a" href="#" label="Users" />
          </Breadcrumbs>
        </div>

        <div className="card  border-0 p-3 mt-4">
          <h3 className="hd"> Users Manage</h3>

          <div className="table_responsive mt-3">
            <table className="table table-bordered v-aligns">
              <thead className="thead-dark">
                <tr>
                  <th>UID</th>
                  <th>Username</th>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  
                  <th>Email Id</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allUsers?.data && allUsers?.data?.length > 0 ? (
                  currentUsers.map((user, index) => (
                    <tr key={user._id}>
                      <td> #{indexOfFirstUser + index + 1} </td>
                      <td>
                        <div className="d-flex align-items-center productBox gap-3">
                          <div className="imageWrapper">
                            <div className="img">
                              <img
                                src={user.profileImg}
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
                            <h6>{user.username}</h6>
                          </div>
                        </div>
                      </td>
                      <td className="">{user.fname}</td>
                      <td className="">{user.lname}</td>
                     
                   
                    
                      <td>{user.email_id}</td>
                      <td>
                        <div className="actions d-flex align-items-center gap-3">
                          <Button
                            color="error"
                            className="error"
                            onClick={() => handeleDeleteUser(user._id)}
                          >
                            <MdDelete />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      Users not available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {allUsers && allUsers.length > 0 && (
              <div className="d-flex tableFooter justify-content-between mt-3">
                <p>
                  Showing <b>{currentUsers.length}</b> of{" "}
                  <b>{allUsers.length}</b> results
                </p>
                <Pagination
                  count={Math.ceil(allUsers.length / usersPerPage)}
                  color="primary"
                  className="pagination"
                  showFirstButton
                  showLastButton
                  onChange={handleChangePerPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
