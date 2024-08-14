import photo from "../../assets/No-photo.gif";
import React from "react";

export default function ProfilePost({posts,modalGoi}){
    return  posts.map((post) => (
        <div key={post.id} className="cursor-pointer" onClick={()=>modalGoi(post)}>
            {post.photoUrl && (
                /\.(mp4|mov)$/i.test(post.photoUrl) ? (
                    <video
                        src={post.photoUrl ? `http://localhost:8081/${post.photoUrl}` : photo}
                        className="w-full h-60 object-contain bg-gray-600  rounded-md"
                    />):(
                    <img
                        src={post.photoUrl ? `http://localhost:8081/${post.photoUrl}` : photo}
                        alt={post.name}
                        className="w-full h-60 object-contain bg-gray-600 rounded-md"
                    />))
            }
        </div>
    ))
}