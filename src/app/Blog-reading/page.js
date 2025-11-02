'use client';
import { useEffect, useState } from "react";
import ConnectionToDatabase from "../../../lib/mongoose";
import { NextResponse } from "next/server";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import he from 'he';
import { toast } from "react-toastify";
import * as XLSX from "xlsx-js-style";
import {useAuthStore} from "../../Store/ZustandStore";

const BlogReading = () => {

    const [blogReadindData , setBlogReadingData] = useState('');
    const {addToWishList} = useAuthStore();

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

    const handleSendEmailTxt = async({head, text}) =>{
        const stripHtml = (html) => html.replace(/<[^>]*>/g, "");
        const textContent = `
          ${head || "Untitled"}
          ----------------------------------------
          ${stripHtml(text || "No content available")}
        `;

        try {
          const responseMail = await axios.post('/api/sendEmail', {to: 'qaseemshahid198@gmail.com', subject: `Blog: ${head}`, content: textContent });
          const data = await responseMail.data;
          console.log('Email Sent:', data);
          toast.success('Email sent successfully!');
        }
        catch (error) {
          console.error(error);
          toast.error('Failed to send email');
        }
    };

    const handleSendEmailCSV = async ({head, text}) => {
      const stripHtml = (withoutHTML) => withoutHTML.replace(/<[^>]*>/g, "");

      const data = [
        { Heading: head || "Untitled", Content: stripHtml(text || "No content available") },
      ];

      // Create worksheet + workbook
      const ws = XLSX.utils.json_to_sheet(data);

      // Apply bold to header row (A1)
        ws["A1"].s = { font: { bold: true } };
        ws["A2"].s = { font: { bold: true } };

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Blog");

      // Convert to binary string
      const wbout = XLSX.write(wb, { bookType: "xlsx", type: "base64" });

      // Send this base64 string to API route
      const res = await axios.post("/api/sendEmail", { file: wbout, filename: `${head || "blog"}.xlsx` , to: 'qaseemshahid198@gmail.com' , subject: `Blog: ${head}`});

      const dataRes = await res.data;
      toast.success('Mail send succesfully !!!');
    };

    const handleAddToCart = ({id ,head ,text}) => {
        addToWishList(id, head ,text);

        // const currentWishList = useAuthStore((state) => state.wishList);
        console.log('current wishlist present is : ', useAuthStore.getState().wishList);
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

                            <div className="flex flex-row justify-around mt-5 text-right">
                                <button onClick={() => handleSendEmailTxt({head : single.heading , text : single.blogText})}  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Mail Me TXT</button>
                                <button onClick={() => handleSendEmailCSV({head : single.heading , text : single.blogText})} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Mail Me CSV</button>
                            </div>

                            <div className="flex flex-row justify-around mt-5 text-right">
                                <button onClick={() => handleAddToCart({ id : single._id, head : single.heading, text : single.blogText})} className="cursor-pointer border px-5 py-2 rounded-3xl bg-amber-200 outline-none">
                                    <svg width={50} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M0 72C0 58.7 10.7 48 24 48L69.3 48C96.4 48 119.6 67.4 124.4 94L124.8 96L537.5 96C557.5 96 572.6 114.2 568.9 133.9L537.8 299.8C532.1 330.1 505.7 352 474.9 352L171.3 352L176.4 380.3C178.5 391.7 188.4 400 200 400L456 400C469.3 400 480 410.7 480 424C480 437.3 469.3 448 456 448L200.1 448C165.3 448 135.5 423.1 129.3 388.9L77.2 102.6C76.5 98.8 73.2 96 69.3 96L24 96C10.7 96 0 85.3 0 72zM160 528C160 501.5 181.5 480 208 480C234.5 480 256 501.5 256 528C256 554.5 234.5 576 208 576C181.5 576 160 554.5 160 528zM384 528C384 501.5 405.5 480 432 480C458.5 480 480 501.5 480 528C480 554.5 458.5 576 432 576C405.5 576 384 554.5 384 528zM336 142.4C322.7 142.4 312 153.1 312 166.4L312 200L278.4 200C265.1 200 254.4 210.7 254.4 224C254.4 237.3 265.1 248 278.4 248L312 248L312 281.6C312 294.9 322.7 305.6 336 305.6C349.3 305.6 360 294.9 360 281.6L360 248L393.6 248C406.9 248 417.6 237.3 417.6 224C417.6 210.7 406.9 200 393.6 200L360 200L360 166.4C360 153.1 349.3 142.4 336 142.4z"/></svg>
                                </button>
                            </div>
                    </div>
            </div>)
        })}
    </div>)
};

export default BlogReading;