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
export async function fetchAllUsers({signal}){
    const response=await fetch("http://localhost:8080/users/all",signal)
    if(!response.ok){
        const error=new Error("Error during fetch allUsers");
        error.code=response.status;
        error.message=await response.json();
        throw error;
    }
    return await response.json();
}
export async function info(){
    const token=getAuthToken()
    const response=await fetch("http://localhost:8080/aman/info",{
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    if(!response.ok){
        const error=new Error("Error during fetch allUsers");
        error.code=response.status;
        error.message=await response.json();
        throw error;
    }
    return await response.json();
}
export async function fetchUser({signal}){
    const token=getAuthToken();
    if(token) {
        const response = await fetch("http://localhost:8080/aman/info", {
            signal,
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
    }else{
        return  null;
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
export async function upLoadPost({data,signal}){
    console.log("data"+data);
    const token=getAuthToken();
    const response = await fetch("http://localhost:8080/aman/auth", {
        signal,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization":"Bearer "+token,
        },
        body: JSON.stringify(data),
    });
    if(!response.ok){
        const error=new Error("Error during fetching upload post");
        error.code=response.status;
        error.message=await response.json();
        throw  error;
    }
    return await response.json();
}
export async  function getRecommendation({signal}){
    const token=getAuthToken();
    console.log(token)
    const response=await fetch("http://localhost:8080/users/rec",{
        signal,
        headers:{
            "Authorization":"Bearer "+token,
        }

    })
    console.log(response)
    if(!response.ok){
        const error=new Error("Error during fetching rec");
        error.code=response.status;
        error.message=await response.json();
        throw error;
    }
    const data= await response.json();
    console.log(data);
    return data;
}