import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import Product from "../components/Product";

function CategoryPage() {
  const [categoryValue, setCategoryValue] = useState([]);
  const param = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    const fatchData = async () => {
      setIsLoading(true);
      const category = await axios.get(
        `/api/category/${param.id}/${param.slug}`
      );
      
      if (category) {
        setCategoryValue(category.data);
      }
      setIsLoading(false)
    };
    fatchData();
  }, [param.id, param.slug]);

  // Calculate the indexes for the products to be displayed on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = categoryValue.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    
      isLoading ? (
     <LoadingBox />
   ) : (
      <div>
      <Helmet>
        <title>Category</title>
      </Helmet>
      <div className="product-grid2">
        {currentProducts.length > 0 ? (
          currentProducts.map((product, index) => {
            return <Product key={index} product={product}></Product>;
          })
        ) : (
          <div className="flex justify-center items-center min-h-[50vh]">
            <h3 className="">No Product found!</h3>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center pt-4">
        {Array.from({
          length: Math.ceil(categoryValue.length / productsPerPage),
        }).map((_, index) => (
          <button className="px-3 mr-1 py-2 text-xs font-medium text-center text-white bg-cyan-500 rounded-lg hover:bg-cyan-700  focus:outline-none focus:ring-blue-300 " key={index} onClick={() => paginate(index + 1)}>
             <b>{index + 1}</b>
          </button>
        ))}
      </div>
    </div>
   )
  );
}

export default CategoryPage;
