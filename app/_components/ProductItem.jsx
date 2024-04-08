import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProductItem({ product }) {
  return (
    <Link href={`/product-details/${product?.id}`}>
      <div className="p-1 rounded-lg hover:border hover:shadow-md cursor-pointer">
        <Image
          src={product?.attributes?.banner?.data?.attributes?.url}
          alt="banner-card"
          width={400}
          height={350}
          className="rounded-t-lg bg-gray-300"
        />
        <div className="flex items-center justify-between p-3 rounded-b-lg bg-gray-50">
          <div>
            <h2 className="line-clamp-1">{product?.attributes?.title}</h2>
            <h2 className="text-[12px] text-gray-400 line-clamp-1">
              {product?.attributes?.description[0].children[0].text}
            </h2>
            <h2 className="text-[10px] text-gray-400 gap-1 items-center">
              {product?.attributes?.category}
            </h2>
          </div>
          <h2>{product?.attributes?.price}</h2>
        </div>
      </div>
    </Link>
  );
}
