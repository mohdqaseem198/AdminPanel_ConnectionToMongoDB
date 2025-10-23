import { NextResponse } from "next/server";
import cloudinary from "../../../../lib/cloudinary";  // your Cloudinary setup file
import ConnectionToDatabase from "../../../../lib/mongoose";  // your MongoDB connection function
import ImageModel from "../../../../models/ImageUpload"; // Mongoose model for storing image info


export async function POST(request) {
  try {
    console.log("🔹 POST /api/upload called");

    // 1️⃣ Connect to DB
    await ConnectionToDatabase();
    console.log("✅ Connected to MongoDB");

    // 2️⃣ Read file from FormData
    const formData = await request.formData();
    const file = formData.get("file");
    const imgName = formData.get("imgName");
    

    if (!file) {
      console.log("❌ No file received from client");
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    console.log("📄 File received:", file.name, file.size, file.type);

    // 3️⃣ Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    console.log("✅ Buffer created, length:", buffer.length);

    // 4️⃣ Upload to Cloudinary
    const uploadResponse = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "user_uploads" },
        (error, result) => {
          if (error) {
            console.error("❌ Cloudinary upload error:", error);
            reject(error);
          } else {
            console.log("✅ Cloudinary upload success:", result.secure_url);
            resolve(result);
          }
        }
      );
      stream.end(buffer); // send buffer to Cloudinary
      console.log("🔹 Stream sent to Cloudinary");
    });

    console.log("📌 Upload response:", uploadResponse);
    // 5️⃣ Save in MongoDB
    const newImage = new ImageModel({
      public_id: uploadResponse.public_id,
      url: uploadResponse.secure_url,
      original_filename: uploadResponse.original_filename,
      created_at: uploadResponse.created_at,
      ImgName : imgName,
    });

    const savedImage = await newImage.save();
    console.log("✅ Image saved in MongoDB:", savedImage);

    // 6️⃣ Return response
    return NextResponse.json({ image: savedImage }, { status: 200 });
  } catch (error) {
    console.error("❌ Upload route failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export async function GET(request) {
    // since not passing object hence no request.json()
    try{
        await ConnectionToDatabase();

        const ImageTableData = await ImageModel.find({});
        return NextResponse.json(ImageTableData , {status : 200});
    }
    catch(err){
        console.log(err);
        return NextResponse.json(err, {status : 404})
    }
    
    return NextResponse.json(res , {status  : 200})
};