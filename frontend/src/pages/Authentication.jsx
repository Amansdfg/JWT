import {json, redirect, useActionData} from "react-router-dom";
import Login from '../components/Auth/Login/Login.jsx';
import Header from "../components/Header/Header.jsx";
import {useEffect, useState} from "react";
import Notification from "../components/UI/Notification.jsx";
export default function Authentication() {
    const actionData = useActionData();
    const [notification,setNotification]=useState();
    useEffect(() => {
        if (actionData) {
            if (actionData.message) {
                setNotification({
                    type:'error',
                    message: actionData.message
                });
            }
        }
    }, [actionData]);
    return (
        <section className="flex flex-col bg-aman w-screen h-screen">
            <Header/>
            <div className="overflow-hidden bg-no-repeat bg-cover bg-wallpaper h-full flex items-center">
                <div className="w-[50%] hidden md:block  justify-start items-center">
                    <div className="w-full pl-[100px]">
                        <h1 className="text-custom-blue text-[25px] w-[220px] font-[800]  lg:text-[40px] lg:w-[350px]  text-left whitespace-nowrap overflow-hidden animate-type font-mono">
                            Hi, Welcome to</h1>
                        <h1 className="opacity-0 font-[800] text-[40px] md:text-[60px] lg:text-[80px] xl:text-[100px] bg-gradient-custom text-transparent bg-clip-text w-[75%] overflow-hidden animate-shring-animation animate-blink font-sans">
                            Chatgram</h1>
                    </div>
                </div>
                <Login/>
            </div>
            {notification && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={() => setNotification(null)}
                />)
            }
        </section>
    );
}

export async function action({request}) {
    const data = await request.formData();
    const authData = {
        username: data.get("username"),
        password: data.get("password"),
    };
    try {
        const response = await fetch("http://localhost:8081/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(authData),
        });
        if (response.status === 422 || response.status === 401) {
            const errorMessage = await response.json();
            return json({ message: errorMessage.message }, { status: response.status });
        }

        if (!response.ok) {
            throw new Error("Could not authenticate user");
        }
        const resData = await response.json();
        const token = resData.token;
        localStorage.setItem("token", token);
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        localStorage.setItem("expiration", expiration.toISOString());
        return redirect("/");
    } catch (error) {
        return json({ message: "An error occurred during authentication" }, { status: 500 });
    }
}
