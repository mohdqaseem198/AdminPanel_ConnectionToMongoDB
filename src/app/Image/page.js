'use client';
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { NextResponse } from "next/server";
import Image from "next/image";

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imgName, setImgName] = useState('');
  const [imageTableData , setImageTableData] = useState(null);

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select an image first!");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", selectedFile); // must match backend's `formData.get("file")`
      formData.append("imgName", imgName);

      const response = await axios.post("/api/upload", formData );

      if (response.status === 200) {
        console.log("Uploaded image info:", response.data.image);
        toast.success("Image uploaded successfully!");
      }
    } catch (error) {
      console.error("Upload failed: from page.js", error);
      toast.error("Image upload failed!");
    }
  };

  const ShowTable = async(e) => {
    e.preventDefault();

    const reponseShowTable = await axios.get(`/api/upload?all=${0}`);
    setImageTableData(reponseShowTable.data);
    console.log(imageTableData);
    return NextResponse.json('Success !!!', {status : 200});
  };

  return (
    <div>
      <div className="p-6 flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-3">Upload Image</h2>

          <div>
              <label className="text-lg font-semibold mx-3">Name</label>
              <input onChange={(e) => setImgName(e.target.value)} className="border p-2 rounded-lg mb-4 outline-none inline-block"></input>
          </div>

        <input
          type="file" onChange={(e) => setSelectedFile(e.target.files[0])}
          className="border p-2 rounded-lg mb-4"/>

      <div>
        <button onClick={handleUpload} className="bg-green-500 m-2 text-white px-5 py-2 rounded-xl">Upload </button>
        <button onClick={(e) => ShowTable(e)} className="bg-green-500 text-white px-5 py-2 rounded-xl">Show Data</button>
      </div>
  </div>

  <div>
      {imageTableData && imageTableData.map((single, index) => 
        <div className="flex flex-row justify-around m-5" key={index}>
          <h2 className="text-2xl my-auto">{single.ImgName || ''}</h2>
          <Image alt="img" src={single.url} width={200} height={200} />
        </div>
      )}
  </div>
</div>
  );
};

export default ImageUpload;
