import photo from "../../assets/No-photo.gif";
import React from "react";

function Content({post}){
    return  (
        /\.(mp4|mov)$/i.test(post.photoUrl) ? (
            <video
                src={`http://localhost:8081/${post.photoUrl}`}
                controls
                className="object-contain bg-gray-600 w-full h-post-h sm:h-post-sm md:h-post-md lg:h-post-lg xl:h-post-xl"
            />
        ) : (
            <img
                src={post.photoUrl ? `http://localhost:8081/${post.photoUrl}` : photo}
                alt={post.title}
                className="object-contain bg-gray-600 w-full h-post-h sm:h-post-sm md:h-post-md lg:h-post-lg xl:h-post-xl"
            />
        )
    )
}
export default Content;