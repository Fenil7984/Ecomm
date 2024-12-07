/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaRegStar } from "react-icons/fa";
import { toast } from "react-toastify";

import RelatedProducts from "./ReletedProducts";
import { UserValidation, userAddToCart, getCartByUserId, getAllProductsFecthApi } from "../../redux/User/UserThunk";


export const Herosec = () => {
  const { id } = useParams();
  const [items, setItems] = useState(1);
  // const [cart, setCart] = useState(0);
  const shadowRef = useRef(null);
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);

  const {
    allProducts,
    userData,
  } = useSelector((state) => state.user);

  useEffect(() => {
    const foundProduct = allProducts.find((product) => product._id === id);
        
    setProduct(foundProduct);
    // console.log(foundProduct);
  }, [id, allProducts]);
  const regularPrice = Number(product?.price);
  const discountPrice = Number(product?.discount);
  const discountPercentage = Math.round(
    ((regularPrice - discountPrice) / regularPrice) * 100
  );

  const formatPriceWithCommas = (price) => {
    const priceString = price.toString();
    const LastThreeDigit = priceString.slice(-3);
    const otherDigits = priceString.slice(0, -3);
    const formattedOtherDigits = otherDigits.replace(
      /\B(?=(\d{2})+(?!\d))/g,
      ","
    );
    return otherDigits
      ? `${formattedOtherDigits},${LastThreeDigit}`
      : LastThreeDigit;
  };

  const handleAddToCart = async (productId) => {
    if (!userData) {
      toast.success("Please log in to add items to your cart.");
      return;
    }
  
    const price = Number(product.price);
    const subTotal = price * items; // Use items state
 
  
    await dispatch( 
      userAddToCart({
        productId,
        userId: userData._id,
        quantity: items, // Ensure correct quantity
        subTotal: Number(subTotal),
        toast,
      })
    );

    setItems(1)
   
    dispatch(getCartByUserId(userData._id));
  
await dispatch(UserValidation());
  
 
  };

  useEffect(()=>{
    dispatch(getAllProductsFecthApi())
  },[dispatch])

  return (
    <div className="hero-sec content-div">
      <div ref={shadowRef} className="shadow"></div>

      <div className="hero-row">
        <div className="hero-col hero-col1">
          <Sneakers />
        </div>
        <div className="hero-col hero-col2 pb-[150px]">
          <div className="col2-wrapper">
            {product && (
              <>
                <div className="font-bold text-[22px] py-[20px]">
                  <h1>
                    {" "}
                    {product.category} &nbsp; ( {product.fields} )
                  </h1>
                </div>
                <h1 className="main-heading ">{product.title}</h1>
                <p className="hero-para"> {product.discription} </p>
                <span className="dollar">
                  {" "}
                  ₹ {formatPriceWithCommas(discountPrice)}
                </span>
                <span className="discount hero-subHeading">
                  {discountPercentage} %
                </span>
                <del className="discount2 hero-para">
                  ₹ {formatPriceWithCommas(regularPrice)}
                </del>
                <div className="cart2-sec">
                  <div className="cart2-col cart2-col1">
                    <span
                      className="minus"
                      onClick={() => {
                        let count = items - 1;
                        if (count < 1) {
                          count = 0;
                        }
                        setItems(count);
                      }}
                    ></span>

                    <span className="cart2-values">{items}</span>
                    <svg
                      onClick={() => {
                        let count = items + 1;
                        setItems(count);
                      }}
                      className="plus"
                      width="12"
                      height="12"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <defs>
                        <path
                          d="M12 7.023V4.977a.641.641 0 0 0-.643-.643h-3.69V.643A.641.641 0 0 0 7.022 0H4.977a.641.641 0 0 0-.643.643v3.69H.643A.641.641 0 0 0 0 4.978v2.046c0 .356.287.643.643.643h3.69v3.691c0 .356.288.643.644.643h2.046a.641.641 0 0 0 .643-.643v-3.69h3.691A.641.641 0 0 0 12 7.022Z"
                          id="b"
                        />
                      </defs>
                      <use fill="#FF7E1B" fillRule="nonzero" xlinkHref="#b" />
                    </svg>
                  </div>
                  <div className="cart2-col cart2-col2">
                    <button
                      className="cart2-btn cartItemsd"
                      onClick={() => handleAddToCart(product._id)}
                    >
                      <svg
                        className="cart2-main"
                        width="22"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
                          fill="#FFFFFF"
                          fillRule="nonzero"
                        />
                      </svg>
                      <span
                        className="cart2-text"
                     
                      >
                        Add to cart
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex gap-[10px] pt-[40px]">
                  <div className="flex items-center gap-2.5 text-lg">
                    {[...Array(5)].map((index) => (
                      <FaRegStar key={index} />
                    ))}
                  </div>

                  <p className="text-[20px]">50%</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>


    
      <div className="mt-[50px]">
        {product && <RelatedProducts productId={product._id} />}
      </div>
    </div>
  );
};

export const LightBox = ({ imageTrack }) => {
  const [image2, setImage2] = useState(imageTrack);
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const { allProducts } = useSelector((state) => state.user);

  useEffect(() => {
    const foundProduct = allProducts.find((prod) => prod._id === id);

    setProduct(foundProduct);
  }, [id, allProducts, imageTrack]);

  let url = "";
  if (image2 === 1) url = product?.img1;
  else if (image2 === 2) url = product?.img2;
  else if (image2 === 3) url = product?.img3;
  else if (image2 === 4) url = product?.img4;
  else if (image2 === 5) url = product?.img5;

  return (
    <div className="lightBox-div">
      <div className="lightBox-row">
        <div className="lightBox-col lightBox-col1">
          <svg
            onClick={() => {
              document
                .querySelector(".lightBox-div")
                .classList.remove("lightBox-toggle");
              document
                .querySelector(".shadow")
                .classList.remove("shadow-toggle");
            }}
            className="lightBox-close"
            width="14"
            height="15"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
              fill="#FFFFFF"
              fillRule="evenodd"
            />
          </svg>
        </div>
        <div className="lightBox-col lightBox-col2">
          <svg
            onClick={() => {
              let num = image2 - 1;
              if (num < 1) num = 4;
              setImage2(num);
            }}
            className="prev"
            width="12"
            height="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 1 3 9l8 8"
              stroke="#1D2026"
              strokeWidth="3"
              fill="none"
              fillRule="evenodd"
            />
          </svg>
          <img alt="img" className="big-sneaker lightBox-sneaker" src={url} />
          <svg
            onClick={() => {
              let num = image2 + 1;
              if (num > 4) num = 1;
              setImage2(num);
            }}
            className="next"
            width="13"
            height="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m2 1 8 8-8 8"
              stroke="#1D2026"
              strokeWidth="3"
              fill="none"
              fillRule="evenodd"
            />
          </svg>
        </div>
        <div className="lightBox-col lightBox-col3">
          {product?.img1 && (
            <div
              className={`small-sneaker-div ${
                image2 === 1 ? "active-sneaker" : ""
              }`}
            >
              <img
                alt="img"
                className="small-sneaker"
                onClick={() => setImage2(1)}
                src={product.img1}
              />
            </div>
          )}
          {product?.img2 && (
            <div
              className={`small-sneaker-div ${
                image2 === 2 ? "active-sneaker" : ""
              }`}
            >
              <img
                alt="img"
                className="small-sneaker"
                onClick={() => setImage2(2)}
                src={product.img2}
              />
            </div>
          )}
          {product?.img3 && (
            <div
              className={`small-sneaker-div ${
                image2 === 3 ? "active-sneaker" : ""
              }`}
            >
              <img
                alt="img"
                className="small-sneaker"
                onClick={() => setImage2(3)}
                src={product.img3}
              />
            </div>
          )}
          {product?.img4 && (
            <div
              className={`small-sneaker-div ${
                image2 === 4 ? "active-sneaker" : ""
              }`}
            >
              <img
                alt="img"
                className="small-sneaker"
                onClick={() => setImage2(4)}
                src={product.img4}
              />
            </div>
          )}
          {product?.img5 && (
            <div
              className={`small-sneaker-div ${
                image2 === 4 ? "active-sneaker" : ""
              }`}
            >
              <img
                alt="img"
                className="small-sneaker"
                onClick={() => setImage2(4)}
                src={product.img5}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const Sneakers = ({ imageTrack }) => {
  const [image, setImage] = useState(1);

  let url = "";
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const { allProducts } = useSelector((state) => state.user);
  useEffect(() => {
    const foundProduct = allProducts.find((prod) => prod._id === id);

    setProduct(foundProduct);
  }, [id, allProducts, imageTrack]);

  if (image === 1) {
    url = product?.img1;
  } else if (image === 2) {
    url = product?.img2;
  } else if (image === 3) {
    url = product?.img3;
  } else if (image === 4) {
    url = product?.img4;
  } else if (image === 5) {
    url = product?.img5;
  }

  return (
    <>
    <div className="sneakers-div">
      <div className="sneakers-col sneakers-col1">
        <svg
          onClick={() => {
            let num = image - 1;
            if (num < 1) num = 4;
            setImage(num);
          }}
          className="mobile-prev"
          width="12"
          height="18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 1 3 9l8 8"
            stroke="#1D2026"
            strokeWidth="3"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
        <img
          className="big-sneaker"
          alt="img"
          onClick={() => {
            document
              .querySelector(".lightBox-div")
              .classList.add("lightBox-toggle");
            document.querySelector(".shadow").classList.add("shadow-toggle");
          }}
          src={url}
        />
        <svg
          onClick={() => {
            let num = image + 1;
            if (num > 4) num = 1;
            setImage(num);
          }}
          className="mobile-next"
          width="13"
          height="18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m2 1 8 8-8 8"
            stroke="#1D2026"
            strokeWidth="3"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
        <LightBox imageTrack={image} product={product} />
      </div>
      <div className="sneakers-col sneakers-col2">
        {product?.img1 && (
          <div
            className={`small-sneaker-div ${image === 1 && "active-sneaker"}`}
          >
            <img
              alt="img"
              className={`small-sneaker`}
              onClick={() => setImage(1)}
              src={product.img1}
            />
          </div>
        )}
        {product?.img2 && (
          <div
            className={`small-sneaker-div ${image === 2 && "active-sneaker"}`}
          >
            <img
              alt="img"
              className={`small-sneaker`}
              onClick={() => setImage(2)}
              src={product.img2}
            />
          </div>
        )}
        {product?.img3 && (
          <div
            className={`small-sneaker-div ${image === 3 && "active-sneaker"}`}
          >
            <img
              alt="img"
              className={`small-sneaker`}
              onClick={() => setImage(3)}
              src={product.img3}
            />
          </div>
        )}
        {product?.img4 && (
          <div
            className={`small-sneaker-div ${image === 4 && "active-sneaker"}`}
          >
            <img
              alt="img"
              className={`small-sneaker`}
              onClick={() => setImage(4)}
              src={product.img4}
            />
          </div>
        )}
        {product?.img5 && (
          <div
            className={`small-sneaker-div ${image === 5 && "active-sneaker"}`}
          >
            <img
              alt="img"
              className={`small-sneaker`}
              onClick={() => setImage(5)}
              src={product.img5}
            />
          </div>
        )}
      </div>
    </div>


   
    </>
  );
};
