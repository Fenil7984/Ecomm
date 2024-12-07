import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { filterProductsByCategory } from "../../redux/User/UserThunk";
import ProductFilters from "./ProductFilter";
import ProductCard from "./ProductsCard";
import Paginations from "./Pagination";

export default function FilteredProducts() {
  const dispatch = useDispatch();
  const { category } = useParams();
  const { filteredProducts } = useSelector((state) => state.user);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // Number of products per page

  // State to handle filter visibility
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // Calculate the indices for slicing the filteredProducts array
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Fetch filtered products whenever the category changes
  useEffect(() => {
    if (category) {
      dispatch(filterProductsByCategory(category));
      setCurrentPage(1); // Reset to the first page when category changes
    }
  }, [category, dispatch]);

  // Handle page change
  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  // Toggle filter visibility
  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <>
      <div className="flex justify-around">
        <h2 className="text-[24px] font-bold text-center pt-[30px]">
          Products found in this category: {category}
        </h2>
        <div
          style={{
            backgroundColor: "yellow",
            color: "black",
            width: "80px",
            height: "30px",
            paddingLeft: "10px",
            marginTop: "15px",
          }}
        >
          <button onClick={toggleFilter}>Filter</button>
        </div>
      </div>
      <div className="productsPage px-[20px] w-[100%]">
        <div className="px-[20px] py-[90px] box_parentCard gap-3">
          {currentProducts && currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p>No products found in this category.</p>
          )}
        </div>

        {/* Conditionally render the ProductFilters component */}
        {isFilterVisible && (
          <div className="pt-[90px] absolute right-9 w-[250px]">
            <ProductFilters />
          </div>
        )}
      </div>

      {/* Pagination Component */}
      <Paginations
        count={Math.ceil(filteredProducts.length / productsPerPage)}
        currentPage={currentPage}
        handleChangePage={handleChangePage}
      />
    </>
  );
}
