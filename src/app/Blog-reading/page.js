'use client';
import { useEffect, useState } from "react";
import ConnectionToDatabase from "../../../lib/mongoose";
import { NextResponse } from "next/server";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import he from 'he';
import { toast } from "react-toastify";
import * as XLSX from "xlsx-js-style";

const BlogReading = () => {

    const [blogReadindData , setBlogReadingData] = useState('');


    const handleExportTXT = ({head, text}) => {

        const stripHtml = (textWithHTML) => textWithHTML.replace(/<[^>]*>/g, "");
        const textContent = `
            ${head || "Untitled"}
            ----------------------------------------
            ${stripHtml(text || "No content available")}`;

            const blob = new Blob([textContent], { type: "text/plain" });            

            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${head || "blog"}.txt`; // file name = heading
            a.click();

            // Clean up URL object
            URL.revokeObjectURL(url);
            toast.warning('Download Success !!!');
    };

    const handleExportCSV = ({head, text}) => {

        const stripHtml = (withoutHTML) => withoutHTML.replace(/<[^>]*>/g, "");

        const data = [
                { Heading: head || "Untitled", Content: stripHtml(text || "No content available") },
                ];

        const ws = XLSX.utils.json_to_sheet(data);

        // Apply bold to header row (A1)
        ws["A1"].s = { font: { bold: true } };
        ws["A2"].s = { font: { bold: true } };

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Blog");
        XLSX.writeFile(wb, `${head || "blog"}.xlsx`);
        toast.warning('Download Success !!!');
    };

    useEffect(() => {
        async function response() {
            try{
                // const response = await axios.get('/api/blog');
                console.log( 'inside blog-reading function id is : ' ,id);
                const response = await axios.get(`/api/blog?id=${id}`);
                console.log(response.data);
                setBlogReadingData(response.data);
                return NextResponse.json(response, {status : 200});
                
            }
            catch(error){
                console.log(error);
                return NextResponse.json(error , {status : 500})
            }
        }

        if(id){
            response(id);
        }

    }, [])

    const searchParam = useSearchParams();
    const id  = searchParam.get('id');
    console.log(id);

    return(<div className=""    id="blog-reading">
        {blogReadindData && blogReadindData.map((single) => {
            return(<div key={single._id}>
                    <div className="flex flex-col justify-center p-10 rounded-3xl my-5">
                            <h2 className="text-bold text-3xl m-auto">{single.heading? single.heading : 'Heading'} </h2>
                            <div
                                  className="prose max-w-none mt-3"
                                  dangerouslySetInnerHTML={
                                    { __html: single.blogText ? he.decode(single.blogText) : "Content here",}
                                }
                            ></div>

                            <div className="flex flex-row justify-around mt-5 text-right">
                                <button onClick={() => handleExportTXT({head : single.heading , text : single.blogText})}  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Export TXT</button>
                                <button onClick={() => handleExportCSV({head : single.heading , text : single.blogText})} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Export CSV</button>
                            </div>
                    </div>
            </div>)
        })}
    </div>)
};

export default BlogReading;