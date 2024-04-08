"use client";
import { AlertOctagon, BadgeCheck, ShoppingCart } from "lucide-react";
import React from "react";
import SkeletonProductInfo from "./SkeletonProductInfo";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { CartContext } from "../../../_context/CartContext";

import cartApis from "../../../_utils/CartApis";
export default function ProductInfo({ product }) {
  const { user } = useUser();
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext);
  function handleAddToCartClick() {
    if (!user) {
      router.push("/sign-in");
    } else {
      // logic to add to cart
      const data = {
        data: {
          userName: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          products: product?.id,
        },
      };
      cartApis
        .addToCart(data)
        .then((response) => {
          console.log("cart created succssefully");
          setCart((oldCart) => [
            ...oldCart,
            {
              id: response?.data?.data?.id,
              product,
            },
          ]);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }
  return (
    <div>
      {product?.id ? (
        <div>
          <h2 className="text-[20px]">{product?.attributes?.title}</h2>
          <h2 className="text-[15px] text-gray-500">
            {product?.attributes?.category}
          </h2>
          <h2 className="text-[11px]  mt-5">
            {product?.attributes?.description[0].children[0].text}
          </h2>
          <h2 className="text-[11px] text-gray-500 flex items-center gap-2 mt-2">
            {product?.attributes?.instantDelivery ? (
              <BadgeCheck className="text-green-500 w-5 h-5" />
            ) : (
              <AlertOctagon />
            )}
            Eligible For Instant Delivery
          </h2>
          <h2 className="text-[32px] text-primary mt-3">
            ${product?.attributes?.price}
          </h2>
          <button
            onClick={handleAddToCartClick}
            className="flex gap-2 p-3 text-white mt-5 bg-primary hover:bg-teal-600 rounded-lg"
          >
            <ShoppingCart /> Add To Cart
          </button>
        </div>
      ) : (
        <SkeletonProductInfo />
      )}
    </div>
  );
}
