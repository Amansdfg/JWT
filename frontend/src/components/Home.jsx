import { useQuery } from "@tanstack/react-query";
import { fetchAllUsers, fetchUser, getRecommendation } from "../util/http.js";
import Loading from "./UI/Loading.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import photo from "../assets/No-photo.gif";
import React, { useState, useCallback } from "react";
import logo from "../assets/No-photo.gif";

const Home = () => {
    const [expandedPosts, setExpandedPosts] = useState({});

    const toggleContent = useCallback((postId) => {
        setExpandedPosts((prev) => ({
            ...prev,
            [postId]: !prev[postId],
        }));
    }, []);

    const { data: user, isLoading: userLoading, isError: userError } = useQuery({
        queryKey: ['user'],
        queryFn: fetchUser,
    });
    console.log("user: "+user)
    const { data: users, isLoading: usersLoading, isError: usersError } = useQuery({
        queryKey: ['users'],
        queryFn:  fetchAllUsers,
    });
    console.log(users)
    const { data: recData, isLoading: recLoading, isError: recError } = useQuery({
        queryKey: ['rec'],
        queryFn: getRecommendation,
        enabled: !user,
    });
    console.log(recData)

    if (userError || usersError || recError) return <ErrorPage />;

    let rec;
    if (userLoading){
        rec=<Loading/>
    }
        console.log("recData "+recData)
    if (recData) {
        rec =recData.map(mightFriend=> (
            <div className="flex" key={mightFriend.id}>
                <img className="h-8 rounded-full mr-2" src={mightFriend.photo ?? logo} alt="User"/>
                <h3 className="text-xl font-semibold">{mightFriend.username}</h3>
            </div>
        ))

    }
    let content;
    if (userLoading) {
        content = <Loading/>;
    }
    if (userError) {
        content = <p>Error</p>
    }
    if (users) {
        content = users?.map((user) => (
            <div key={user.id} className="flex flex-col gap-5">
                {user.posts.map((post) => (
                    <div key={post.id}
                         className="w-full bg-white px-6 py-4 mx-auto sm:w-post-sm md:w-post-md lg:w-post-lg xl:w-post-xl rounded-md">
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
                    </div>
                ))}
            </div>
        ));
    }

    return (
        <div className="min-h-svh px-12 bg-aman py-10 ">
            {rec}
            {content}
        </div>
    );
};

const PostContent = ({ username, content, isExpanded, onToggle }) => {
    const words = content.split(' ');
    const preview = words.slice(0, 7).join(' ');

    return (
        <div>
            <p className="text-lg">
                <span className="text-lg font-bold">{username} </span>
                {isExpanded ? content : preview}
                {words.length > 10 && (
                    <span>
                        {!isExpanded && '...'}
                        <button onClick={onToggle} className="text-blue-500">
                            {isExpanded ? ' Show Less' : ' Show More'}
                        </button>
                    </span>
                )}
            </p>
        </div>
    );
};

export default Home;
