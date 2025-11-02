'use client';
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";
import { useEffect, useState } from "react";
import he from "he";
import Link from "next/link";


const blogListing = () => {

    const [blogListingData , setBlogListingData] = useState('');
    const param = useSearchParams();
    let show  = param.get("show");
    console.log(show);

    useEffect(() => {
        if(show == 'true'){
        try{

             async function response(){
                console.log('Im running')
                const responseBlogListing = await axios.get(`/api/blog?id=${null}`);
                console.log(responseBlogListing.data);
                setBlogListingData(responseBlogListing.data);
                return NextResponse.json(responseBlogListing , {status : 200});
            }
            response();
        }
        catch(error){
            console.log(error);
            return NextResponse.json(error , {status : 500});
        }
    }
    }, [])    

    return (<div id="blog-listing">

        {blogListingData && blogListingData.map((single) => {
            return(
                <Link key={single._id} href={`/Blog-reading?id=${single._id}`}>
                    <div className="flex flex-col justify-center border p-5 rounded-3xl my-5">
                        <h2 className="text-bold text-3xl m-auto">{single.heading? single.heading : 'Heading'} </h2>
                    </div>
                </Link>
            )
        })};

    </div>)
};

export default blogListing;