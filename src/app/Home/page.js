'use client';
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuthStore } from "@/Store/ZustandStore";
import { useRouter } from "next/navigation";
import { responseCookiesToRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export default function Home() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number ,setNumber] = useState(0);
  const [location ,setLocation] = useState('');
  const router = useRouter();
const { token, user, loading } = useAuthStore();

  console.log('token is ', token);
  console.log('user is ', user);

  useEffect(() => {
    if(!token && !loading){
      router.push('/Login');
    }
  }, [token, loading]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('submitted');

    try{
        const response = await axios.post('/api/users', {name, email, number, location});
        if(response.status === 200){
          console.log('inside ok');
          toast.success('User Added !!!');
        }
    }
    catch(err){
      console.log(err);
      toast.error('Failed !!!');
    }
  };
    return(
    <div className="">
      <form className="w-[500px] p-10 rounded-3xl m-auto bg-amber-50 " id="form"
      onSubmit={handleSubmit}>
        <div className="flex justify-around m-3">
          <label className="">Name</label>
          <input className="border p-2 rounded-3xl w-[250px]" type="text"
          onChange={(e) => setName(e.target.value)}
          ></input>
        </div>

        <div className="flex justify-around m-3">
          <label>Email</label>
          <input className="border p-2 rounded-3xl w-[250px]" type="email"
          onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        <div className="flex justify-around m-3">
          <label>Number</label>
          <input className="border p-2 rounded-3xl w-[250px]" type="number"
          onChange={(e) => setNumber(e.target.value)}
          ></input>
        </div>

        <div className="flex justify-around m-3">
          <label>Location</label>
          <input className="border p-2 rounded-3xl w-[250px]" type="text"
          onChange={(e) => setLocation(e.target.value)}
          ></input>
        </div>

        <div className="flex flex-row">
          <button onClick={(e) => handleSubmit(e)} className="w-[100px] m-auto cursor-pointer border p-3 rounded-2xl" type="submit">Submit</button>
          <button onClick={() => {setName(''); setEmail('')}
          } className="w-[100px] m-auto cursor-pointer border p-3 rounded-2xl" type="submit">Cancel</button>
        </div>
      </form>

    </div>)
};
