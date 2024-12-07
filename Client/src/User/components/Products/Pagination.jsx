// /* eslint-disable react/prop-types */
// import { Pagination } from "@mui/material";
// import { useState } from "react";

// export default function Paginations({ allProducts }) {
  
//   const [currentPage, setCurrentPage] = useState(1);
//   const usersPerPage = 5; // Update this to `usersPerPage` to match the context


//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = allProducts.slice(indexOfFirstUser, indexOfLastUser);

//   const handleChangePerPage = (event, value) => {
//     setCurrentPage(value);
//   };
//     return (
//         <>
//           <Pagination
//                   count={Math.ceil(allProducts.length / usersPerPage)}
//                   color="primary"
//                   className="pagination"
//                   showFirstButton
//                   showLastButton
//                   onChange={handleChangePerPage}
//                 />
//         </>
//     )
// }




/* eslint-disable react/prop-types */
import { Pagination } from "@mui/material";

export default function Paginations({ count, currentPage, handleChangePage }) {
  return (
    <>
      <div className="pb-5 mr-[200px]">

      <Pagination
        count={count}
        page={currentPage}
        color="primary"
        className="pagination"
        showFirstButton
        showLastButton
        onChange={handleChangePage}
        />
        </div>
    </>
  );
}
