import {setting} from "../../util/list.js";
import DisclosureButton from "./DisclosureButton.jsx";
import BellIcon from "./icons/BellIcon.jsx";
import photo from "../../assets/No-photo.gif";
import {useQuery} from "@tanstack/react-query";
import {fetchUser} from "../../util/http.js";
import Loading from "../UI/Loading.jsx";
import MainNavigation from "./MainNavigation.jsx";
import MobileNavigation from "./MobileNavigation.jsx";
export default function DisclosurePanel({isOpen}){
    const {data,isError,isPending,error}=useQuery({
        queryKey:['user'],
        queryFn:({signal})=>fetchUser({signal})
    })
    let content;
    if(isPending){
        content=<Loading/>
    }
    if(isError){
        content=<p>Error</p>
    }
    if(data){
        content=   <>
            <div className="text-base font-medium leading-none text-white">{data.username}</div>
            <div className="text-sm font-medium leading-none text-gray-400">{data.email}</div>
        </>
    }
    return(
        <div className={`md:hidden ${!isOpen?"hidden":""}`}>
            <div className="border-t border-gray-700 pb-3 pt-4">
                <MobileNavigation/>
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src={photo} alt="" />
                    </div>
                    <div className="ml-3">
                        {content}
                    </div>
                    <button
                        type="button"
                        className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon />
                    </button>
                </div>
                <div className="mt-3 space-y-1 px-2">
                    {setting.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </div>
        </div>
    )
}