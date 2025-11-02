'use client';
import { useAuthStore } from "@/Store/ZustandStore";
import { setupDevBundler } from "next/dist/server/lib/router-utils/setup-dev-bundler";
import Link from "next/link";
import { useEffect, useState } from "react";

const Cart = () => {
    
    const [updatedData , setUpdatedData] = useState(null);
    const {addToWishList, removeFromWishList, ClearWishList} = useAuthStore();
    const WishListData = useAuthStore((state) => state.wishList);
    setUpdatedData(WishListData);
    console.log(WishListData);

    const handleClearAll = () => {
        ClearWishList();
    };

    const handleRemove = (id) => {
        console.log('remove clicked', id);
        removeFromWishList(id);
    };

    useEffect(() => {

    }, [updatedData])

    return(<div className="" id="Cart-Section">
        { updatedData && updatedData.map((single) => {
            return(
            <div key={single.id} className="flex flex-row justify-between border p-5 rounded-3xl my-5">
                <Link href={`/Cart-reading?id=${single.id}`}>
                    <div>
                        <h2 className="text-bold text-3xl m-auto">{single.text? single.head : 'Heading'} </h2>
                    </div>
                 </Link>
                 <button onClick={() => handleRemove({id : single.id})} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Remove</button>
         </div>)
        })
        }
        <div className="flex flex-row justify-center">
            <button onClick={() => handleClearAll()} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Clear All</button>
        </div>
    </div>)
};

export default Cart;