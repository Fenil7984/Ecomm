/* eslint-disable react/prop-types */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRelatedProducts } from "../../redux/User/UserThunk";
import ProductCard from "./ProductsCard";

export default function RelatedProducts({ productId }) {
  const dispatch = useDispatch();
  const { relatedProducts } = useSelector((state) => state.user);

  useEffect(() => {
    if (productId) {
      dispatch(fetchRelatedProducts(productId));
    }
  }, [dispatch, productId]);

  console.log("Rendered Related Products:", relatedProducts);

  return (
    <div className="related-products mt-[50px]">
      <h2 className="text-[24px] font-bold text-center">Related Products</h2>
      <div className="px-[20px] py-[90px] box_parentCard gap-3">
        {relatedProducts && relatedProducts.length > 0 ? (
          relatedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No related products found.</p>
        )}
      </div>
    </div>
  );
}
