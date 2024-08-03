import {json} from "react-router-dom";
import {redirect} from "react-router";
import Login from "../components/Login.jsx";
export default  function Authentication(){
    return(
        <div className="flex justify-center items-center w-screen h-screen">
            <Login/>
        </div>
    )
}
export async function action({request}) {
    const data = await request.formData();
    const authData = {
        username: data.get("username"),
        password: data.get('password')
    }
    const response = await fetch("http://localhost:8080/aman/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(authData)
    })
    if (response.status === 422 || response.status === 401) {
        return response;
    }
    if (!response.ok) {
        throw json({message: "Could not authentificate user"}, {status: 500});

    }
    const resData = await response.json();
    const token = resData.token;
    localStorage.setItem("token", token);

    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem("expiration", expiration.toISOString())
    return redirect("/")
}