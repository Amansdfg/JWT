// import axios from "./axios";
// export async function request(href){
//     const token=localStorage.getItem("token")
//     if(!token){
//         window.location.href="/login";
//     }
//     try{
//         const response=await axios.get(href,{
//             headers:{
//                 Authorization: `Bearer ${token}`,
//             }
//         });
//         return response.data;
//     }catch (error) {
//         console.error("Error fetching header data:", error);
//         throw new Error("setr")
//     }
// }
import axios from "./axios.js";
export function request(asd){
    let result;
    const fetch = async ()=> {
        const token = localStorage.getItem("token")
        if (!token) {
            window.location.href = "/login";
        }
        try {
            const response = await axios.get(asd, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(response.data)
            result=response.data;
        } catch (error) {
            console.error("Error fetching header data:", error);
            throw new Error("setr")
        }
    }
    fetch()
    return result;
}
