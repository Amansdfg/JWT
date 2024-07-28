import logo from "../../assets/No-photo.gif";
import Header from "../Header/Header.jsx";
import {useEffect, useMemo, useState} from "react";
import axios from "../../util/axios.js";
import {time} from "../../util/validation.js";

export default function Chat({contacts}) {
    const [friends,setFriends]=useState([]);
    const[friend,setFriend]=useState();
    const[messages,setMessages]=useState([]);
    const [message,setMessage]=useState("")
    useEffect(()=> {
        const fetch = async ()=> {
            const token = localStorage.getItem("token")
            if (!token) {
                window.location.href = "/login";
            }
            try {
                const response = await axios.get("/aman/info", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setFriends((response.data).friends)
            } catch (error) {
                console.error("Error fetching header data:", error);
                throw new Error("set")
            }
        }
        fetch()
    },[])
    function selectFriend(id){
        const fetch = async ()=> {
            const token = localStorage.getItem("token")
            if (!token) {
                window.location.href = "/login";
            }
            try {
                const response = await axios.get("/users/"+id, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setFriend(response.data);
                const responseData = await axios.get("/chat/"+id, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setMessages(responseData.data)
            } catch (error) {
                console.error("Error fetching header data:", error);
                throw new Error("set")
            }
        }
        fetch()
    }
    if(!friend && friends.length!==0){
        selectFriend(friends[0].id)
    }
    function send(){
        const fetch = async ()=> {
            const token = localStorage.getItem("token")
            if (!token) {
                window.location.href = "/login";
            }
            try {
                const response = await axios.get("/send/"+friend.id+"?text="+message, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setMessage("")
            } catch (error) {
                console.error("Error fetching header data:", error);
                throw new Error("set")
            }
        }
        fetch()
    }
    return (
        <section className="w-screen h-screen flex flex-col bg-aman">
            <Header/>
            <div className="py-2 px-2 flex-1 overflow-hidden flex gap-4">
                <div className="flex flex-col gap-3 w-30p">
                    {friends.map(contact => (
                        <button key={contact.id} onClick={() => selectFriend(contact.id)}>
                            <div className="flex justify-between rounded-md px-3 py-4 drop-shadow-md bg-white">
                                <img src={logo} className='w-24'/>
                                <span>{contact.username}</span>
                            </div>
                        </button>
                    ))}
                </div>
                <div className="w-70p px-4 py-3 bg-white drop-shadow-md rounded-md flex flex-col">
                    {friend &&
                        <>
                            <div className="h-15p flex rounded-t-md justify-between items-center px-4 bg-gray-300">
                                <img src={friend.photos[0] ?? logo} className="h-24" alt="logo"/>
                                <span className="text-2xl">{friend.username}</span>
                            </div>
                            <div className="flex-1 flex px-2 py-3 flex-col rounded-b-md gap-3 overflow-y-auto bg-aman">
                                {messages.map(msg => (
                                    <div key={msg.id}
                                         className={`bg-white max-w-xl break-all p-2 flex flex-col items-end ${msg.sender.id === friend.id ? 'justify-start mr-auto' : 'justify-end ml-auto'}`}>
                                        <h2 className="text-2xl">{msg.text}</h2>
                                        <span className="text-sm">{time(new Date(msg.date))}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    }
                    <div className="flex py-3 bg-white">
                        <input onChange={event => setMessage(event.target.value)} type="text" placeholder="Type your message..." className="flex-1 p-3 rounded-md mr-3 bg-aman"/>
                        <button onClick={()=>send()} className="py-3 px-5 bg-blue-500 text-white border-none rounded-md hover:bg-blue-800">Send</button>
                    </div>
                </div>

            </div>
        </section>
    );
}
