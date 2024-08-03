import {QueryClient} from "@tanstack/react-query"
export  const client=new QueryClient();
import {getAuthToken} from "./auth.js";
export async function fetchFriend({id}){
    const token=getAuthToken();
    if(token) {
        const response = await fetch("http://localhost:8080/users/"+id, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        if (!response.ok) {
            const error = new Error("Error during fetching user");
            error.code = response.status;
            error.message = await response.json();
            throw error;
        }
        return await response.json();
    }

}
export async function fetchUser(){
    const token=getAuthToken();
    if(token) {
        const response = await fetch("http://localhost:8080/aman/info", {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        if (!response.ok) {
            const error = new Error("Error during fetching user");
            error.code = response.status;
            error.message = await response.json();
            throw error;
        }
        return await response.json();
    }
}
export async function fetchMessages({id,signal}){
    console.log("id:"+id+", signal"+ signal)
    const token=getAuthToken();
    const response=await fetch("http://localhost:8080/chat/"+id,{
        signal,
        headers:{
            "Authorization":"Bearer "+token
        }
    });
    if(!response.ok){
        const error=new Error("Error during fetching chat");
        error.code=response.status;
        error.message=await response.json();
        throw  error;
    }
    return await response.json();

}