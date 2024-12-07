import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductsCard";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductFilter from "./ProductFilter";
import Paginations from "./Pagination";
import { filterProductsByRange } from "../../redux/User/UserThunk";
import ProductFilters from "./ProductFilter";
// import ProductCard from "./ProductCard";

export default function FilteredProductsPage() {
  const { filteredProducts1 } = useSelector((state) => state.user);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; // Number of products per page
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // Calculate the indices for slicing the filteredProducts array
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts1.slice(indexOfFirstProduct, indexOfLastProduct);
  const dispatch = useDispatch();

  console.log(filteredProducts1);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const min = searchParams.get("min");
  const max = searchParams.get("max");

  useEffect(() => {
    if (min && max) {
      dispatch(filterProductsByRange({ min, max }));
    }
  }, [dispatch, min, max]);


  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };
  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const formatPriceWithCommas = (price) => {
    const priceString = price.toString();
    const lastThreeDigit = priceString.slice(-3);
    const otherDigits = priceString.slice(0, -3);
    const formattedOtherDigits = otherDigits.replace(
      /\B(?=(\d{2})+(?!\d))/g,
      ","
    );
    return otherDigits
      ? `${formattedOtherDigits},${lastThreeDigit}`
      : lastThreeDigit;
  };
  return (
    <>
      <div className="productsPage px-[20px]">
      <div className="flex justify-around">
        <h2 className="text-[24px] font-bold text-center pt-[30px]">
          Products found in this range: {min} : {max}
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
      
          <div className="px-[20px] py-[90px] box_parentCard gap-3">
            {currentProducts && currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
                
                
              <p className="">No products found in this range.</p>
            )}
          </div>
        </div>
        {isFilterVisible && (
          <div className="pt-[90px] absolute right-9 w-[250px]">
            <ProductFilters />
          </div>
        )}
      </div>


      <Paginations
        count={Math.ceil(filteredProducts1.length / productsPerPage)}
        currentPage={currentPage}
        handleChangePage={handleChangePage}
      />
    </>
  );
}
