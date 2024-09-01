import logo from "../../assets/No-photo.gif";
import PostContent from "./PostContent.jsx";
import React, {useCallback, useState} from "react";
import Content from "./Content.jsx";
import Comment from "./Comment.jsx";
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
            className="w-full bg-white dark:bg-lightMode flex flex-col gap-2 px-6 py-4  sm:w-post-sm md:w-post-md lg:w-post-lg xl:w-post-xl rounded-md">
            <div className="flex">
                <img className="w-8 h-8 object-cover  rounded-full mr-2" src={`http://localhost:8081/${user.photo}`} alt="User"/>
                <h3 className="dark:text-white text-xl font-semibold">{user.username}</h3>
            </div>
            {post.photoUrl &&<Content post={post}/>}
            <PostContent
                username={user.username}
                content={post.content}
                isExpanded={expandedPosts[post.id]}
                onToggle={() => toggleContent(post.id)}
            />
            <Comment post={post}/>
        </div>
    )
}

export default Post;