import {useParams } from 'react-router-dom';
import Header from "../Header/Header.jsx";
import Friends from "./Friends.jsx";
import Messages from "./Messages.jsx";
import {useQuery} from "@tanstack/react-query";
import {fetchUser} from "../../util/http.js";
import Loading from "../UI/Loading.jsx";
import React from "react";

export default function Chat() {
    const params = useParams();
    const { data: user, isLoading: isUserLoading, isError: isUserError, error: userError } = useQuery({
        queryKey: ['user'],
        queryFn:fetchUser
    });
    console.log(user)
    if (isUserLoading) return (
        <div className="w-screen h-screen flex justify-center items-center">
            <Loading />
        </div>
    );
    if (isUserError) return <p>Error loading user</p>;

    return (
        <section className="w-screen h-dvh flex flex-col bg-aman dark:bg-darkMode">
            <Header/>
            <div className="py-3 px-2 flex-1 overflow-hidden flex gap-4">
                <div className={`flex-col gap-3 flex ${!params.id ? " w-full md:w-30p" : " w-30p hidden md:flex"}`}>
                  <Friends friends={user.friends}/>
                </div>
                <div className={`px-4 py-3 bg-white dark:bg-lightMode drop-shadow-md rounded-md  ${!params.id?"hidden w-70p md:flex":"w-full md:w-70p"}`}>
                    <Messages id={params.id} user={user}/>
                </div>
            </div>
        </section>
    );
}
