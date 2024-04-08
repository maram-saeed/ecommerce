"use client";
import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import productApis from "../_utils/productApis";

export default function ProductSection() {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    getLatestProducts_();
  }, []);
  const getLatestProducts_ = () => {
    productApis.getLatestProducts().then((response) => {
      console.log("#########", response.data.data);
      setProductList(response.data.data);
    });
  };
  return (
    <div className="px-10 md:px-20">
      <h2 className="my-4 text-xl text-center text-gray-600">
        Our Latest Products
      </h2>
      <ProductList productList={productList} />
    </div>
  );
}
