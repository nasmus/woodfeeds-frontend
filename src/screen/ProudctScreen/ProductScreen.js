import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import ReactPixel from "react-facebook-pixel";
import { Helmet } from "react-helmet-async";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Store } from "../../Store";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import Product from "../../components/Product";
import Rating from "../../components/Review/Rating";
import RatingSubmit from "../../components/Review/RatingSubmit";
import Review from "../../components/Review/Review";
import "../../css/ProductScreen.css";
import { getError } from "../../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "FATCH_REQUEST":
      return { ...state, loading: true };
    case "FATCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FATCH_FAILLED":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    error: "",
    loading: true,
  });

  const [randomProducts, setRandomProducts] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  useEffect(() => {
    const fatchData = async () => {
      dispatch({ type: "FATCH_REQUEST" });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: "FATCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FATCH_FAILLED", payload: getError(err) });
      }
    };
    fatchData();
  }, [slug]);

  useEffect(() => {
    const fatchData = async () => {
      const randomData = await axios.get(`/api/random/product_suggest`);
      if (randomData.data !== "") {
        setRandomProducts(randomData.data);
      }
    };
    fatchData();
  }, []);

  // bring data from react context api
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const userinfo = localStorage.getItem("userInfo");

  const facebookPixel = () => {
    ReactPixel.track("add_to_cart", {
      productName: `${product.name}`,
      item: `${product.price}`,
      quentity: `${product.quentity}`,
    });
  };

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    facebookPixel();

    if (data.countInStock < quantity) {
      toast.error("Sorry, Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
    navigate("/cart");
  };

  const [activeImage, setActiveImage] = useState();
  const [imageValue, setImageValue] = useState([]);
  useEffect(() => {
    if (product.multipleImage !== undefined) {
      setActiveImage(product.multipleImage[0]);
      setImageValue(product.multipleImage);
    }
  }, [product.multipleImage]);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox>{error}</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>{product.name}</title>
        <meta property="og:title" content={`${product.name} | WoodFeeds.com`} />
         <meta property="og:description" content="WoodFeeds.com is a largest e-commerce website and interior design platform where you can buy wooden aesthetic product." />
         <meta property="og:image" content={`${process.env.REACT_APP_IMAGE_URL}/images/${activeImage}`} />
      </Helmet>
      <div className="product_section">
        <div className="images">
          <div className="flex items-center justify-center">
            <LazyLoadImage
              className="main_image max-h-96 object-scale-down"
              src={`${process.env.REACT_APP_IMAGE_URL}/images/${activeImage}`}
              alt=""
              effect="blur"
            />
          </div>
          <div className="grid_viev_product">
            {imageValue.length > 0
              ? imageValue.map((image, index) => {
                  return (
                    <LazyLoadImage
                      key={index}
                      src={`${process.env.REACT_APP_IMAGE_URL}/images/${image}`}
                      alt=""
                      onClick={() => setActiveImage(image)}
                      className="h-18 w-16"
                      effect="blur"
                    />
                  );
                })
              : ""}
          </div>
        </div>
        <div className="product_content p-4">
          <h1>{product.name}</h1>
          <p>
            <Rating rating={product.rating} numReviews={product.numReviews} />
            <b className=" text-cyan-500 ">
              {product.numReviews ? product.numReviews : 0} reviews
            </b>{" "}
            | <b className=" text-orange-600 ">{product.countInStock} Stock</b>
          </p>
          <h5>
            {" "}
            {/* <i class="fa-solid fa-bangladeshi-taka-sign"></i> */}৳
            {product.price}
          </h5>
          <h4>Product Features</h4>
          <ul>
            {/* <li style={{ listStyleType: "square" }}>
              <div
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </li> */}
            <li style={{ listStyleType: "square" }}>
              Product Height: <b>{product.height} inch</b>
            </li>
            <li style={{ listStyleType: "square" }}>
              Product Width: <b>{product.width} inch</b>
            </li>
            <li style={{ listStyleType: "square" }}>
              Thickness: <b>{product.thickness} inch</b>
            </li>
            <li style={{ listStyleType: "square" }}>
              Product Color: <b>{product.color} </b>
            </li>
            <li style={{ listStyleType: "square" }}>
              Product Materials: <b>{product.productMaterials}</b>
            </li>
            <li style={{ listStyleType: "square" }}>
              120 shipping charge applicable form every product
            </li>
          </ul>
          <div className="button">
            {product.countInStock > 0 && (
              <ListGroup.Item>
                <div className="d-grid">
                  <button
                    className="px-3.5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white"
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </button>
                </div>
              </ListGroup.Item>
            )}
          </div>
        </div>
      </div>
      <div className="product_description mx-8 lg:my-2 my-4">
        <h3>Description</h3>
        <p>
          <div dangerouslySetInnerHTML={{ __html: product.description }} />
        </p>
      </div>
      <div className="product_suggest">
        <h2>Product Related To This Item</h2>
        <div className="product-grid2">
          {randomProducts.map((product, index) => {
            return <Product key={index} product={product}></Product>;
          })}
        </div>
      </div>
      {userinfo ? (
        <div>
          <RatingSubmit product={product} />
        </div>
      ) : (
        ""
      )}
      <div className="product_review">
        <Review product={product} />
      </div>
    </div>
  );
}

export default ProductScreen;
