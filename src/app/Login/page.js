'use client';
import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Login = () => {

    const router = useRouter();

    const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      toast.success(`Welcome ${result.user.displayName}`);
      console.log(`Token ${result.user.accessToken}`);

      if(result.user.accessToken){
        router.push('/Home');
      }

    } catch (error) {
      console.error("Login Error:", error);
      toast.error('LogIn Failed !!!');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button onClick={handleLogin} className="mx-5 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
        Sign in with Google</button>

        <a target="_blank" href="https://support.google.com/mail/answer/56256?hl=en">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
        Sign Up</button>
        </a>
    </div>
  );
};

export default Login;
