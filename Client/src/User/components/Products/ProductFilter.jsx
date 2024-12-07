import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { filterProductsByRange, getAllCategories2 } from "../../redux/User/UserThunk";
import { Button } from "@mui/material";

export default function ProductFilters() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categoriesData } = useSelector((state) => state.user);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRange, setSelectedRange] = useState({ min: 0, max: 1000000 });

  useEffect(() => {
    dispatch(getAllCategories2());
  }, [dispatch]);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    if (category) {
      navigate(`/filtered-products/${category}`);
    }
  };

  const handleRangeChange = (min, max) => {
    setSelectedRange({ min, max });
  };

  const handleMinChange = (event) => {
    const min = parseInt(event.target.value, 10);
    setSelectedRange((prevRange) => ({ ...prevRange, min }));
    handleRangeChange(min, selectedRange.max);
  };

  const handleMaxChange = (event) => {
    const max = parseInt(event.target.value, 10);
    setSelectedRange((prevRange) => ({ ...prevRange, max }));
    handleRangeChange(selectedRange.min, max);
  };

  const handleFilterClick = () => {
    dispatch(filterProductsByRange({ min: selectedRange.min, max: selectedRange.max }))
      .then(() => {
        navigate(`/filtered-products?min=${selectedRange.min}&max=${selectedRange.max}`);
      });
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
    <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl p-4 border-2 border-gray-200 rounded-lg">
      <h3 className="text-lg font-bold mb-4">Filter by Category</h3>
      <select
        className="w-full p-2 border-2 border-gray-300 rounded-md"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">All Categories</option>
        {categoriesData &&
          categoriesData.map((category) => (
            <option key={category._id} value={category.categoryname}>
              {category.categoryname}
            </option>
          ))}
      </select>

      <h3 className="text-lg font-bold mt-6 mb-4">Filter by Price Range</h3>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <input
            type="number"
            className="w-full sm:w-[48%] p-2 border-2 border-gray-300 rounded-md"
            value={selectedRange.min}
            onChange={handleMinChange}
            min={0}
            max={selectedRange.max - 1}
          />
          <span className="hidden sm:inline">To</span>
          <input
            type="number"
            className="w-full sm:w-[48%] p-2 border-2 border-gray-300 rounded-md"
            value={selectedRange.max}
            onChange={handleMaxChange}
            min={selectedRange.min + 1}
            max={1000000}
          />
        </div>

        {/* Range Sliders */}
        <div className="w-full">
          <input
            type="range"
            className="w-full mt-2"
            min={0}
            max={1000000}
            value={selectedRange.min}
            onChange={handleMinChange}
          />
          <input
            type="range"
            className="w-full mt-2"
            min={0}
            max={1000000}
            value={selectedRange.max}
            onChange={handleMaxChange}
          />
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <p>₹ {formatPriceWithCommas(selectedRange.min)}</p>
        <p>₹ {formatPriceWithCommas(selectedRange.max)}</p>
      </div>

      <Button
        className="mt-4 w-full bg-blue-500 text-black py-2 rounded-md hover:bg-blue-600"
        onClick={handleFilterClick}
      >
        Filter
      </Button>
    </div>
  );
}


/* 
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { filterProductsByRange, getAllCategories2 } from "../../redux/User/UserThunk";
import { Button } from "@mui/material";

export default function ProductFilters() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categoriesData } = useSelector((state) => state.user);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRange, setSelectedRange] = useState({ min: 0, max: 1000000 });

  useEffect(() => {
    dispatch(getAllCategories2());
  }, [dispatch]);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    if (category) {
      navigate(`/filtered-products/${category}`);
    }
  };

  const handleRangeChange = (min, max) => {
    setSelectedRange({ min, max });
  };

  const handleMinChange = (event) => {
    const min = parseInt(event.target.value, 10);
    setSelectedRange((prevRange) => ({ ...prevRange, min }));
    handleRangeChange(min, selectedRange.max);
  };

  const handleMaxChange = (event) => {
    const max = parseInt(event.target.value, 10);
    setSelectedRange((prevRange) => ({ ...prevRange, max }));
    handleRangeChange(selectedRange.min, max);
  };

  const handleFilterClick = () => {
    dispatch(filterProductsByRange({ min: selectedRange.min, max: selectedRange.max }))
      .then(() => {
        navigate(`/filtered-products?min=${selectedRange.min}&max=${selectedRange.max}`);
      });
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
    <div className="w-[250px] p-[20px] border-2 border-gray-200 rounded-[10px] static top-[0]">
      <h3 className="text-[20px] font-bold mb-[10px]">Filter by Category</h3>
      <select
        className="w-full p-[10px] border-2 border-gray-300 rounded-[5px]"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">All Categories</option>
        {categoriesData &&
          categoriesData.map((category) => (
            <option key={category._id} value={category.categoryname}>
              {category.categoryname}
            </option>
          ))}
      </select>

      <h3 className="text-[20px] font-bold mt-[20px] mb-[10px]">
        Filter by Price Range
      </h3>
      <div className="range-filter">
        <div className=" justify-between items-center">
          <div>
            <input
              type="number"
              className="w-[100%] p-[5px] border-2 border-gray-300 rounded-[5px]"
              value={selectedRange.min}
              onChange={handleMinChange}
              min={0}
              max={selectedRange.max - 1}
            />
          </div>
          <div className="flex justify-center">
            <span>To</span>
          </div>
          <div>
            <input
              type="number"
              className="w-[100%] p-[5px] border-2 border-gray-300 rounded-[5px]"
              value={selectedRange.max}
              onChange={handleMaxChange}
              min={selectedRange.min + 1}
              max={formatPriceWithCommas(1000000)}
            />
          </div>
        </div>

        <input
          type="range"
          className="w-full mt-[10px]"
          min={0}
          max={1000000}
          value={selectedRange.min}
          onChange={handleMinChange}
        />
        <input
          type="range"
          className="w-full mt-[10px]"
          min={0}
          max={1000000}
          value={selectedRange.max}
          onChange={handleMaxChange}
        />
      </div>

      <div className="flex justify-between mt-[10px]">
        <p>₹ {formatPriceWithCommas(selectedRange.min)}</p>
        <p>₹ {formatPriceWithCommas(selectedRange.max)}</p>
      </div>

      <Button className="mt-3 btn-blue w-100" onClick={handleFilterClick}>
        Filter
      </Button>
    </div>
  );
}
 */