import {Form, NavLink} from "react-router-dom";
import {getAuthToken} from "../../util/auth.js";

export default function MobileNavigation() {
    const token=getAuthToken()
    return (
        <ul className="mt-3 space-y-2 px-2">
            <li>
                {
                    <NavLink
                        to="/"
                        className={({isActive}) =>
                            ` block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg font-medium  ${isActive ? "bg-gray-500" : ""}`
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
                            `block  text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg font-medium ${isActive ? "bg-gray-500" : ""}`
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
                            ` block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg font-medium ${isActive ? "bg-gray-500" : ""}`
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
                            `block  text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg font-medium ${isActive ? "bg-gray-500" : ""}`
                        }
                    >
                        Profile
                    </NavLink>
                }
            </li>

            {
                token &&
                <li>
                    <Form action="/logout" method='post' className=" block  text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg font-medium">
                        <button className="static">
                            Logout
                        </button>
                    </Form>
                </li>
            }

        </ul>
    );
}
