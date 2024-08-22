import {NavLink} from "react-router-dom";
import logo from "../../assets/No-photo.gif";
import React, {useState} from "react";
import Modal from "../UI/Modal.jsx"
import close from "../../assets/close.svg"
import add from "../../assets/plus.svg"
export default function Friends({friends}){
    const [isCreate,setIsCreate]=useState(false);
    function createGroupChat(){
        setIsCreate(!isCreate);
    }
    return (
        <>
            { isCreate &&<Modal>
                <div className='w-[400px] flex flex-col gap-4 px-10 py-8'>
                    <button onClick={createGroupChat} className="absolute top-3 right-3"><img src={close} alt="close"/></button>
                    {friends.map((friend) => (
                        <NavLink key={friend.id} to={"/chat/" + friend.id}
                                 className={({isActive}) =>
                                     `flex justify-between rounded-md px-3 py-4 drop-shadow-md bg-white  ${isActive ? "bg-gray-500" : undefined}`
                                 }>
                            <img src={logo} className="w-24" alt="friend" />
                            <span>{friend.username}</span>
                            <img src={add} alt="add button"/>
                        </NavLink>
                    ))}
                </div>
            </Modal>
            }

            <div className=" flex bg-white dark:bg-lightMode px-4 py-2 rounded">
                <div className="flex gap-2">
                <button
                        className='drop-shadow-md mr-6'>
                    <img src={logo} className="w-14 rounded-full" alt="friend"/>
                </button>
                {friends.map((friend) => (
                    <button key={friend.id}
                            className=' drop-shadow-md'>
                    <img src={logo} className="w-14 rounded-full" alt="friend"/>
                        <span>{friend.username}</span>
                    </button>
                ))}
                </div>
                <button onClick={createGroupChat} className="ml-auto text-3xl dark:text-white">+</button>
            </div>
            {friends.map((friend) => (
                <NavLink key={friend.id} to={"/chat/" + friend.id}
                         className={({isActive}) =>
                             `flex justify-between rounded-md px-3 py-4 drop-shadow-md bg-white dark:bg-lightMode  ${isActive ? "bg-gray-500" : ""}`
                         }>
                    <img src={logo} className="w-24 rounded-md" alt="friend" />
                    <span className="dark:text-white">{friend.username}</span>
                </NavLink>
            ))}
        </>
    )
}