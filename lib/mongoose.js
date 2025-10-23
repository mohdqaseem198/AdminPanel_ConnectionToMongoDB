import mongoose from "mongoose";

const ConnectionToDatabase = async() => {
    try{
        await mongoose.connect(process.env.MongoURL);
        console.log('Connected to db');
    }
    catch(err){
        console.log(err);
        console.log('db connection failed');
    }
};

export default ConnectionToDatabase;