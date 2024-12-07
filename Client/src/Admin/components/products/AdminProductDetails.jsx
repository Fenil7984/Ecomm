

import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import Slider from "react-slick";
import {
    MdBrandingWatermark,
    MdDiscount,
    MdProductionQuantityLimits,
    MdPublishedWithChanges,
    MdTitle
} from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { IoMdPricetags } from "react-icons/io";

import Button from "@mui/material/Button";
import { FaReply } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
        theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[800];
    return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        "&:hover, &:focus": {
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
        "&:active": {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12),
        },
    };
});

export default function AdminProductsDetails() {
    const [mainImage, setMainImage] = useState(
        /* "https://m.media-amazon.com/images/I/612JvadSUzL._SY741_.jpg" */
    );

    const [product, setProduct] = useState(null);
    const { id } = useParams();
    const { allProducts } = useSelector((state) => state.user);
    console.log(id)
    const productsSliderOptions = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    const productsSliderSmlOptions = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
    };

    const handleThumbnailClick = (imgSrc) => {
        setMainImage(imgSrc);
    };

    useEffect(() => {
        if (allProducts.length > 0) {
            const foundProduct = allProducts.find((product) => product._id === id);
            setProduct(foundProduct);


            console.log(foundProduct)

            if (foundProduct) {
                setMainImage(foundProduct.img1);
            }
        }
    }, [id, allProducts]);


    if (!product) {
        return <div className="pt-[500px]">Loading...</div>; // Optionally, display a loading state or message
    }

    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4 justify-between">
                    <h5 className="mb-3">Product View</h5>
                    <Breadcrumbs aria-label="breadcrumb">
                        <StyledBreadcrumb
                            component="a"
                            href="/admin"
                            label="Dashboard"
                            icon={<HomeIcon fontSize="small" />}
                        />
                        <StyledBreadcrumb component="a" href="#" label="Products" />
                        <StyledBreadcrumb component="a" href="#" label="Product View" />
                    </Breadcrumbs>
                </div>

                <div className="card productDetailsSection">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="sliderWrapper pt-3 pb-3 pl-4 pr-4">
                                <h6 className="mb-4 text-[20px]">Product Gallery</h6>
                                <Slider {...productsSliderOptions} className="sliderBig mb-3">
                                    <div className="item">
                                        <img src={mainImage} alt="Main Product" className="w-100" />
                                    </div>
                                </Slider>
                                <Slider {...productsSliderSmlOptions} className="sliderSmall">
                                    {[product.img1, product.img2, product.img3, product.img4, product.img5].map((imgSrc, index) => (
                                        <div className="item" key={index}>
                                            <img
                                                src={imgSrc}
                                                alt={`Thumbnail ${index}`}
                                                className="mainImg"
                                                onClick={() => handleThumbnailClick(imgSrc)}
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="pt-3 pb-3 pl-2 pr-4">
                                <h5 className="mb-4 text-[20px]">Product Details</h5>

                                <h4 className="text-[19px]">
                                    {product.name}
                                </h4>

                                <div className="productInfo mt-3">
                                    <div className="row">
                                        <div className="col-sm-4 d-flex align-items-center">
                                            <span className="icon">
                                                <BiSolidCategoryAlt />
                                            </span>
                                            <span className="name">Category</span>
                                        </div>
                                        <div className="col-sm-8">
                                            : <span>{product.category}</span>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-4 d-flex align-items-center">
                                            <span className="icon">
                                                <MdBrandingWatermark />
                                            </span>
                                            <span className="name">Field</span>
                                        </div>
                                        <div className="col-sm-8">
                                            : <span>{product.fields}</span>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-sm-4 d-flex align-items-center">
                                            <span className="icon">
                                                <MdTitle />
                                            </span>
                                            <span className="name">Title</span>
                                        </div>
                                        <div className="col-sm-8">
                                            : <span>{product.title}</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-4 d-flex align-items-center">
                                            <span className="icon">
                                                <IoMdPricetags />
                                            </span>
                                            <span className="name">Price</span>
                                        </div>
                                        <div className="col-sm-8">
                                            : <span>{product.price}</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-4 d-flex align-items-center">
                                            <span className="icon">
                                                <MdDiscount />
                                            </span>
                                            <span className="name">Discount</span>
                                        </div>
                                        <div className="col-sm-8">
                                            : <span>{product.discount}</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-4 d-flex align-items-center">
                                            <span className="icon">
                                                <MdProductionQuantityLimits />
                                            </span>
                                            <span className="name">Quantity</span>
                                        </div>
                                        <div className="col-sm-8">
                                            : <span>{product.qnt}</span>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-4 d-flex align-items-center">
                                            <span className="icon">
                                                <MdPublishedWithChanges />
                                            </span>
                                            <span className="name">Published</span>
                                        </div>
                                        <div className="col-sm-8">
                                            : <span>{new Date(product.publishedDate).toLocaleString() || "N/A"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4">
                        <h4 className="mt-4 mb-3 text-[22px]">Product Description</h4>
                        <p className="w-[50%]">
                            {product.discription}
                        </p>

                        <Button
                            variant="contained"
                            startIcon={<FaReply />}
                            onClick={() => window.history.back()}
                        >
                            Back
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
