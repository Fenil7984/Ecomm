/* eslint-disable react/prop-types */
import { HiDotsVertical } from "react-icons/hi";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { IoIosTimer } from "react-icons/io";

export default function DashboardBox({ color, icon, grow, name, total, onClick }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };  

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        className="dashboardBox"
        style={{
          backgroundImage: `linear-gradient(to right,${color?.[0]},${color?.[1]})`,
        }}
        onClick={onClick} // Attach the click handler here
      >
        <span className="chart">{grow}</span>
        <div className="d-flex w-100">
          <div className="col1">
            <h4 className="text-white mb-0">{name}</h4>
            <span className="text-white">{total}</span>
          </div>
          <div className="ml-auto">
            <div className="icon">{icon}</div>
          </div>
        </div>

        <div className="d-flex align-items-center w-100 bottomEle">
          <h5 className="text-white mt-0 mb-0">Last Month</h5>
          <Button className="ml-auto toggleIcon" onClick={handleClick}>
            <HiDotsVertical />
          </Button>

          <Menu
            className="dropdown_menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: 'ITEM_HEIGHT * 4.5',
                width: "20ch",
              },
            }}
          >
            <MenuItem onClick={handleClose}>
              <IoIosTimer /> Last Day
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <IoIosTimer /> Last Week
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <IoIosTimer /> Last Month
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <IoIosTimer /> Last Year
            </MenuItem>
          </Menu>
        </div>
      </Button>
    </>
  );
}
