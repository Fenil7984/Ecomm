
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductsCard";
import { useEffect } from "react";
import { getAllProductsFecthApi } from "../../redux/User/UserThunk";


export default function ProductsDesign({ limit, currentProducts }) {
  const dispatch=useDispatch()
  const { allProducts } = useSelector((state) => state.user);

  console.log(allProducts)

  // If currentProducts is not passed, calculate it based on limit
  const productsToDisplay = currentProducts || (limit ? allProducts.slice(0, limit) : allProducts);

  useEffect(()=>{
    dispatch(getAllProductsFecthApi())

  },[dispatch])
  return (
    <>
      {productsToDisplay.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}

      {/* Assuming Paginations will be hooked up to the actual pagination logic */}
   
    </>
  );
}


