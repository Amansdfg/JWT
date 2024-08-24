import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/Root.jsx';
import {action as logoutAction} from "./pages/Logout.jsx"
import { checkAuthLoader, tokenLoader } from './util/auth';
import Home from "./components/Home/Home.jsx";
import {client} from "./util/http.js";
import Login ,{action as loginAction} from "./pages/Authentication.jsx"
import SignUp ,{action as registerAction} from "./pages/SignUp.jsx";
import NotFound from "./components/NotFound.jsx";
import Chat from "./components/Chat/Chat.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import {QueryClientProvider} from "@tanstack/react-query";
import Profile from "./components/Profile/Profile.jsx";
import UploadPost ,{action as postAction} from "./pages/UploadPost.jsx";
import Notification from "./components/Notification/Notification.jsx";
import Friends from "./components/Profile/Friends.jsx";
import SettingsLayout from "./components/settings/SettingsLayout.jsx";
import EditProfile from "./components/settings/EditProfile.jsx"
import AboutUs from "./components/AboutUs.jsx";
const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage/>,
        id:"root",
        loader:tokenLoader,
        children: [
            {
                index: true,
                element: <Home/>,
                // loader:checkAuthLoader,
            },
            {
                path:'logout',
                action:logoutAction,
            },
            {
                path: "profile",
                children:[
                    {
                        index:true,
                        element: <Profile/>,
                    },
                    {
                        path:":id",
                        element:<Profile/>
                    },
                ]
            },
            {
                path: "notification",
                element: <Notification/>
            },
            {
                path: "post",
                element: <UploadPost/>,
                action:postAction
            },
            {
                path: "about_us",
                element: <AboutUs/>
            },
            {
                path:"settings",
                element: <SettingsLayout/>,
                children:[
                    {
                        index: true,
                        element: <EditProfile/>
                    },
                    {
                        path: "edit",
                        element: <EditProfile/>
                    },
                    {
                        path: "about_us",
                        element: <AboutUs/>
                    },

                ]
            },
            {
                path: "friends",
                element: <Friends/>,
                children:[
                    {
                        path:":id",
                        element:<Friends/>
                    }
                ]
            },
            {
                path:"*",
                element:<NotFound/>
            }

        ],
    },
    {
        path:"login",
        element:<Login/>,
        action : loginAction,
    },
    {
        path: 'register',
        element: <SignUp />,
        action:registerAction
    },
    {
        path: "chat",
        element: <Chat />,
        children: [
            {
                path: ":id",
                element: <Chat />
            }
        ]
    }
]);

function App() {
   return(
        <QueryClientProvider client={client}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    )
}

export default App;



