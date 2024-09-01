import Left from "../components/Auth/Registration/Left.jsx";
import Mobile from "../components/Auth/Registration/Mobile.jsx";
import Register from "../components/Auth/Registration/Register.jsx";
import {register} from "../util/http.js";
import {useState} from "react";
import Notification from "../components/UI/Notification.jsx";
import {useMutation} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
export default function SignUp(){
    const navigate = useNavigate();
    const [notification, setNotification] = useState({
        show: false,
        type: '',
        message: '',
    });
    const{mutate}=useMutation({
        mutationFn:register,
        onSuccess:(data)=>{
            setNotification({
                show: true,
                type: "success",
                message: "Successfully registered"
            })
            setTimeout(() => {
                navigate('/auth/login');
            }, 3000);
        },
        onError:(error)=>{
            console.log(error.message)
            setNotification({
                    show: true,
                    type:"error",
                    message:"Couldnt register "+error.message.message
            })
        }
    })
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const registerData = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            username: formData.get("username"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword"),
            email: formData.get("email"),
        };
        mutate({data:registerData});
    };
    return (
        <section className="bg-white">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <Left/>
                <main
                    className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                    <div className="max-w-xl lg:max-w-3xl">
                        <Mobile/>
                        <Register handleSubmit={handleFormSubmit}/>
                    </div>
                </main>
            </div>
            {
                notification.show &&
                    <Notification
                        type={notification.type}
                        message={notification.message}
                        onClose={()=>setNotification({show:false,message:"",type:""})}/>
            }
        </section>
    )
}