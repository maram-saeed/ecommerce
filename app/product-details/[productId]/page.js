"use client";

import BreadCrumb from '../../_components/BreadCrumb';
import productApis from '../../_utils/productApis';
import React, { useEffect, useState } from 'react'
import ProductBanner from './_components/ProductBanner';
import ProductInfo from './_components/ProductInfo';
import ProductList from '../../_components/ProductList';
import { usePathname } from 'next/navigation';

export default function ProductDetails({ params }) {
    const path = usePathname();
    const [productDetails, setProductDetails] = useState({});
    const [productList, setProductList] = useState([]);
    const productId = params?.productId;
    useEffect(() => {
        getProductById_();
    }, [productId])
    const getProductById_ = () => {
        productApis.getProductById(productId).then(response => {
            // console.log(response.data.data);
            setProductDetails(response.data.data);
            getProductListByCategory(response.data.data);
        });
    }
    const getProductListByCategory = (product) => {
        productApis.getProductsByCategory(product?.attributes?.category).then(response => {
            // console.log(response?.data?.data);
            setProductList(response?.data?.data);
        })
    }
    return (
        <div className='px-10 py-8 md:px-20'>
            <BreadCrumb path={path} />
            <div className='mt-10 grid grid-cols-1 gap-5 sm:gap-5 sm:grid-cols-2'>
                <ProductBanner product={productDetails} />
                <ProductInfo product={productDetails} />
            </div>
            <div>
                <h2 className='mt-24 text-xl mb-4'>Similar Products</h2>
                <ProductList productList={productList} />
            </div>
        </div>
    )
}
