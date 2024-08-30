import {useParams} from "react-router-dom";
import {useState} from "react"
import {useMutation} from "@tanstack/react-query";
import {reset} from "../../util/http.js";

export default function ResetPassword(){
    const {token}=useParams();
    const[password,setPassword]=useState("");
    const[confirmationPassword,setConfirmationPassword]=useState('');
    const {mutate}=useMutation({
        mutationFn:reset,
        onSuccess:(data)=>{
            console.log("Aman")
        },
        onError:(error)=>{
            console.log("Error")
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
        <section className='flex  justify-center items-center'>
            <form className="flex flex-col w-[400px] gap-4" onSubmit={handleSubmit}>
                <label className="">Password</label>
                <input placeholder="password" onChange={(event)=>setPassword(event.target.value)}/>
                <label>Confirmation Password</label>
                <input placeholder="confirmation password" onChange={(event)=>setConfirmationPassword((event.target.value))}/>
                <p>
                    <button className="px-4 py-1 bg-blue-500 text-white rounded-xl">Save</button>
                </p>
            </form>
        </section>
    )
}