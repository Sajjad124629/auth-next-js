"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
    const inesial = {
        email: "",
        password: ""

    }
   
    const router = useRouter();
    const [formData, setFormData] = useState(inesial);


    const handelChange = (event) => {

        const { name, value } = event.target;
        setFormData((prevValue) => ({
            ...prevValue,
            [name]: value,
        }))
    }

    const handelSubmit = async (event) => {
        event.preventDefault();
        if (formData.email.length === 0) {
            alert('Please enter a  email');
        }
        else if (formData.password.length === 0) {
            alert('Please enter a  Password');
        }
        else{
            const callbackUrl = "/pages/dashboard"
            const res = await signIn('credentials',{
                redirect:false,
                email:formData.email,
                password:formData.password,
                callbackUrl
            });

           
            if(res.ok){
                router.replace(callbackUrl);
            }

           if(res.url==null){
               toast.error('🦄 Login Faild!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(() => {
                    location.reload();
                }, 2000);
            }
            
        }
    }
    
    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        Login
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form onSubmit={handelSubmit} className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input onChange={handelChange} value={formData.email} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input onChange={handelChange} value={formData.password} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>

                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-violet-600">Sign in</button>

                            </form>
                            {/* <button className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-violet-600">Sign in With Google</button> */}
                            {/* <button onClick={() => signIn('github')} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-violet-600">Sign in With GitHub</button> */}
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <Link href="/pages/registration" className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-blue-500">Sign up</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    );
};

export default Login;