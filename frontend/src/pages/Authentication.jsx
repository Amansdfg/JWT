import { json, redirect } from "react-router-dom";
import Login from "../components/Login.jsx";

export default function Authentication() {
    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <Login />
        </div>
    );
}

export async function action({ request }) {
    const data = await request.formData();
    const authData = {
        username: data.get("username"),
        password: data.get("password"),
    };

    try {
        console.log("Sending authentication request with data:", authData);

        const response = await fetch("http://localhost:8080/aman/auth", {
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
