import Left from "../components/Registration/Left.jsx";
import Mobile from "../components/Registration/Mobile.jsx";
import Register from "../components/Registration/Register.jsx";
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
    const data=request.formData();
    .
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
            "Content-Type": "application/json"
        },
        body:JSON.stringify(registerData)
    })
}
