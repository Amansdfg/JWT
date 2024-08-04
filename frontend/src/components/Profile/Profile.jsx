import React from 'react';
import { NavLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '../../util/http.js';
import Loading from '../UI/Loading.jsx';
import ErrorPage from '../../pages/ErrorPage.jsx';
import photo from '../../assets/No-photo.gif';
import settings from '../../assets/settings.svg';

function Profile() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['user'],
        queryFn: fetchUser,
    });

    let content;

    if (isLoading) {
        content = <Loading />;
    }

    if (isError) {
        content = <ErrorPage />;
    }

    if (data) {
        content = (
            <div className=" w-2/3 mx-auto pt-6">
                <div className="flex justify-center gap-52">
                    <img src={photo} alt="Profile" className="w-32 h-32 rounded-full" />
                    <div className="flex flex-col">
                        <div className="flex gap-6 justify-center">
                            <span className="text-2xl">{data.username}</span>
                            <NavLink to="/profile/edit" className="px-3 py-1 bg-white text-xl rounded-md">
                                Edit
                            </NavLink>
                            <NavLink to="/post" className="px-3 py-1 bg-white text-xl rounded-md">
                                Upload post
                            </NavLink>
                            <img src={settings} alt="Settings" className="w-6 h-6" />
                        </div>
                        <div className="flex gap-6">
                            <span className="text-xl">{data.posts.length} Posts</span>
                            <span className="text-xl">{data.friends.length} Friends</span>
                        </div>
                    </div>
                </div>
                <div className="py-10">
                    <span className="text-2xl">Posts</span>
                    <div className=" grid  grid-cols-posts gap-6">
                        {data.posts.length === 0 && <span>No posts yet</span>}
                        {data.posts.length > 0 &&
                            data.posts.map((post) => {
                                return (
                                    <div key={post.id} className="">
                                        {/*<h3 className="text-xl font-semibold">Title: {post.title}</h3>*/}
                                        {/*<p className="text-lg">Content: {post.content}</p>*/}
                                        <img
                                            src={post.photoUrl ? `http://localhost:8080/${post.photoUrl}` : photo}
                                            alt={post.title}
                                            className="w-full h-60 object-cover "
                                        />
                                    </div>
                                );
                            })}

                    </div>

                </div>
            </div>
        );
    }

    return (
        <section className="bg-aman min-h-screen">
            {content}
        </section>
    );
}

export default Profile;
