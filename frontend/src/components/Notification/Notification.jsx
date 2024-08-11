import {useMutation, useQuery} from "@tanstack/react-query";
import {acceptUser, fetchRequest} from "../../util/http.js";
import Loading from "../UI/Loading.jsx";
import logo from "../../assets/No-photo.gif";
import React from "react";

function Notification(){
    const{mutate}=useMutation({
        mutationFn:acceptUser,
        onError: (error) => {
            console.error("Error accepting request:", error);
        },
        onSuccess: (data) => {
            console.log("request accepted successfully:", data);
        }
    })
    const{data,isPending,isError}=useQuery({
        queryKey:['request'],
        queryFn:fetchRequest,
    })
    function handleMutate(username){
        mutate({username})
    }
    let content;
    if(isPending){
        content=<Loading/>
    }
    if(data){
        content=data.map(user=>(
            <div className="bg-white px-6 py-4 rounded-md  flex items-center" key={user.id}>
                <img className="h-10 rounded-full mr-2" src={user.photoUrl ?? logo} alt="User"/>
                <div>
                    <h3 className="text-xl font-semibold">{user.username}</h3>
                    <span>{user.firstName} {user.lastName}</span>
                </div>
                <button className="ml-auto bg-gray-300 font-sans text-lg  rounded-md px-4 py-1"
                        onClick={()=>handleMutate(user.username)}
                >
                    accept
                </button>
            </div>
        ))
    }
    return(
        <section className="px-10 py-8">
            <div className="px-4 bg-gray-400 rounded-md py-2">
                <span className="text-lg w-full text-center">Request to be a friend</span>
                {content}
            </div>
        </section>
    )
}
export default Notification;