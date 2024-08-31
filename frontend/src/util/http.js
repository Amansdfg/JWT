import {QueryClient} from "@tanstack/react-query"
export  const client=new QueryClient();
import {getAuthToken} from "./auth.js";
export async function fetchFriend({id}){
    const token=getAuthToken();
    const response = await fetch("http://localhost:8081/users/"+id, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    if (!response.ok) {
        const error = new Error("Error during fetching user.svg");
        error.code = response.status;
        error.message = await response.json();
        throw error;
    }
    return await response.json();
}
export async function fetchAllUsers({signal}){
    const response=await fetch("http://localhost:8081/users/all",signal)
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
    const response=await fetch("http://localhost:8081/aman/info",{
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
        const response = await fetch("http://localhost:8081/aman/info", {
            signal,
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        if (!response.ok) {
            const error = new Error("Error during fetching user.svg");
            error.code = response.status;
            error.message = await response.json();
            throw error;
        }
        return await response.json();
    }else{
        return null
    }
}
export async function fetchMessages({id,signal}){
    console.log("id:"+id+", signal"+ signal)
    const token=getAuthToken();
    const response=await fetch("http://localhost:8081/chat/"+id,{
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
    const response = await fetch("http://localhost:8081/aman/auth", {
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
    if(token) {
        const response = await fetch("http://localhost:8081/users/rec", {
            signal,
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
        if (!response.ok) {
            const error = new Error("Error during fetching rec");
            error.code = response.status;
            error.message = await response.json();
            throw error;
        }
        return await response.json();
    }else{
        return null;
    }
}
export async function addComment({comment,id}){
    const token=getAuthToken();
    console.log("comment.svg: "+comment)
    console.log("id: "+id)
    console.log("token: "+token)
    const response=await  fetch("http://localhost:8081/comment/"+id,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+token,
        },
        body:comment
    })
    if(!response.ok){
        const error=new Error("An error occurred while posting");
        error.code=response.status;
        error.info= await response.json();
        throw error;
    }
    return await response.json();
}
export async function sendRequest({id}){
    const token=getAuthToken();
    console.log(JSON.stringify({receiverId: id}))
    const response=await fetch("http://localhost:8081/request",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+token,
        },
        body:JSON.stringify({receiverId: id})
    })
    if(!response.ok){
        const error=new Error("An error occurred while sending request")
        error.code=response.status;
        error.info= await response.json();
        throw error;
    }
    return  await response.json()
}
export async function fetchRequest(){
    const token=getAuthToken();
    const response=await fetch("http://localhost:8081/request",{
        method:"GET",
        headers:{
            "Authorization":"Bearer "+token
        }
    })
    if(!response.ok){
        const error=new Error("An error occurred while sending request")
        error.code=response.status;
        error.info= await response.json();
        throw error;
    }
    return  await response.json()
}
export async function acceptUser({username}){
    const  token=getAuthToken();
    const response=await  fetch("http://localhost:8081/request/accept",{
        method:"POST",
        headers:{
            "Content-type":"application/json",
            "Authorization":"Bearer "+token,
        },
        body:JSON.stringify({senderUsername: username})
    })
    if(!response.ok){
        const error=new Error("An error occurred while");
        error.code=response.status;
        error.info=await response.json();
        throw error;
    }
    return await response.json();
}
export async function searchUsers({search}){
    const token=getAuthToken();
    const response=await fetch("http://localhost:8081/users/search",{
        method:"POST",
        headers:{
            "Authorization":"Bearer "+token,
            "Content-Type":'application/json'
        },
        body: search,
    })
    if(!response.ok){
        const error=new Error("Error found during searching error");
        error.code=response.status;
        error.info=await response.json();
        throw error;
    }
    return await response.json();
}
export async function changePassword(dto) {
    const token = getAuthToken();
    const response = await fetch("http://localhost:8081/users/change-password", {
        method: "POST",
        headers: {
            "Authorization": 'Bearer ' + token,
            'Content-Type': "application/json"
        },
        body: JSON.stringify(dto)
    });

    if (!response.ok) {
        const error = new Error("Error found during change password");
        error.code = response.status
        error.message=await response.text();
        throw error;
    }

    return await response.text();
}
export async function forgot({email}){
    const response=await  fetch("http://localhost:8081/aman/forgot-password",
        {
            method:'POST',
            headers:{
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ email })
        }
    )
    if(!response.ok){
        const error=new Error("Error during forgot request")
        error.code=response.status;
        error.message=await response.text();
        throw error;
    }
    return await response.json()
}
export async function reset({password,token}){
    const response=await fetch("http://localhost:8081/aman/reset-password",{
        method:"POST",
        headers:{
            'Content-Type': "application/json"
        },
        body:JSON.stringify({password,token})
    })
    if(!response.ok){
        const error=new Error("Error during reset password")
        error.code=response.status;
        error.message=await response.json();
        throw error;
    }
    return await response.json();
}
export async function chats(){
    const token=getAuthToken();
    const response=await  fetch("http://localhost:8081/chats",
        {
            headers:{
                "Authorization":"Bearer "+token,
            }
        })
    if(!response.ok){
        const error=new Error("Error during chats")
        error.code=response.status;
        error.message=await response.json();
        throw error;
    }
    return await response.json();
}
export async function createChat({id}){
    const token=getAuthToken();
    const response=await fetch("http://localhost:8081/chat/"+id,
        {
            method:"POST",
            headers:{
                "Authorization":"Bearer "+token
            }
        }
    )
    if(!response.ok){
        const error=new Error("Error during createChat")
        error.code=response.status;
        error.message=await response.json();
        throw  error;
    }
    return await response.json();
}
export async function fetchChatUser({id}){
    const token=getAuthToken();
    const response = await fetch("http://localhost:8081/users/"+id, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    if (!response.ok) {
        const error = new Error("Error during fetching user.svg");
        error.code = response.status;
        error.message = await response.json();
        throw error;
    }
    return await response.json();
}