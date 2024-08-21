import {Form, NavLink} from "react-router-dom";
import {getAuthToken} from "../../util/auth.js";

export default function MainNavigation() {
    const token=getAuthToken()
    return (
        <ul className="ml-10 flex items-baseline space-x-4">
            <li>
                {
                    <NavLink
                        to="/"
                        className={({isActive}) =>
                            `dark:text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium ${isActive ? "bg-gray-500" : ""}`
                        }
                    >
                        Home
                    </NavLink>
                }
            </li>
            <li>
                {
                    !token &&
                    <NavLink
                        to="/login"
                        className={({isActive}) =>
                            `dark:text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium ${isActive ? "bg-gray-500" : ""}`
                        }
                    >
                        Authentication
                    </NavLink>
                }
            </li>
            <li>
                {
                    token &&
                    <NavLink
                        to="/chat"
                        className={({isActive}) =>
                            `dark:text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium ${isActive ? "bg-gray-500" : ""}`
                        }
                    >
                        Chat
                    </NavLink>
                }
            </li>
            <li>
                {
                    token &&
                    <NavLink
                        to="/profile"
                        className={({isActive}) =>
                            `dark:text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium ${isActive ? "bg-gray-500" : ""}`
                        }
                    >
                        Profile
                    </NavLink>
                }
            </li>
            <li>
                {
                    token &&
                    <NavLink
                        to="/notification"
                        className={({isActive}) =>
                            `dark:text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium ${isActive ? "bg-gray-500" : ""}`
                        }
                    >
                        Notification
                    </NavLink>
                }
            </li>
            <li>
                {
                    token &&
                    <NavLink
                        to="/friends"
                        className={({isActive}) =>
                            `dark:text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium ${isActive ? "bg-gray-500" : ""}`
                        }
                    >
                        Friends
                    </NavLink>
                }
            </li>
            {
                token &&
                <li>
                    <Form action="/logout" method='post'>
                        <button
                            className="dark:text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                        >
                            Logout
                        </button>
                    </Form>
                </li>
            }

        </ul>
    );
}
