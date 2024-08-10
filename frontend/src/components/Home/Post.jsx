import logo from "../../assets/No-photo.gif";
import photo from "../../assets/No-photo.gif";
import PostContent from "./PostContent.jsx";
import React, {useCallback, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {addComment} from "../../util/http.js";
function Post({post,user}){
    console.log(post.comments)
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
    const [expandedPosts, setExpandedPosts] = useState({});
    const toggleContent = useCallback((postId) => {
        setExpandedPosts((prev) => ({
            ...prev,
            [postId]: !prev[postId],
        }));
    }, []);
    return (
        <div
            className="w-full bg-white px-6 py-4  sm:w-post-sm md:w-post-md lg:w-post-lg xl:w-post-xl rounded-md">
            <div className="flex">
                <img className="h-8 rounded-full mr-2" src={user.photo ?? logo} alt="User"/>
                <h3 className="text-xl font-semibold">{user.username}</h3>
            </div>
            {post.photoUrl && (
                /\.(mp4|mov)$/i.test(post.photoUrl) ? (
                    <video
                        src={`http://localhost:8081/${post.photoUrl}`}
                        controls
                        className="object-cover w-full h-post-h sm:h-post-sm md:h-post-md lg:h-post-lg xl:h-post-xl"
                    />
                ) : (
                    <img
                        src={post.photoUrl ? `http://localhost:8081/${post.photoUrl}` : photo}
                        alt={post.title}
                        className="object-cover w-full h-post-h sm:h-post-sm md:h-post-md lg:h-post-lg xl:h-post-xl"
                    />
                )
            )}
            <PostContent
                username={user.username}
                content={post.content}
                isExpanded={expandedPosts[post.id]}
                onToggle={() => toggleContent(post.id)}
            />
            <div className="">
                {post.comments.map(comment=>(
                    <div className="flex">
                        <img className="h-8" src={logo}/>
                        <span>{comment.username}</span>
                        <span>{comment.text}</span>
                    </div>

                ))}
            </div>
            <div className="border-b-2 border-black/70">
            <input
                className="py-1 px-3"
                placeholder="add a comment"
                onChange={(event)=>setComment(event.target.value)}
            />
            <button onClick={()=>handleComment()}>Send</button>
            </div>
        </div>
    )
}

export default Post;