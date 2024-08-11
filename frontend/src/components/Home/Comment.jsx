import React, {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {addComment} from "../../util/http.js";
import logo from "../../assets/No-photo.gif";

function Comment({post}){
    const [comment,setComment]=useState();
    const{mutate}=useMutation({
        mutationFn:addComment,
        onError: (error) => {
            console.error("Error posting comment:", error);
        },
        onSuccess: (data) => {
            console.log("Comment posted successfully:", data);
            setComment("")
        }
    })
    function handleComment() {
        console.log(comment)
        mutate({ id: post.id, comment });
    }
    return (
        <>
            {post.comments.map(comment => (
                <div className="flex" key={comment.id}>
                    <img className="h-8" src={logo}/>
                    <span>{comment.username}</span>
                    <span>{comment.text}</span>
                </div>
            ))}
            <div className="flex border-b-2 border-black/70 justify-between px-4">
                <input
                    className="py-1 px-3"
                    placeholder="add a comment"
                    onChange={(event) => setComment(event.target.value)}
                />
                <button onClick={() => handleComment()}>Send</button>
            </div>
        </>
    )
}

export default Comment;