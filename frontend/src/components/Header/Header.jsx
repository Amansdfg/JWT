import logo from  "../../assets/chatgramLogo.png";
import BellIcon from "./icons/BellIcon.jsx";
import DisclosureButton from "./DisclosureButton.jsx";
import Menu from "./menu/Menu.jsx";
import DisclosurePanel from "./DisclosurePanel.jsx";
import XMarkIcon from "./icons/XMarkIcon.jsx";
import Bars3Icon from "./icons/Bars3Icon.jsx";
import {useEffect, useState} from "react";
import axios from "../../util/axios.js";

import {header} from "../../util/list.js";
export default function Header({...props}) {
    const [user,setUser]=useState({username:"aman",email:"asd",photos:[]});
    const [isOpen, setIsOpen] = useState(false);
    useEffect(()=> {
        const fetch = async ()=> {
            const token = localStorage.getItem("token")
            if (!token) {
                window.location.href = "/login";
            }
            try {
                const responseuser = await axios.get("/aman/info", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setUser(responseuser.data)
            } catch (error) {
                console.error("Error fetching header data:", error);
                throw new Error("setr")
            }
        }
        fetch()
    },[])

    function handle(){
        setIsOpen(!isOpen);
    }
    return (
        <nav className='w-screen bg-gray-800' {...props}>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <img
                                        className="h-8 w-8"
                                        src={logo}
                                        alt="Your Company"
                                    />
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        {header.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-4 flex items-center md:ml-6">
                                    <button
                                        type="button"
                                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >
                                        <span className="absolute -inset-1.5"/>
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon/>
                                    </button>
                                    <Menu header={header} user={user}/>
                                </div>
                            </div>
                            <div className="-mr-2 flex md:hidden">
                                <DisclosureButton handle={handle} className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                        {!isOpen ? (
                                            <XMarkIcon/>
                                        ) : (
                                            <Bars3Icon/>
                                        )}
                                </DisclosureButton>
                            </div>
                        </div>
                    </div>
                <DisclosurePanel user={user} isOpen={isOpen}/>
        </nav>
    )
}
