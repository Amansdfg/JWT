import {useQuery} from "@tanstack/react-query";
import {fetchUser, getRecommendation} from "../../util/http.js";
import ErrorPage from "../../pages/ErrorPage.jsx";
import Loading from "../UI/Loading.jsx";
import logo from "../../assets/No-photo.gif";
import React from "react";

function Rec(){
    const { data: user, isLoading: userLoading, isError: userError } = useQuery({
        queryKey: ['user'],
        queryFn: fetchUser,
    });
    const { data: recData, isLoading: recLoading, isError: recError } = useQuery({
        queryKey: ['rec'],
        queryFn: getRecommendation,
        enabled: !user,
    });
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
                <div className="flex justify-center items-center" key={user.id}>
                    <img className="h-8 rounded-full mr-2" src={logo} alt="User"/>
                    <div className="flex flex-col w-40">
                        <span className="text-xl">{user.username}</span>
                        <span className="truncate">Recommendation for you</span>
                    </div>
                </div>
            )
        )
    }
    return (
        <div className="flex flex-col ml-20">
            {user &&
                <>
                <div className="flex justify-center items-center" key={user.id}>
                    <img className="h-10 rounded-full mr-2" src={logo} alt="User"/>
                    <div className="flex flex-col w-40">
                        <span className="text-xl">{user.username}</span>
                        <span className="truncate">{user.firstName} {user.lastName}</span>
                    </div>
                </div>
                <h2 className="text-gray-600 my-4">Recommendation for you</h2>
                </>
            }

            {content}
        </div>
    )
}

export default Rec;