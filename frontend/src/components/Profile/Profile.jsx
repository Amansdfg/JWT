import photo from "../../assets/No-photo.gif"
import settings from "../../assets/settings.svg"
import {NavLink} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {fetchUser} from "../../util/http.js";
function Profile(){
    const {data}=useQuery(({
        queryKey:['user'],
        queryFn:fetchUser
    }))
    return(
        <section className="bg-aman min-h-svh">
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
                        No Post
                    </div>
                </div>
            </div>

        </section>
    )
}
export default  Profile;