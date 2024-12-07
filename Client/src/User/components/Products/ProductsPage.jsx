/* 

import { useState } from "react";
import { useSelector } from "react-redux";

import Products from "./Products";
import Paginations from "./Pagination";
import ProductFilters from "./ProductFilter"

export default function Productspage({ limit }) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // Number of products per page
  const { allProducts } = useSelector((state) => state.user);

  // Calculate the indices for slicing the allProducts array
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Determine the current products to display based on the limit and pagination
  const currentProducts = limit
    ? allProducts.slice(0, limit).slice(indexOfFirstProduct, indexOfLastProduct)
    : allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <div className="productsPage px-[20px]">
        <div>
          <Products products={currentProducts} />
        </div>

        <div className="pt-[90px] absolute right-9">
          <ProductFilters/>
        </div>
      </div>

      <Paginations
        count={Math.ceil(allProducts.length / productsPerPage)}
        currentPage={currentPage}
        handleChangePage={handleChangePage}
      />
    </>
  );
}
 */




import { useState } from "react";
import { useSelector } from "react-redux";

import Products from "./Products";
import Paginations from "./Pagination";
import ProductFilters from "./ProductFilter";

export default function Productspage({ limit }) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // Number of products per page
  const { allProducts } = useSelector((state) => state.user);

  // Calculate the indices for slicing the allProducts array
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Determine the current products to display based on the limit and pagination
  const currentProducts = limit
    ? allProducts.slice(0, limit).slice(indexOfFirstProduct, indexOfLastProduct)
    : allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <div className="productsPage px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
        {/* Flex container for products and filters */}
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="flex-1">
            {/* Products grid with responsive layout */}
            <Products products={currentProducts} />
          </div>

          {/* Product Filters section */}
          <div className="mt-6 md:mt-0 md:w-1/4 lg:w-1/5 xl:w-1/6 md:sticky md:top-20 md:h-full pt-[50px]">
            <ProductFilters />
          </div>
        </div>
      </div>

      {/* Pagination */}
      <Paginations
        count={Math.ceil(allProducts.length / productsPerPage)}
        currentPage={currentPage}
        handleChangePage={handleChangePage}
      />
    </>
  );
}
