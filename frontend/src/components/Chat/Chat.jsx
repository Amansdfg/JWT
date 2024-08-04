
import React, { useEffect, useState ,useRef} from "react";
import { time } from "../../util/validation.js";
import logo from "../../assets/No-photo.gif";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { NavLink, useParams } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { fetchFriend, fetchMessages, fetchUser } from "../../util/http.js";
import Loading from "../UI/Loading.jsx";
import Header from "../Header/Header.jsx";


export default function Chat() {
    const params = useParams();
    const [message, setMessage] = useState('');
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    const { data: friend, isLoading: isFriendLoading, isError: isFriendError, error: friendError } = useQuery({
        queryKey: ['friend', params.id],
        queryFn: () => fetchFriend({ id: params.id }),
        enabled: !!params.id,
    });

    const { data: user, isLoading: isUserLoading, isError: isUserError, error: userError } = useQuery({
        queryKey: ['user'],
        queryFn: fetchUser,
    });

    const { data: fetchedMessages, isLoading: isMessagesLoading, isError: isMessagesError, error: messageError } = useQuery({
        queryKey: ['messages', params.id],
        queryFn: ({ signal }) => fetchMessages({ id: params.id, signal }),
        enabled: !!params.id,
    });

    useEffect(() => {
        if (fetchedMessages) {
            setMessages(fetchedMessages);
        }
    }, [fetchedMessages]);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const client = Stomp.over(socket);

        client.connect({}, () => {
            client.subscribe('/topic/messages', (message) => {
                const receivedMessage = JSON.parse(message.body);
                setMessages((prevMessages) => [...prevMessages, receivedMessage]);
            });
        });

        setStompClient(client);

        return () => {
            if (client && client.connected) {
                client.disconnect();
            }
        };
    }, []);
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const sendMessage = () => {
        if (message.trim() && stompClient && stompClient.connected) {
            const chatMessage = {
                sender: user,
                receiver: friend,
                text: message,
            };
            stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
            setMessage('');
        }
    };

    if (isUserLoading) return (
        <div className="w-screen h-screen flex justify-center items-center">
            <Loading />
        </div>
    );
    if (isUserError) return <p>Error loading user</p>;

    let friendContent;
    if (isFriendLoading) {
        friendContent = <Loading />;
    } else if (isFriendError) {
        friendContent = <p>Error loading friend</p>;
    } else if (friend) {
        friendContent = (
            <>
                <img src={logo} className="h-24" alt="friend" />
                <span className="text-2xl">{friend.username}</span>
            </>
        );
    }

    let messagesContent;
    if (isMessagesLoading) {
        messagesContent = <Loading />;
    } else if (isMessagesError) {
        messagesContent = <p>Error loading messages</p>;
    } else if (messages) {
        messagesContent = messages.map(msg => (
            <div
                key={msg.id}
                className={`bg-white rounded-md max-w-xl break-all p-2 flex flex-col items-end ${(msg.sender.id === user.id ? "justify-start ml-auto" : "justify-end mr-auto")}`}
            >
                <h2 className="text-2xl">{msg.text}</h2>
                <span className="text-sm">{time(new Date(msg.date))}</span>
            </div>
        ));
    }

    return (
        <section className="w-screen h-dvh flex flex-col bg-aman">
            <Header/>
            <div className="py-3 px-2 flex-1 overflow-hidden flex gap-4">
                <div className={`flex-col gap-3 ${!params.id ? " w-full md:w-30p" : "hidden md:flex"}`}>
                    {user.friends.map((friend) => (
                        <NavLink key={friend.id} to={"/chat/" + friend.id}
                                 className={({ isActive }) =>
                                     `flex justify-between rounded-md px-3 py-4 drop-shadow-md bg-white ${isActive ? "bg-gray-500" : ""}`
                                 }>
                            <img src={logo} className="w-24" alt="friend" />
                            <span>{friend.username}</span>
                        </NavLink>
                    ))}
                </div>
                <div className={`px-4 py-3 bg-white drop-shadow-md rounded-md  ${!params.id?"hidden w-70p md:flex":"w-full md:w-70p"}`}>
                <div className="flex flex-col w-full h-full">
                    {params.id && friend && (
                        <>
                            <div className="h-15p flex rounded-t-md justify-between items-center px-4 bg-gray-300">
                                {friendContent}
                            </div>
                            <div className="flex-1 flex px-2 py-3 flex-col rounded-b-md gap-3 overflow-y-auto bg-aman">
                                {messagesContent}
                                <div ref={messagesEndRef}></div>
                            </div>
                            <div className="flex py-3 bg-white">
                                <input
                                    id="message"
                                    onChange={handleMessageChange}
                                    value={message}
                                    type="text"
                                    placeholder="Type your message..."
                                    className="flex-1 p-3 rounded-md mr-3 bg-aman"
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={!message.trim()}
                                    className="py-3 px-5 bg-blue-500 text-white border-none rounded-md hover:bg-blue-800"
                                >
                                    Send
                                </button>
                            </div>
                        </>
                    )}
                </div>
                </div>
            </div>
        </section>
    );
}
