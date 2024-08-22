import logo from  "../../assets/chatgramLogo.png";
import BellIcon from "./icons/BellIcon.jsx";
import DisclosureButton from "./DisclosureButton.jsx";
import Menu from "./menu/Menu.jsx";
import DisclosurePanel from "./DisclosurePanel.jsx";
import XMarkIcon from "./icons/XMarkIcon.jsx";
import Bars3Icon from "./icons/Bars3Icon.jsx";
import {useState} from "react";
import {header} from "../../util/list.js";
import MainNavigation from "./MainNavigation.jsx";
import DarkModeToggle from "../UI/DarkModeToggle.jsx";
export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    function handle(){
        setIsOpen(!isOpen);
    }
    return (
        <nav className='w-screen bg-gray-800 dark:bg-darkMode shadow-header'>
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
                            <MainNavigation/>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            <DarkModeToggle/>
                            <button
                                type="button"
                                className="relative rounded-full dabg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                <span className="absolute -inset-1.5"/>
                                <span className="sr-only">View notifications</span>
                                <BellIcon/>
                            </button>
                            <Menu header={header}/>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <DarkModeToggle/>
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
            <DisclosurePanel isOpen={isOpen}/>
        </nav>
    )
}
