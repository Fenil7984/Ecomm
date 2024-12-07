import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
//import { searchProducts } from "../../../redux/user/UserThunk"; // Make sure you have this thunk action
import ProductCard from "./ProductsCard";
import Paginations from "./Pagination";
import { searchProducts } from "../../redux/User/UserThunk";

export default function SearchResults() {
  const dispatch = useDispatch();
  const location = useLocation(); // To get search query from URL
  const query = new URLSearchParams(location.search).get("query"); // Assuming query param is 'q'
  const { searchResults =[]} = useSelector((state) => state.user);
console.log("searchResults",searchResults)
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // Number of products per page

  // Calculate the indices for slicing the searchResults array
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = searchResults.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  console.log("query:",query)


  
  // Fetch search results whenever the query changes
  useEffect(() => {
    if (query) {
      dispatch(searchProducts(query)); // Trigger searchProducts action with the query
      setCurrentPage(1); // Reset to the first page when query changes
    }
  }, [query, dispatch]);

  // Handle page change
  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <h2 className="text-[24px] font-bold text-center pt-[30px]">
        Search Results for "{query}"
      </h2>
      <div className="searchResultsPage px-[20px] w-[100%]">
        <div className="px-[20px] py-[90px] box_parentCard gap-3">
          {currentProducts && currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-[22px] pt-[100px] pb-[220px]">No products found for "{query}".</p>
          )}
        </div>
      </div>

      {/* Pagination Component */}
      <Paginations
        count={Math.ceil(searchResults.length / productsPerPage)}
        currentPage={currentPage}
        handleChangePage={handleChangePage}
      />
    </>
  );
}
