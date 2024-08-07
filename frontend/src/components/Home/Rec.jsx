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
                <div className="flex" key={user.id}>
                    <img className="h-8 rounded-full mr-2" src={logo} alt="User"/>
                    <div>
                        <span>{user.username}</span>
                    </div>
                </div>
            )
        )
    }
    return (
        <div className="flex flex-col ml-20">
            {content}
        </div>
    )
}

export default Rec;