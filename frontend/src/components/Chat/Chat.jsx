import React, { useEffect, useState } from "react";
import { time } from "../../util/validation.js";
import Header from "../Header/Header.jsx";
import logo from "../../assets/No-photo.gif";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import {Link, useParams} from 'react-router-dom';
import axios from "axios";
export default function Chat({user}) {
    const { id } = useParams();
    const [friend, setFriend] = useState();
    const [friends, setFriends] = useState([]);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [stompClient, setStompClient] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                window.location.href="/login";
                return;
            }
            try {
                if(id) {
                    const response = await axios.get(`http://localhost:8080/users/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setFriend(response.data);
                    const responseData = await axios.get(`http://localhost:8080/aman/info`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setFriends(responseData.data.friends)
                    console.log(responseData.data.friends)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);
    console.log(user)
    console.log(friends)
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

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const sendMessage = () => {
        if (message.trim()) {
            const chatMessage = {
                nickname: user.username,
                content: message,
            };
            if (stompClient && stompClient.connected) {
                stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
                setMessage('');
            }
        }
    };
    return (
        <section className="w-screen h-screen flex flex-col bg-aman">
            <Header user={user} />
            <div className="py-3 px-2 flex-1 overflow-hidden flex gap-4">
                <div className="flex flex-col gap-3 w-30p">
                    {friends.map((contact) => (
                        <Link key={contact.id} to={`http://localhost:5173/chat/`+contact.id}>
                            <div className="flex justify-between rounded-md px-3 py-4 drop-shadow-md bg-white">
                                <img src={logo} className="w-24" alt="friend" />
                                <span>{contact.username}</span>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="w-70p px-4 py-3 bg-white drop-shadow-md rounded-md flex flex-col">
                    {friend && (
                        <>
                            <div className="h-15p flex rounded-t-md justify-between items-center px-4 bg-gray-300">
                                <img src={logo} className="h-24" alt="friend" />
                                <span className="text-2xl">{friend.username}</span>
                            </div>
                            <div className="flex-1 flex px-2 py-3 flex-col rounded-b-md gap-3 overflow-y-auto bg-aman">
                                {messages.map((msg,index) => (
                                    <div
                                        key={index}
                                        className={`bg-white max-w-xl break-all p-2 flex flex-col items-end`+(msg.nickname===user.username?"justify-start ml-auto":"justify-end mr-auto")}
                                    >
                                        <h2 className="text-2xl">{msg.content}</h2>
                                        <span className="text-sm">{time(new Date(msg.timestamp))}</span>
                                    </div>
                                ))}
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
        </section>
    );
}

