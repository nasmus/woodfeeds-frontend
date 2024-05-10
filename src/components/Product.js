import axios from "axios";
import React, { useContext } from "react";
import ReactPixel from 'react-facebook-pixel';
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Store } from "../Store";
import '../css/Product.css';


function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const addToCartHandeler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      toast.error('Sorry.. Product out of stock');
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  const facebookPixel =()=> {
    ReactPixel.track('ViewContent', { name: `${product.name}`, product_id:`${product._id}`, product_price:`${product.price}` })
  }

  return (
    <>
      <div className="product-card transition-shadow duration-300 shadow-md hover:shadow-lg">
        <Link to={`/product/${product.slug}`}>
          <LazyLoadImage
            className="main-image"
            src={`${process.env.REACT_APP_IMAGE_URL}/images/${product.image}`}
            //src={product.image}
            alt={product.name}
            effect="blur"
          />
        </Link>
        <Link
          className="product-card_link"
          to={`/product/${product.slug}`}
          onClick={facebookPixel}
        >
          <p>{product.name}</p>
        </Link>
        <span>
         
        </span>
        <p className="pt-2 !text-orange-600">
          {/* <i class="fa-solid fa-bangladeshi-taka-sign"></i> */}৳
          {product.price}
        </p>
        {/* {product.countInStock === 0 ? (
          
          <Button
            variant="contained"
            size="small"
            endIcon={<AddShoppingCartIcon />}
            disabled
          >
            Out Of Stock
          </Button>
        ) : (
          
          <Button
            onClick={() => addToCartHandeler(product)}
            variant="contained"
            size="small"
            endIcon={<AddShoppingCartIcon />}
          >
            Add To Cart
          </Button>
        )} */}
      </div>
    </>
  );
}

export default Product;
