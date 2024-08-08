import {useQuery} from "@tanstack/react-query";
import {fetchAllUsers} from "../../util/http.js";
import Loading from "../UI/Loading.jsx";
import Post from "./Post.jsx";

export default function HomePosts(){
    const { data, isLoading, isError,error } = useQuery({
        queryKey: ['users'],
        queryFn:  fetchAllUsers,
    });
    let content;
    if(isLoading){
        content=<Loading/>
    }
    if(isError){
        content=<p>Error</p>
    }
    if (data) {
        content = data?.map((user) => (
            <div key={user.id} className="flex flex-col gap-5">
                {user.posts.map((post) => (
                    <Post key={post.id} post={post} user={user}/>
                ))}
            </div>
        ));
    }
    return content;
}