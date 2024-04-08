import Image from "next/image";
import React from "react";

export default function ProductBanner({ product }) {
  //   console.log("******", product);
  return (
    <div>
      {product?.attributes?.banner?.data?.attributes?.url ? (
        <Image
          src={product?.attributes?.banner?.data?.attributes?.url}
          alt="product-details-banner"
          width={400}
          height={400}
          className="rounded-lg bg-gray-400"
        />
      ) : (
        <div className="w-[368px] h-[368px] bg-slate-200 rounded-lg animate-pulse"></div>
      )}
    </div>
  );
}
