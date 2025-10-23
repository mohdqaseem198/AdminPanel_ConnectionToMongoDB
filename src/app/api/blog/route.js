import next from "next";
import { NextRequest, NextResponse } from "next/server";
import ConnectionToDatabase from "../../../../lib/mongoose";
import Blog from "../../../../models/Blog";
import { Trykker } from "next/font/google";
import { toast } from "react-toastify";

export async function POST(request) {
    try{
        await ConnectionToDatabase();
        const { head , content} = await request.json();
        console.log( 'from route heading : ' ,head);
        const newblog =  new Blog({ heading : head ,blogText : content});
        newblog.save();
        return NextResponse.json( 'Posted' , {status : 200});
    }
    catch(err){
        console.log(err);
        return NextResponse.json('post failed', {status : 500});
    }
};

export async function GET(request) {
    const {searchParams} = new URL(request.url);
    const show = searchParams.get('id');
    console.log('from url' , searchParams);
    console.log('from url' , show);

    if(show == 'null'){
        try{
            await ConnectionToDatabase();
            console.log('inside try to get');
            const getBlogListData = await Blog.find({});
            return NextResponse.json(getBlogListData , {status : 200});
        }
        catch(error){
            console.log(error);
            return NextResponse.json('id present' , {status : 404})
        }
    }

    if(show !== null){
        try{
            await ConnectionToDatabase();
            const getBlogListData = await Blog.find({_id : show});
            console.log(getBlogListData);
            return NextResponse.json(getBlogListData , {status : 200});
        }
        catch(err){
            console.log('id is found, failed in try');
            return NextResponse.json(err, {status : 404})
        }
    }

    return NextRequest.json('error occured', {status : 500});

    
}