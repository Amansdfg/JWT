import React, {useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {addComment, fetchUser} from "../../util/http.js";
import logo from "../../assets/No-photo.gif";

function Comment({post}){
    const [comment,setComment]=useState("");
    const{mutate}=useMutation({
        mutationFn:addComment,
        onError: (error) => {
            console.error("Error posting comment:", error);
        },
        onSuccess: (data) => {
            console.log("Comment posted successfully:", data);
        }
    })
    const{data}=useQuery({
        queryKey:['user'],
        queryFn:fetchUser
    })
    function handleComment() {
        setComment("")
        console.log(comment)
        mutate({ id: post.id, comment });
    }
    return (
        <>
            <div className="flex flex-col gap-4">
                {post.comments.map(comment => (
                    <div className="" key={comment.id}>
                        <div className='flex items-center'>
                            <img className="h-8 rounded-full mr-2" src={logo}/>
                            <span className="dark:text-gray-300 font-extrabold">{comment.username}</span>
                        </div>
                        <span className="dark:text-white">{comment.text}</span>
                    </div>
                ))}
            </div>
            {data &&
            <div className="flex border-b-2 border-black/70 justify-between px-4 py-2">
                <input
                    className="py-1 px-3 w-full rounded-md dark:bg-gray-300 placeholder:text-black"
                    placeholder="add a comment"
                    onChange={(event) => setComment(event.target.value)}
                />
                {comment.length>0 &&<button className="bg-blue-600 px-4 py-1 ml-4 rounded-md text-white  " onClick={() => handleComment()}>Send</button>}
            </div>
            }
        </>
    )
}

export default Comment;