
import {useMutation} from "@tanstack/react-query";
import {changePassword} from "../../util/http.js"
import {useState} from "react";
import Notification from "../UI/Notification.jsx"
export default function ChangePassword(){
    const[notification,setNotification]=useState({
        show:false,
        type:'',
        message:""
    })
    const[userData,setUserData]=useState({
        username:'',
        oldPassword:"",
        newPassword:'',
        confirmationPassword:'',
    })
    const {mutate}=useMutation({
        mutationFn:changePassword,
        onError:(error)=>{
            setNotification({show: true,type: "error",message: `Password change failed. ${error.toString()}. Please try again. `})
        },
        onSuccess:(data)=>{
            setNotification({show: true,type: "success",message: "Password successfully changed"})
        }
    })
    function handleChangePassword(event){
        const{name,value}=event.target;
        setUserData({
            ...userData,
            [name]:value
        })
    }
    function handleSubmit(event){
        event.preventDefault();
        console.log(userData)
        if(userData.newPassword !== userData.confirmationPassword){
            setNotification({show:true,type:"error",message: "New password and Confirmation password are not matches"})
            return;
        }

        mutate(userData);
    }
    return (
        <form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-semibold mb-[40px]">Edit profile</h1>
            <span className="text-xl mb-[1rem]">Username</span>
            <input
                name='username'
                placeholder="username"
                value={userData.username}
                onChange={handleChangePassword}
                className="w-full h-[3rem] mb-[2rem] rounded-xl px-4 py-2 resize-none border-2 focus:text-gray-600 focus:outline-none focus:bg-gray-50 focus:border-blue-500"
            />
            <span className="text-xl mb-[1rem]">Previous password</span>
            <input
                name="oldPassword"
                value={userData.oldPassword}
                onChange={handleChangePassword}
                placeholder="email"
                className="w-full h-[3rem] mb-[2rem] rounded-xl px-4 py-2 resize-none border-2 focus:text-gray-600 focus:outline-none focus:bg-gray-50 focus:border-blue-500"
            />
            <span className="text-xl mb-[1rem]">New password</span>
            <input
                name="newPassword"
                value={userData.newPassword}
                onChange={handleChangePassword}
                placeholder="email"
                className="w-full h-[3rem] mb-[2rem] rounded-xl px-4 py-2 resize-none border-2 focus:text-gray-600 focus:outline-none focus:bg-gray-50 focus:border-blue-500"
            />
            <span className="text-xl mb-[1rem]">Confirmation password</span>
            <input
                name="confirmationPassword"
                value={userData.confirmationPassword}
                onChange={handleChangePassword}
                placeholder="email"
                className="w-full h-[3rem] mb-[2rem] rounded-xl px-4 py-2 resize-none border-2 focus:text-gray-600 focus:outline-none focus:bg-gray-50 focus:border-blue-500"
            />

            <button className="ml-auto bg-blue-500 px-20 text-xl py-3 text-white rounded-xl">Change password</button>
            {notification.show && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={() => setNotification({ show: false, type: '', message: '' })}
                />
            )}

        </form>
    )
}