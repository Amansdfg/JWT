import {settingsMenu} from "../../util/list.js";
import {useQuery} from "@tanstack/react-query";
import {fetchUser} from "../../util/http.js";
import logo from "../../assets/No-photo.gif"
export default function EditProfile(){
    const{data:user}=useQuery({
        queryKey:["user"],
        queryFn:fetchUser
    })
    return (
        <>
            <h1 className="text-2xl font-semibold mb-[40px]">Edit profile</h1>
            <div className="bg-white w-[700px] rounded-2xl flex px-6 py-4 items-center mb-[2rem]">
                <img className="h-20 rounded-xl" src={user.photo ?? logo}/>
                <div className="flex flex-col ml-4">
                    <span className='text-2xl font-bold'>{user.username}</span>
                    <span>{user.firstName} {user.lastName}</span>
                </div>
                <button className="ml-auto bg-blue-500 px-3 py-1 text-white rounded-xl">change photo</button>
            </div>
            <span className="text-xl mb-[1rem]">Bio</span>
            <textarea placeholder="Bio"
                className="w-full mb-[2rem] rounded-xl px-4 py-2 resize-none border-2 focus:text-gray-600 focus:outline-none focus:bg-gray-50 focus:border-blue-500"/>
            <span className="text-xl mb-[1rem]">Gender</span>
            <textarea placeholder="Gender"
                className="w-full mb-[2rem] rounded-xl px-4 py-2 resize-none border-2 focus:text-gray-600 focus:outline-none focus:bg-gray-50 focus:border-blue-500"/>
            <button className="ml-auto bg-blue-500 px-20 text-xl py-3 text-white rounded-xl">Submit</button>
        </>

)
}