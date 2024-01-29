import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Product from "../../components/Product";

function CategoryProduct() {
  const [productsBookShelf, setProductsBookShelf] = useState([]);
  const displayProduct = productsBookShelf.slice(0, 10);
  const [prodcutCornarShelf, setProductCornerShelf] = useState([]);
  const displayCornerShelf = prodcutCornarShelf.slice(0, 10);
  const [prodcutBadSideShelf, setProductBadSideShelf] = useState([]);
  const displayBadSideShelf = prodcutBadSideShelf.slice(0, 10);

  useEffect(() => {
    const fatchData = async () => {
      const getProduct = await axios.get("/api/category/bookshelf");
      setProductsBookShelf(getProduct.data);
    };
    fatchData();
  }, []);

  useEffect(() => {
    const fatchData = async () => {
      const getProduct = await axios.get("/api/category/wall_cornar");
      setProductCornerShelf(getProduct.data);
    };
    fatchData();
  }, []);

  useEffect(() => {
    const fatchData = async () => {
      const getProduct = await axios.get("/api/category/bad_side_shelf");
      setProductBadSideShelf(getProduct.data);
    };
    fatchData();
  }, []);

  return (
    <div className=" mt-2 mb-2 ">
      
      <div className="flex my-3 justify-between items-center px-3 py-2 bg-slate-100 mx-1 rounded-md">
        <h3 className="">Book Shelf</h3>
        <Link to="https://woodfeeds.com/category/65a2710c006dc1d348d149c6/Book%20Shelf">
          <button
            type="button"
            className="px-3 py-2 text-xs font-medium text-center text-white bg-cyan-500 rounded-lg hover:bg-cyan-700 focus:outline-none "
          >
            View More
          </button>
        </Link>
      </div>
      <div className="product-grid">
        {displayProduct.map((product, index) => (
          <Product key={index} product={product}></Product>
        ))}
      </div>

      <div className="flex gap-3 p-4 justify-center items-center ">
        <div>
          <img
            className="object-cover w-full h-auto rounded-tl-xl rounded-bl-xl"
            src="/banner.jpg"
            alt="Small1"
          />
        </div>
        <div>
          <img
            className="object-cover w-full h-auto rounded-br-xl rounded-tr-xl"
            src="/banner1.jpg"
            alt="Small"
          />
        </div>
      </div>

      <div className="flex my-3 justify-between items-center px-3 py-2 bg-slate-100 mx-1 rounded-md">
        <h3 className="">Wall Corner</h3>
        <Link to="https://woodfeeds.com/category/65a29aa5c8907a4d2d758f4b/Wall%20Corner">
          <button
            type="button"
            className="px-3 py-2 text-xs font-medium text-center text-white bg-cyan-500 rounded-lg hover:bg-cyan-700 focus:outline-none "
          >
            View More
          </button>
        </Link>
      </div>
      <div className="product-grid">
        {displayCornerShelf.map((product, index) => (
          <Product key={index} product={product}></Product>
        ))}
      </div>

      <div className="flex my-3 justify-between items-center px-3 py-2 bg-slate-100 mx-1 rounded-md">
        <h3 className="">Bad Shide shelf</h3>
        <Link to="https://woodfeeds.com/category/65a29aeec8907a4d2d758f53/Bed%20Side%20Shelf">
          <button
            type="button"
            className="px-3 py-2 text-xs font-medium text-center text-white bg-cyan-500 rounded-lg hover:bg-cyan-700 focus:outline-none "
          >
            View More
          </button>
        </Link>
      </div>
      <div className="product-grid">
        {displayBadSideShelf.map((product, index) => (
          <Product key={index} product={product}></Product>
        ))}
      </div>
    </div>
  );
}

export default CategoryProduct;
