import {json, redirect, useActionData} from "react-router-dom";
import Login from '../components/Login/Login.jsx';
import Header from "../components/Header/Header.jsx";
import {useEffect, useState} from "react";
import Notification from "../components/UI/Notification.jsx";
import wallpaper from "../assets/wallpaper.jpg"
export default function Authentication() {
    const actionData = useActionData();
    const [notification,setNotification]=useState();

    useEffect(() => {
        if (actionData) {
            if (actionData.message) {
                setNotification({
                    type: actionData.status === 401 ? 'error' : 'success',
                    message: actionData.message
                });
            }
        }
    }, [actionData]);
    return (
        <section className="flex flex-col bg-aman w-screen h-screen">
            <Header/>
            <div className="overflow-hidden bg-no-repeat bg-cover bg-wallpaper h-full flex justify-center items-center">
                <div className="w-[50%] flex justify-center items-center">
                    <div className="flex flex-col ">
                        {/*<p className=" overflow-hidden whitespace-nowrap animate-typing">Chatgram</p>*/}
                        <p className="overflow-hidden whitespace-nowrap animate-typing border-r-2 border-orange">
                            This is a typing effect with a blinking caret.
                        </p>
                    </div>
                </div>
                <div className="w-[50%]">
                    <Login/>
                </div>
            </div>
            {notification && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={()=>setNotification(null)}
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
        console.log("Sending authentication request with data:", authData);
        const response = await fetch("http://localhost:8081/aman/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(authData),
        });
        if (response.status === 422 || response.status === 401) {
            const errorMessage = await response.json();
            console.log("Authentication failed with status:", response.status, errorMessage);
            return json({ message: errorMessage.message }, { status: response.status });
        }

        if (!response.ok) {
            console.log("Server error:", response.statusText);
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
        console.log("Error:", error);
        return json({ message: "An error occurred during authentication" }, { status: 500 });
    }
}
