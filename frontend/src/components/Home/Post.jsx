import logo from "../../assets/No-photo.gif";
import photo from "../../assets/No-photo.gif";
import PostContent from "./PostContent.jsx";
import React, {useCallback, useState} from "react";

function Post({post,user}){
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
                        src={`http://localhost:8080/${post.photoUrl}`}
                        controls
                        className="object-cover w-full h-post-h sm:h-post-sm md:h-post-md lg:h-post-lg xl:h-post-xl"
                    />
                ) : (
                    <img
                        src={post.photoUrl ? `http://localhost:8080/${post.photoUrl}` : photo}
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
            <input
                className="w-full border-b-2 border-black/70 py-1 px-3"
                placeholder="add a comment"
            />
        </div>
    )
}

export default Post;