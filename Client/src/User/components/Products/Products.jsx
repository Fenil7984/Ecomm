/* eslint-disable react/prop-types */



import ProductFilters from "./ProductFilter";
import ProductsDesign from "./ProductsDesign";


export default function Products({ limit }) {
  return (
    <>
      
    
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8  pb-[50px] pt-[50px]">

   
        <ProductsDesign limit={limit} />
      </div>

    </>
  );
}
