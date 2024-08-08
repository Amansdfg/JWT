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
        content=
            <div className="flex flex-col gap-5">
            {data?.map((user) => (
                user.posts &&
                <div key={user.id}  className="flex flex-col gap-5">
                    {user.posts.map((post) => (
                        <Post post={post} user={user} key={post.id}/>
                    ))}
                </div>
            ))};
        </div>
    }
    return content;
}