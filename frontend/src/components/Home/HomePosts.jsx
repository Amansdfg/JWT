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
        content = data.map((user) =>
            user.posts.length>0 &&
                user.posts.map(post=>(
                <Post key={post.id} post={post} user={user}/>
                ))
        )
    }
    return <div className="flex flex-col gap-4">{content} </div>;
}