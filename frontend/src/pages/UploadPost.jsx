import Post from "../components/Post.jsx";
import {json, redirect} from "react-router-dom";
import {getAuthToken} from "../util/auth.js";

export default function UploadPost(){
    return(
        <section className="w-full min-h-svh flex justify-center">
            <Post/>
        </section>
    )
}
export async function action({ request }) {
    const data = await request.formData();
    const formData = new FormData();
    formData.append("content", data.get("content"));
    const file = data.get("file");
    if (file) {
        formData.append("file", file);
    }
const token=getAuthToken();
    try {

        const response = await fetch("http://localhost:8081/users/post", {
            method: "POST",
            headers: {
                "Authorization":"Bearer "+token
            },
            body: formData,
        });

        if (response.status === 422 || response.status === 401) {
            const errorMessage = await response.json();
            console.log("Authentication failed with status:", response.status, errorMessage);
            return json({ message: errorMessage.message }, { status: response.status });
        }

        if (!response.ok) {
            console.log("Server error:", response.statusText);
            throw new Error("Could not authenticate user.svg");
        }

        return redirect("/profile");
    } catch (error) {
        console.log("Error:", error);
        return json({ message: "An error occurred during authentication" }, { status: 500 });
    }
}
