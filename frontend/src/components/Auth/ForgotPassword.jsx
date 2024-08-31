import lock from "../../assets/lock.svg";
import {Link} from "react-router-dom";
import {useState} from "react"
import {useMutation} from "@tanstack/react-query";
import {forgot} from "../../util/http.js"
import Notification from "../UI/Notification.jsx";

import Footer from "../Footer.jsx";
import Header from "../Header/Header.jsx";
export default function ForgotPassword() {
    const[email,setEmail]=useState('');
    const[notification,setNotification]=useState(
        {
            show:false,
            type:"",
            message:""
        }
    );

    const{mutate} =useMutation({
        mutationFn:forgot,
        onSuccess:(data)=>{
            setNotification({show: true,type: "success",message:data.message})
        },
        onError:(error)=>{
            setNotification({show:true,type:"error",message: error.message})
        }
    })
    function handleSubmit(){
        setNotification({show:true,type: "info",message: 'loading...'})
        mutate({email:email})
    }

    return (
        <section className="w-full flex justify-center items-center bg-aman min-h-svh dark:bg-darkMode">
            {notification.show && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={() => setNotification({ show: false, type: '', message: '' })}
                />
            )}
            <div className="bg-white rounded-xl mt-[100px] flex flex-col justify-center pt-10 px-8 w-[400px] text-center">
                <img
                    src={lock}
                    alt="lock"
                    className="h-[100px] aspect-square mx-auto border-4 rounded-full p-3 border-black"
                />
                <h2 className="my-4 text-2xl font-extrabold">Trouble logging in?</h2>
                <span className="px-4">Enter an email and we'll send you a link to get back into your account</span>
                <input placeholder="email" className="mt-4 p-2 w-full border rounded" onChange={(event)=>setEmail(event.target.value)}/>
                <button className="my-4 bg-blue-500 text-white py-2 px-4 rounded-xl" onClick={handleSubmit} >Send Link</button>
                <div className="flex flex-row">
                    <span className="h-[1px] bg-gray-600 top-[0.65rem] flex-1 relative"></span>
                    <h1 className="uppercase px-3 text-gray-600 font-extrabold border-0 shrink-0 m-0 p-0 text-base">Or</h1>
                    <span className="h-[1px] bg-gray-600 top-[0.65rem] flex-1 relative"></span>
                </div>
                <Link to="/register" className="font-bold mt-4">Create new Account</Link>
                <Link to="/login" className="mt-[80px] py-2 mb-4 border-2 bg-gray-50 rounded-xl">Back to login</Link>
            </div>
        </section>
    );
}
