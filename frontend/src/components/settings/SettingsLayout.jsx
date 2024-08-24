import {useQuery} from "@tanstack/react-query";
import {fetchUser} from "../../util/http.js";
import {settingsMenu} from "../../util/list.js";
import {Outlet} from "react-router-dom";

export default function SettingsLayout(){
    const{data:user}=useQuery({
        queryKey:["user"],
        queryFn:fetchUser
    })
    return (
        user &&
        <section className="px-10 py-12 flex">
            <div className='flex flex-col gap-4'>
                {settingsMenu.map(item => (
                    <a className="flex items-center dark:text-white§1" key={item.id} href={item.href}>
                        <img src={item.image} alt={item.name} className="mr-3 "/>
                        <span className="text-2xl">{item.title}</span>
                    </a>
                ))}
            </div>
            <div className="h-full flex flex-col max-w-[800px] mx-auto">
                <Outlet/>
            </div>
        </section>
)
}
