'use client';
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import Edit from "../Edit/page";
import { toast } from "react-toastify";

const Search = () => {

    const [name, setName] = useState('');
    const [searchResult, setSearchResult] = useState('');

    const handleSearch = async() => {
        
        console.log('search clicked');
        try{
            const searchResponse = await axios.get(`/api/users?name=${name}`);
            console.log( 'from search page : ' ,searchResponse);
            setSearchResult(searchResponse.data);
            toast.info('Found !!!');
        }
        catch(err){
            console.log(err);
            toast.err('Failed !!!');
        }
    };

    return(<div className="my-10" id="search">
            <div className="w-[500px] flex flex-row m-auto justify-around">
              <label>Name </label>
              <input className="border p-2 rounded-3xl w-[250px]" type="text"
              onChange={(e) => setName(e.target.value)}
              ></input>

              <button onClick={() => handleSearch()} className="border cursor-pointer bg-green-300 px-5 rounded-3xl">Search</button>
            </div>

            <div className="flex flex-row justify-center my-10" id="table">
                <table>
                    <tr>
                            <th className="p-5 border" >id</th>
                            <th className="p-5 border" >name</th>
                            <th className="p-5 border" >email</th>
                            <th className="p-5 border" >number</th>
                            <th className="p-5 border" >location</th>
                            <th className="p-5 border" >Modify</th>
                    </tr>
                    <tbody>
                        {/* here use map */}
                        {searchResult && searchResult.map((single) => {
                            return( 
                            <tr key={single._id}>
                                <td className="p-5 border" >{single._id}</td>
                                <td className="p-5 border" >{single.name}</td>
                                <td className="p-5 border" >{single.email}</td>
                                <td className="p-5 border" >{single.number || 'null'}</td>
                                <td className="p-5 border" >{single.location || 'null'}</td>
                                <td className="p-5 border bg-amber-200" >
                                    <Link href={`/Edit?id=${single._id}`}>
                                        <button className="cursor-pointer">
                                            <Edit />
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

    </div>)
};

export default Search;