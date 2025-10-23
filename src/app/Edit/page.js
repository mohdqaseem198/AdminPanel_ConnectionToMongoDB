'use client'
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Edit = () => {

    const parameter = useSearchParams();
    const id = parameter.get("id");
    const [dataById , setDataById] = useState({
      _id : '',
      name : '',
      email : '',
      location : '',
      number : ''
    });

    const handleName = (e , field) =>{
      setDataById((prev) => ({
        ...prev,
        [field] : e.target.value
    }));
    };

      const handleSave = async(e) => {
        e.preventDefault();
        const responseSave = await axios.put(`/api/users`, dataById);
        
        if(responseSave.status === 200){
          toast.success('Edited !!!');
        }
      };

      const handleDelete = async(e) => {
        e.preventDefault();
        const responseDelete = await axios.delete(`/api/users?id=${dataById._id}`);
        if(responseDelete.status === 200){
          toast.warning('Deleted !!!');
        }
      }

    useEffect(() => {

        if(!id) return;

        const fetchData = async() => {
            try{
                const getEditResponse = await axios.get(`/api/users?id=${id}`);
                setDataById(getEditResponse.data);
                }
            catch(err){
                console.log(err);
            }
        }
        
        fetchData();

    }, [id])

    return(<div id="edit">
        <button className="cursor-pointer">Edit</button>

        {id && 
        <form className="w-[500px] p-10 rounded-3xl m-auto bg-gray-200 " id="form">
        <div className="flex justify-around m-3">
          <label className="">Name</label>
          <input onChange={(e) => handleName(e, 'name')}  value={dataById.name} className="border p-2 rounded-3xl w-[250px]" type="text"></input>
        </div>

        <div className="flex justify-around m-3">
          <label>Email</label>
          <input onChange={(e) => handleName(e, 'email')} value={dataById.email} className="border p-2 rounded-3xl w-[250px]" type="email"></input>
        </div>

        <div className="flex justify-around m-3">
          <label>Number</label>
          <input onChange={(e) => handleName(e, 'number')} value={dataById.number || 0} className="border p-2 rounded-3xl w-[250px]" type="number"></input>
        </div>

        <div className="flex justify-around m-3">
          <label>Location</label>
          <input onChange={(e) => handleName(e, 'location')} value={dataById.location || 'null'} className="border p-2 rounded-3xl w-[250px]" type="text"></input>
        </div>

        <div className="flex flex-row">
          <button onClick={(e) => handleSave(e)} className="w-[100px] m-auto cursor-pointer border p-3 rounded-2xl" type="submit">Save</button>
          <button onClick={(e) => handleDelete(e)} className="w-[100px] m-auto cursor-pointer border p-3 rounded-2xl" type="submit">Delet</button>
        </div>
      </form>
        }
    </div>)
};

export default Edit;