import {setting} from "../../util/list.js";
import DisclosureButton from "./DisclosureButton.jsx";
import BellIcon from "./icons/BellIcon.jsx";
import photo from "../../assets/No-photo.gif";
import {header} from "../../util/list.js";
export default function DisclosurePanel({isOpen,user}){

    return(
        <div className={`md:hidden ${!isOpen?"hidden":""}`}>
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {header.map((item) => (
                    <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className=
                            // item.current ? 'bg-gray-900 text-white' :
                                'text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'

                        // aria-current={item.current ? 'page' : undefined}
                    >
                        {item.name}
                    </DisclosureButton>
                ))}
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src={user.photos[0]??photo} alt="" />
                    </div>
                    <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">{user.username}</div>
                        <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
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