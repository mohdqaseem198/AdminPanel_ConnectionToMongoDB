'use client';
import { useAuthStore } from "@/Store/ZustandStore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import he from 'he';

const CartReading = () => {

    const searchParam = useSearchParams();
    const id = searchParam.get('id');

    const WishListData = useAuthStore((state) => state.wishList);
    
    const singleData = WishListData.filter((single) => id == single.id);
    console.log(singleData);

    const {head = 'Heading' , text = "Content"} = singleData[0];
    console.log(head);

    return<div className="" id="Cart-reading-section">
            <div className="flex flex-col justify-center p-10 rounded-3xl my-5">
                <h2 className="text-bold text-3xl m-auto">{head?head : 'Heading'} </h2>
                <div
                      className="prose max-w-none mt-3"
                      dangerouslySetInnerHTML={
                        { __html: text ? he.decode(text) : "Content here"}
                    }
                ></div>
            </div>
    </div>
        
};

export default CartReading;