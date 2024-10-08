import React, {useEffect, useRef, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {fetchChatUser, fetchFriend, fetchMessages, fetchUser} from "../../util/http.js";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Loading from "../UI/Loading.jsx";
import {time} from "../../util/validation.js";

export default function Messages({id,user}){
    const [message, setMessage] = useState('');
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
    const { data: friend, isLoading: isFriendLoading, isError: isFriendError, error: friendError } = useQuery({
        queryKey: ['user', id],
        queryFn: () => fetchChatUser({ id: id }),
        enabled: !!id,
    });
    const { data: fetchedMessages, isLoading: isMessagesLoading, isError: isMessagesError, error: messageError } = useQuery({
        queryKey: ['messages', id],
        queryFn: () => fetchMessages({ id: id}),
        enabled: !!id,
    });
    useEffect(() => {
        if (fetchedMessages) {
            setMessages(fetchedMessages);
        }
    }, [fetchedMessages]);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8081/ws');
        const client = Stomp.over(socket);
        client.connect({}, () => {
            console.log("Connected to WebSocket");
            client.subscribe(`/topic/messages/${id}`, (message) => {
                const receivedMessage = JSON.parse(message.body);
                setMessages((prevMessages) => [...prevMessages, receivedMessage]);
            });
        }, (error) => {
            console.error("WebSocket connection error:", error);
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
    function scroll(){
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };
    const sendMessage = () => {
        if (message.trim() && stompClient && stompClient.connected) {
            const chatMessage = {
                sender: user.id,
                text: message,
                chatId:id
            };
            stompClient.send(`/app/chat/${id}`, {}, JSON.stringify(chatMessage));
            setMessage('');
        }
    };

    let friendContent;
    if (isFriendLoading) {
        friendContent = <Loading />;
    } else if (isFriendError) {
        friendContent = <p>Error loading friend</p>;
    } else if (friend) {
        friendContent = (
            <>
                <img src={`http://localhost:8081/${friend.photo}`} className="h-24 w-24 rounded-full object-cover" alt="friend" />
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
        messagesContent = messages.map((msg,index) => (
            <div
                key={msg.id}
                className={`bg-aman max-w-xl break-all p-2 flex flex-col items-end  ${(msg.sender.id === user.id ? "justify-start ml-auto rounded-l-xl" : "justify-end mr-auto rounded-r-xl")}`}
            >
                <h2 className="text-2xl">{msg.text}</h2>
                <span className="text-sm">{time(new Date(msg.date))}</span>
            </div>
        ));
    }

    return (
        <div className="flex flex-col w-full h-full ">
            {id && friend && (
                <>
                    <div className="h-15p flex rounded-t-md justify-between items-center px-4 bg-gray-300">
                        {friendContent}
                    </div>
                    <div className="flex-1 flex px-2 py-3 flex-col rounded-b-md gap-3 overflow-y-auto">
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
    )
}