

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Breadcrumbs,
  Button,
  Chip,
  emphasize,
  FormControl,
  MenuItem,
  Select,
  styled,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { MdDelete } from "react-icons/md";
import { deleteContactFetchApi, getContactsFetchApi } from "../User/redux/User/UserThunk";

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

export default function AdminContacts() {
  const [sortBy, setSortBy] = useState("latest");
  const dispatch = useDispatch();
  const { getAllContacts = [] } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getContactsFetchApi(sortBy));
  }, [dispatch, sortBy]);

  const handleDeleteContact = async (contactId) => {
    await dispatch(deleteContactFetchApi(contactId));
    dispatch(getContactsFetchApi(sortBy));
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value); // Update sort state
  };

  return (
    <>
      <div className="right-content w-100">
        <div className="card border-0 w-100 flex-row p-4 justify-between">
          <h5 className="mb-3">Contacts</h5>
          <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb
              component="a"
              href="/admin"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb component="a" href="#" label="Contacts" />
          </Breadcrumbs>
        </div>

        <div className="card border-0 p-3 mt-4">
          <div className="flex justify-between">
            <div className="col-md-3">
              <h4>Show By</h4>
              <FormControl
                sx={{ m: 1, minWidth: 120 }}
                size="small"
                className="w-100"
              >
                <Select
                  value={sortBy}
                  onChange={handleSortChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  className="w-100 mt-2"
                >
                  <MenuItem value="latest">Latest</MenuItem>
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                  <MenuItem value="yearly">Yearly</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div
            className="table-responsive-scrollable mt-3 tableAdmin"
            style={{ overflowX: "auto" }}
          >
            <table className="table table-bordered v-aligns text-center">
              <thead className="thead-dark">
                <tr>
                  <th>UID</th>
                  <th style={{ whiteSpace: "nowrap" }}>Name</th>
                  <th>Email Id</th>
                  <th style={{ whiteSpace: "nowrap" }}>Contact Number</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {getAllContacts?.data?.length > 0 ? (
                  getAllContacts?.data?.map((contact, index) => (
                    <tr key={contact._id}>
                      <td>#{index + 1}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{contact.name}</td>
                      <td>{contact.email}</td>
                      <td>{contact.ConatctNo}</td>
                      <td className="w-[170px]">{contact.message}</td>
                      <td>
                        <div className="actions d-flex align-items-center gap-3">
                          <Button
                            color="error"
                            className="error"
                            onClick={() => handleDeleteContact(contact._id)}
                          >
                            <MdDelete />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No Contact Messages Available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
