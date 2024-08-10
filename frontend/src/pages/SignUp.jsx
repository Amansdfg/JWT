import Left from "../components/Registration/Left.jsx";
import Mobile from "../components/Registration/Mobile.jsx";
import Register from "../components/Registration/Register.jsx";
import {json, redirect} from "react-router-dom";
export default function SignUp(){
    return (
        <section className="bg-white">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <Left/>
                <main
                    className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                    <div className="max-w-xl lg:max-w-3xl">
                        <Mobile/>
                        <Register/>
                    </div>
                </main>
            </div>
        </section>
    )
}
export async function action({request}){
    const data = await request.formData();

    const registerData={
        firstName:data.get("firstName"),
        lastName:data.get("lastName"),
        username:data.get("username"),
        password:data.get("password"),
        confirmPassword:data.get("confirmPassword"),
        email:data.get("email"),
    }
    console.log(registerData);
    const response=await fetch("http://localhost:8081/aman/registration",{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(registerData)
    })
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
    return redirect("/login");
}
