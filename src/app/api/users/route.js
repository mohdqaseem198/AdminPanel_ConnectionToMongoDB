import { NextResponse } from "next/server";
import ConnectionToDatabase from "../../../../lib/mongoose";
import User from "../../../../models/User";
import { toast } from "react-toastify";


export async function POST(request){
    try{
        await ConnectionToDatabase();
        const {name, email, number, location} = await request.json();
        const newUser = new User({name, email, number, location});
        await newUser.save();
        return NextResponse.json(newUser, {status : 200});
    }
    catch(err){
        console.log(err);
    }
};

export async function GET(request){
    
    try{
        await ConnectionToDatabase();
        const {searchParams} = new URL(request.url);
        const name = searchParams.get("name");
        const id = searchParams.get("id") || '' ;

        if(id !== ''){
            const userById = await User.findById(id);
            return NextResponse.json(userById, {status : 200});
        }

        if(!name){
            const allUsers = await User.find({}).sort({_id : -1});
            return NextResponse.json(allUsers ,{status : 200});
        }

        if(name !== null || name !== ''){
            const filteredUsers = await User.find({'name' : { $regex: new RegExp(name, "i") } });
            return NextResponse.json(filteredUsers ,{status : 200});
        }
    }
    catch(err){
        console.log(err);
    }
};

export async function PUT(request) {
    try{
        await ConnectionToDatabase();
        const {_id, name, number, location, email} = await request.json();
        
        if(!_id){
            return NextResponse('Id not found', {status : 404})
        }

        const EditedUser = await User.findByIdAndUpdate(
            _id,
            {name, email, location, number},
            {new : true}
        );

        if(!EditedUser){
            return NextResponse('Edited User not found', {status : 404});
        }

        return NextResponse.json( 'return with next response', {status : 200});
    }
    catch(err){
        console.log(err);
        return NextResponse.json(err, {status : 500});
    }
};

export async function DELETE(request) {
    try{
        await ConnectionToDatabase();
        const {searchParams} = new URL(request.url);
        const id = searchParams.get("id");

        if(!id){
            return NextResponse.json('id not found' , {status : 404})
        }

        const deleteUser = await User.findByIdAndDelete(id);

        if(!deleteUser){
            return NextResponse.json('failed to delete' , {status : 500});
        }

        return NextResponse.json('done', {status : 200});

    }
    catch(err){
        return NextResponse.json(err, {status : 500});
    }
}