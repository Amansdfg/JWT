import {useMutation, useQuery} from "@tanstack/react-query";
import {fetchUser, getRecommendation, sendRequest} from "../../util/http.js";
import ErrorPage from "../../pages/ErrorPage.jsx";
import Loading from "../UI/Loading.jsx";
import logo from "../../assets/No-photo.gif";
import React from "react";
import {Link} from "react-router-dom";

function Rec(){
    const { data: user, isLoading: userLoading, isError: userError } = useQuery({
        queryKey: ['user'],
        queryFn: fetchUser,
    });
    const { data: recData, isLoading: recLoading, isError: recError } = useQuery({
        queryKey: ['rec'],
        queryFn: getRecommendation,
        // enabled: !user,
    });

    const{mutate}=useMutation({
        mutationFn:sendRequest,
    })
    function handleRequest(id){
        mutate({id});
    }
    if (userError  || recError) return <ErrorPage />;
    let content;
    if (userLoading) {
        content = <Loading/>;
    }
    if (userError) {
        content = <p>Error</p>
    }
    if(recData){
        content= recData.map(user=> (
                <Link className="flex justify-center items-center" key={user.id} to={`profile/`+user.id}>
                    <img className="h-8 rounded-full mr-2" src={`http://localhost:8081/${user.photo}`} alt="User"/>
                    <div className="flex flex-col w-40">
                        <span className="dark:text-white text-xl">{user.username}</span>
                        <span className="dark:text-white truncate text-black/60">Recommendation for you</span>
                    </div>
                    <button className="text-blue-700" onClick={()=>handleRequest(user.id)}>send request</button>
                </Link>
            )
        )
    }
    return (
        <div className="flex flex-col ml-20">
            {user &&
                <>
                    <div className="flex justify-center items-center" key={user.id}>
                        <img className="h-10 rounded-full mr-2" src={`http://localhost:8081/${user.photo}`} alt="User"/>
                        <div className="flex flex-col w-40">
                            <span className="dark:text-white text-xl">{user.username}</span>
                            <span className="dark:text-white truncate">{user.firstName} {user.lastName}</span>
                        </div>
                    </div>
                    <h2 className="text-gray-600 dark:text-white my-4">Recommendation for you</h2>
                </>
            }

            {content}
        </div>
    )
}

export default Rec;