import { FaCodeBranch, FaEye, FaHeart, FaRegStar, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCartByUserId, userAddToCart, userAddToWishlist, UserValidation } from "../../redux/User/UserThunk";
import { useState } from "react";
import { Modal, Button, Rating, TextField } from "@mui/material";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0); // Track the user's rating
  const [comment, setComment] = useState(""); // Track the user's comment
  const [openModal, setOpenModal] = useState(false); // Track the modal visibility

  const handleImageClick = () => {
    navigate(`/viewProduct/${product._id}`);
  };

  const { userData } = useSelector((state) => state.user);

  const truncatedTitle =
    product.title.split(" ").length > 5
      ? `${product.title.split(" ").slice(0, 4).join(" ")}...`
      : product.title;

  const regularPrice = Number(product.price);
  const discountPrice = Number(product.discount);
  const discountPercentage = Math.round(
    ((regularPrice - discountPrice) / regularPrice) * 100
  );

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

  const handleAddToWishlist = async (productId) => {
    if (!userData) {
      toast.success("Please log in to add items to your wishlist.");
      return;
    }
    await dispatch(
      userAddToWishlist({
        productId,
        userId: userData._id,
        toast,
      })
    );

    const validationResult = await dispatch(UserValidation());
    if (validationResult) {
      console.log(
        "User validated successfully, staying on the same product page."
      );
    }
  };

  const handleAddToCart = async (productId) => {
    if (!userData) {
      toast.success("Please log in to add items to your cart.");
      return;
    }

    const quantity = 1;
    const price = Number(product.price);
    const subTotal = price * quantity;

    await dispatch(
      userAddToCart({
        productId,
        userId: userData._id,
        quantity,
        subTotal: Number(subTotal),
        toast,
      })
    );
    dispatch(getCartByUserId(userData._id));

    const validationResult = await dispatch(UserValidation());
    if (validationResult) {
      console.log(
        "User validated successfully, staying on the same product page."
      );
    }
  };

  // Open modal to give rating
  const handleRatingClick = () => {
    setOpenModal(true);
  };

  // Close rating modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Submit rating and comment
  const handleRatingSubmit = () => {
    if (!userData) {
      toast.error("Please log in to submit a rating.");
      return;
    }

    // Here, you can dispatch an action to save the rating and comment
    // For now, we're just displaying a toast message
    toast.success(`You rated this product ${rating} stars!`);
    toast.info(`Your comment: ${comment}`);
    setOpenModal(false);
  };

  return (
    <div
      key={product._id}
      className="w-[280px] sm:w-[300px] md:w-[320px] lg:w-[280px] xl:w-[280px] border-2 border-purple-400 px-[20px] py-[20px] rounded-[10px] relative group overflow-hidden hover:shadow-lg shadow-gray-500/50"
    >
      <div
        className="overflow-hidden rounded-2.5 relative cursor-pointer"
        onClick={handleImageClick}
      >
        <img
          src={product.img1}
          alt=""
          className="imagesds rounded-2.5 transform transition-all duration-300 group-hover:scale-110 rounded-[10px] ease-in-out"
        />
      </div>

      <div className="z-30 flex justify-center items-center border2 border-topnavBorderBottom-400 bg-purple-400 w-[80px] h-[40px] text-[50px] absolute top-8 right-5 rounded-[20px] text-gray-800">
        <p className="text-[25px]">-{discountPercentage}%</p>
      </div>

      <div className="pt-[10px] relative">
        <div className="flex justify-between">
          <div>{product.category}</div>
          <div>{product.fields}</div>
        </div>
        <div className="pt-[10px] text-[20px] font-bold">{truncatedTitle}</div>
        <div className="flex gap-[10px] pt-[10px]">
          <div
            className="flex items-center gap-2.5 text-lg cursor-pointer"
            onClick={handleRatingClick}
          >
            {[...Array(5)].map((_, index) => (
              <FaRegStar key={index} />
            ))}
          </div>
          <p className="text-[20px]">50%</p>
        </div>

        <div className="flex gap-[20px] text-[20px]">
          <div className="text-[25px] text-topnavBorderBottom-400">
            ₹ {formatPriceWithCommas(discountPrice)}
          </div>
          <div className="line-through pt-[6px] text-gray-500">
            ₹ {formatPriceWithCommas(regularPrice)}
          </div>
          <button
            type="button"
            className="border-2 border-black w-[50px] h-[50px] flex justify-center items-center rounded-[100%] absolute -right-2 bottom-7 z-50"
            data-toggle="tooltip"
            data-placement="top"
            title="Add To Cart"
            onClick={() => handleAddToCart(product._id)}
          >
            <span className="text-[23px]">
              <FaShoppingCart className="" />
            </span>
          </button>
        </div>
      </div>

      <div className="gap-12.5 absolute top-28 pl-12.5 right-[-8rem] group-hover:right-1/2 group-hover:translate-x-1/2 transition-all duration-30 gap-[20px]">
        <div className="flex gap-[20px]">
          <div>
            <button
              type="button"
              className="border-2 border-gray-500 text-black w-[50px] h-[50px] flex justify-center items-center rounded-[100%] bg-topnav-400"
              data-toggle="tooltip"
              data-placement="top"
              title="Quick View"
              onClick={handleImageClick}
            >
              <span className="text-[23px]">
                <FaEye className="" />
              </span>
            </button>
          </div>
          <div>
            <button
              type="button"
              className="border-2 border-gray-500 text-black w-[50px] h-[50px] flex justify-center items-center rounded-[100%] bg-topnav-400"
              data-toggle="tooltip"
              data-placement="top"
              title="Add To Wishlist"
              onClick={() => handleAddToWishlist(product._id)}
            >
              <span className="text-[23px]">
                <FaHeart className="" />
              </span>
            </button>
          </div>
        </div>
        <div className="pt-[15px]">
          <button
            type="button"
            className="border-2 border-gray-500 text-black w-[50px] h-[50px] flex justify-center items-center rounded-[100%] bg-topnav-400"
            data-toggle="tooltip"
            data-placement="top"
            title="Compare"
          >
            <span className="text-[23px]">
              <FaCodeBranch className="" />
            </span>
          </button>
        </div>
      </div>

      {/* Rating Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-rating-title"
        aria-describedby="modal-rating-description"
      >
        <div className="modal-content bg-white p-6 rounded-[10px] max-w-md mx-auto">
          <h2 id="modal-rating-title" className="text-[24px] font-bold text-purple-600 mb-4">
            Rate this Product
          </h2>
          <Rating
            name="product-rating"
            value={rating}
            onChange={(e, newValue) => setRating(newValue)}
            size="large"
            className="mb-4"
          />
          <TextField
            label="Add a comment"
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            variant="outlined"
            fullWidth
            className="mb-4"
            placeholder="Write a comment..."
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleRatingSubmit}
            fullWidth
          >
            Submit Rating
          </Button>
        </div>
      </Modal>
    </div>
  );
}
