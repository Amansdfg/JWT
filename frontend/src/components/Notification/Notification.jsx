import {useQuery} from "@tanstack/react-query";
import {fetchRequest} from "../../util/http.js";
import Loading from "../UI/Loading.jsx";

function Notification(){
    const{data,isPending,isError}=useQuery({
        queryFn:fetchRequest,
    })
    let content;
    if(isPending){
        content=<Loading/>
    }
    if(data){
        content=data.map(user=>(
            <div>{user.username}</div>
        ))
    }
    return(content)
}
export default Notification;