import React, {useState} from 'react';
import {NavLink, useParams} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '../../util/http.js';
import Loading from '../UI/Loading.jsx';
import ErrorPage from '../../pages/ErrorPage.jsx';
import photo from '../../assets/No-photo.gif';
import settings from '../../assets/settings.svg';
import Modal from "../UI/Modal.jsx"
function Profile() {
    const[modalPage,setModalPage]=useState();
    const[modalDetails,setModalDetails]=useState();
    const { data, isLoading, isError } = useQuery({
        queryKey: ['user'],
        queryFn:({signal})=>fetchUser({signal})
    });
    function modalDetailsGoi(post){
        setModalDetails(post);
    }
    function modalGoi(post){
        setModalPage(post);
    }
    let content;

    if (isLoading) {
        content = <Loading />;
    }

    if (isError) {
        content = <ErrorPage />;
    }
    function closeModal() {
        setModalPage(null);
    }
    function closeModalDetails() {
        setModalDetails(null);
    }
    function copyToClipboard(url) {
        navigator.clipboard.writeText(url).then(() => {
            alert('URL copied to clipboard!'); // Replace with a better UI feedback if desired
        });
    }

    function handleShare(url) {
        if (navigator.share) {
            navigator.share({
                title: 'Share this post',
                url: url
            }).catch(console.error);
        } else {
            alert('Share not supported on this browser');
        }
    }
    if (data) {
        content = (
            <div className=" w-2/3 mx-auto pt-6">
                <div className="flex justify-evenly">
                    <img src={photo} alt="Profile" className="aspect-square h-16 sm:h-16 md:h-24 lg:h-32 rounded-full" />
                    <div className="flex flex-col">
                        <div className="flex gap-2 md:gap-6 justify-center">
                            <span className="text-xl lg:text-2xl">{data.username}</span>
                            <NavLink to="/profile/edit" className="px-3 py-1 text-sm sm:text-md md:text-lg lg:text-xl bg-white  rounded-md">
                                Edit
                            </NavLink>
                            <NavLink to="/post" className="px-3 py-1 bg-white text-sm sm:text-md md:text-lg lg:text-xl rounded-md">
                                Upload post
                            </NavLink>
                            <img src={settings} alt="Settings" className="w-6 h-6" />
                        </div>
                        <div className="flex gap-6">
                            <span className="text-sm sm:text-md md:text-lg lg:text-xl">{data.posts.length} Posts</span>
                            <span className="text-sm sm:text-md md:text-lg lg:text-xl">{data.friends.length} Friends</span>
                        </div>
                    </div>
                </div>
                <div className="py-10">
                    <span className="text-2xl">Posts</span>
                    <div className=" grid  grid-cols-posts gap-6">
                        {data.posts.length === 0 && <span>No posts yet</span>}
                        {data.posts.length > 0 &&
                            data.posts.map((post) => (
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
                            ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section className="bg-aman min-h-screen">
            {content}
            {modalPage && (
                <Modal onClose={closeModal} classes='w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] h-[90%] p-8'>
                    <div className="flex h-full w-full">
                        <button className="fixed  top-2 right-2" onClick={closeModal}>Close</button>
                        {modalPage.photoUrl && (
                            /\.(mp4|mov)$/i.test(modalPage.photoUrl) ? (
                                <video
                                    src={modalPage.photoUrl ? `http://localhost:8081/${modalPage.photoUrl}` : photo}
                                    className="w-[50%] h-[90%] object-contain bg-gray-600 rounded-md"
                                    controls
                                />) : (
                                <img
                                    src={modalPage.photoUrl ? `http://localhost:8081/${modalPage.photoUrl}` : photo}
                                    alt={modalPage.name}
                                    className="w-full lg:w-[50%] h-[100%] object-contain bg-gray-600 rounded-md "
                                />
                            ))
                        }
                        <div className="ml-8">
                            <div className="flex gap-3 items-center">
                                <img className='h-10 rounded-full' src={data.photo ?? photo} alt={data.id}/>
                                <span>{data.username}</span>
                                <button onClick={()=>modalDetailsGoi(modalPage)}>...</button>
                            </div>
                            <p className="text-md">Content: {modalPage.content}</p>
                        </div>
                    </div>
                </Modal>

            )}
            {modalDetails &&
                <Modal onClose={closeModalDetails}
                       classes="top-1/2 transform -translate-y-1/2 w-[40%] flex flex-col divide-y-2 divide-black/40">
                    <button className="p-2"
                            onClick={() => handleShare(`http://localhost:8080/${modalPage.photoUrl}`)}>Share
                    </button>
                    <button className="p-2"
                            onClick={() => copyToClipboard(`http://localhost:8080/${modalPage.photoUrl}`)}>Copy URL
                    </button>
                    <button className="p-2" onClick={() => closeModalDetails()}>close</button>
                </Modal>
            }
        </section>
    );
}

export default Profile;
