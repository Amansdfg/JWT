import React, {useState} from 'react';
import {Link, NavLink, useParams} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {fetchFriend, fetchUser} from '../../util/http.js';
import Loading from '../UI/Loading.jsx';
import ErrorPage from '../../pages/ErrorPage.jsx';
import photo from '../../assets/No-photo.gif';
import settings from '../../assets/settings.svg';
import Modal from "../UI/Modal.jsx"
import Comment from "../Home/Comment.jsx";
import ProfilePost from "./ProfilePost.jsx";
function Profile() {
    const param=useParams();
    const[modalPage,setModalPage]=useState();
    const[modalDetails,setModalDetails]=useState();
    let data;
    let isError;
    let isPending;
    if(param.id) {
        const {data: friend,isPending:isPendingFriend,isError:isErrorFriend} = useQuery({
            queryKey: ['friends', param.id],
            queryFn: () => fetchFriend({id: param.id})
        })
        data=friend;
        isPending=isPendingFriend;
        isError=isErrorFriend;
    }else {
        const {data:user, isPending:isPendingUser, isError:isErrorUser} = useQuery({
            queryKey: ['user'],
            queryFn: ({signal}) => fetchUser({signal})
        });
        data=user;
        isPending=isPendingUser;
        isError=isErrorUser;
    }
    function modalDetailsGoi(post){
        setModalDetails(post);
    }
    function modalGoi(post){
        setModalPage(post);
    }
    let content;

    if (isPending) {
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
                        <div className="flex gap-2 md:gap-6 justify-center items-center">
                            <span className="text-xl lg:text-2xl">{data.username}</span>
                            {!param.id &&
                                <>
                                    <Link to="/profile/edit" className="px-3 py-1 text-sm sm:text-md md:text-lg lg:text-xl bg-white  rounded-md">
                                        Edit
                                    </Link>
                                    <Link to="/post" className="px-3 py-1 bg-white text-sm sm:text-md md:text-lg lg:text-xl rounded-md">
                                        Upload post
                                    </Link>
                                </>
                            }
                            {param.id &&
                                <Link to={`/chat/`+param.id} className="px-3 py-1 bg-white text-sm sm:text-md md:text-lg lg:text-xl rounded-md">
                                    Chat
                                </Link>
                            }

                            <img src={settings} alt="Settings" className="w-6 h-6" />
                        </div>
                        <div className="flex gap-6">
                            <Link className="text-sm sm:text-md md:text-lg lg:text-xl" to="/profile">{data.posts.length} Posts</Link>
                            <Link className="text-sm sm:text-md md:text-lg lg:text-xl" to={param.id?`/friends/`+param.id :"/friends"}>{data.friends.length}  Friends</Link>
                        </div>
                    </div>
                </div>
                <div className="py-10">
                    <span className="text-2xl">Posts</span>
                    <div className=" grid  grid-cols-posts gap-6">
                        {data.posts.length === 0 && <span>No posts yet</span>}
                        {data.posts.length > 0 &&
                            <ProfilePost posts={data.posts} modalGoi={modalGoi}/>
                        }
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
                            <Comment post={modalPage}/>
                        </div>
                    </div>
                </Modal>

            )}
            {modalDetails &&
                <Modal onClose={closeModalDetails}
                       classes="top-1/2 transform -translate-y-1/2 w-[40%] flex flex-col divide-y-2 divide-black/40">
                    <button className="p-2"
                            onClick={() => handleShare(`http://localhost:8081/${modalPage.photoUrl}`)}>Share
                    </button>
                    <button className="p-2"
                            onClick={() => copyToClipboard(`http://localhost:8081/${modalPage.photoUrl}`)}>Copy URL
                    </button>
                    <button className="p-2" onClick={() => closeModalDetails()}>close</button>
                </Modal>
            }
        </section>
    );
}

export default Profile;
