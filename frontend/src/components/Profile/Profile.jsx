import photo from "../../assets/No-photo.gif"
import settings from "../../assets/settings.svg"
import {NavLink} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {fetchUser} from "../../util/http.js";
import Loading from "../UI/Loading.jsx";
import ErrorPage from "../../pages/ErrorPage.jsx";
function Profile(){
    const {data,isLoading,isError,error}=useQuery(({
        queryKey:['user'],
        queryFn:fetchUser
    }))
    let content;

    if(isLoading) {
        content=<Loading/>
    }
    if(isError){
        content=<ErrorPage/>
    }
    if(data) {
        content =
            <div className="w-2/5 mx-auto pt-6">
                <div className="flex justify-between">
                    <img src={photo} alt="Prifile"/>
                    <div className="flex flex-col">
                        <div className="flex gap-6 justify-center">
                            <span className="text-2xl">{data.username}</span>
                            <NavLink to="/profile/edit" className="px-3 py-1 bg-white text-xl rounded-md">Edit</NavLink>
                            <img src={settings}/>
                        </div>
                        <div className="flex gap-6">
                            <span className="text-xl">{data.posts.length} Posts</span>
                            <span className='text-xl'>{data.friends.length} Friends</span>
                        </div>
                    </div>
                </div>
                <div>
                    <span>Posts</span>
                    <div>
                        {data.posts.length===0&& <span>0 posts</span>}
                        {data.posts.length>0&&
                            data.posts.map(post=> (
                                <div key={post.id}>
                                    <span> title: {post.title}</span>
                                    <span> Content: {post.content}</span>
                                </div>
                            ))
                        }
                        <NavLink to="/post">Upload post</NavLink>
                    </div>

                </div>
            </div>

    }
    return (
        <section className="bg-aman min-h-svh">
            {content}
        </section>
    )
}

export default Profile;