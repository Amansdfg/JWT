import {useQuery} from "@tanstack/react-query";
import {fetchFriend, fetchUser,searchUsers} from "../../util/http.js";
import Loading from "../UI/Loading.jsx";
import logo from "../../assets/No-photo.gif";
import React, {useRef, useState} from "react";
import {Link, useParams} from "react-router-dom";

function Friends(){
    const searchElement = useRef();
    const [search,setSearch]=useState();
    const { data:searchData, isLoading:isSearching } = useQuery({
        queryKey: ['users', { search: search }],
        queryFn: ({ signal, queryKey}) => searchUsers({ signal,search:search}),
        enabled: !search
    });

    console.log(search)
    console.log(searchData)
    function handleSubmit(event) {
        event.preventDefault();
        console.log(event)
        setSearch(searchElement.current.value);
    }
    const param=useParams();
    let data;
    let isPending;
    if(param.id) {
        const {data: friend,isPending:isPendingFriend,isError:isErrorFriend} = useQuery({
            queryKey: ['friends', param.id],
            queryFn: () => fetchFriend({id: param.id})
        })
        data=friend;
        isPending=isPendingFriend;
    }else {
        const {data:user, isPending:isPendingUser, isError:isErrorUser} = useQuery({
            queryKey: ['user'],
            queryFn: fetchUser
        });
        data=user;
        isPending=isPendingUser;
    }
    let content;
    if(isPending){
        content=<Loading/>
    }
    if(data){
        content=(searchData?searchData:data.friends).map(friend=>(
            <div className="bg-white px-6 py-4 rounded-md  flex justify-between items-center" key={friend.id}>
                <div className="flex  items-center">
                    <img className="h-10 rounded-full mr-2" src={friend.photo ?? logo} alt="User"/>
                    <div>
                        <h3 className="text-xl font-semibold">{friend.username}</h3>
                        <span>{friend.firstName} {friend.lastName}</span>
                    </div>
                </div>
                <div>
                    <Link className="bg-gray-300 font-sans text-lg  rounded-md px-4 py-1"
                        to={`/chat/`+friend.id}>
                        chat
                    </Link>
                    <Link className="ml-4 bg-gray-300 font-sans text-lg  rounded-md px-4 py-1"
                          to={`/profile/`+friend.id}>
                        profile
                    </Link>
                </div>
            </div>
        ))
    }
    return(
        <div className="flex flex-col gap-4 px-10 py-4">
            <div className="flex  bg-white rounded-md items-center px-6 py-4">
                <img className="h-10 rounded-full mr-2" src={data.photo ?? logo} alt="User"/>
                <div>
                    <h3 className="text-xl font-semibold">{data.username}</h3>
                    <span>{data.firstName} {data.lastName}</span>
                </div>
                <Link className="ml-auto bg-gray-300 font-sans text-lg  rounded-md px-4 py-1"
                      to="/profile">
                    My profile
                </Link>
            </div>
            <form onSubmit={handleSubmit} id="search-form">
                <input
                    type="search"
                    placeholder="Enter user name"
                    className='font-sans text-lg  rounded-md px-4 py-1'
                    ref={searchElement}
                />
                <button>Search</button>
            </form>
            {isSearching && <Loading/>}
            {content}
        </div>
    )


}

export default Friends;