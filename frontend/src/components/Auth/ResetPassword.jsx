import {Link, useParams} from "react-router-dom";
import {useState} from "react"
import {useMutation} from "@tanstack/react-query";
import {reset} from "../../util/http.js";
import Footer from "../Footer.jsx";
import Header from "../Header/Header.jsx";
import Notification from "../UI/Notification.jsx";

export default function ResetPassword(){
    const {token}=useParams();
    const[password,setPassword]=useState("");
    const[confirmationPassword,setConfirmationPassword]=useState('');
    const[notification,setNotification]=useState(
        {
            show:false,
            type:'',
            message:''
        }
    );
    const {mutate}=useMutation({
        mutationFn:reset,
        onSuccess:(data)=>{
            setNotification({show: true,type:"success" ,message:`Successfully password changed, link for login`})
        },
        onError:(error)=>{
            setNotification({show: true,type:"error" ,message:"Error found during change password: "+error})
        }
    })
    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(password!==confirmationPassword){
            console.log("doesnt match")
            return;
        }
        mutate({password,token})
    }
    return(
            <section className='pt-[150px]'>
                <h1 className="text-center mb-4 text-2xl font-bold">This page for reset password</h1>
                <form className="flex mx-auto px-10 py-8 rounded-xl dark:bg-aman bg-lightMode flex-col w-[400px] gap-4" onSubmit={handleSubmit}>
                    <label className="text-white dark:text-black font-semibold">Password</label>
                    <input placeholder="password" className='px-4 py-1 rounded-md' onChange={(event)=>setPassword(event.target.value)}/>
                    <label className="text-white dark:text-black font-semibold">Confirmation Password</label>
                    <input placeholder="confirmation password" className='px-4 py-1 rounded-md' onChange={(event)=>setConfirmationPassword((event.target.value))}/>
                    <p>
                        <button className="px-4 py-1 bg-blue-500 text-white rounded-xl">Save</button>
                    </p>
                </form>
                {notification.show &&
                    <Notification
                        type={notification.type}
                        message={notification.message}
                        onClose={()=>setNotification({show: false,type: "" ,message:""})}
                />}
            </section>
    )
}