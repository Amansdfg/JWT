import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/Root.jsx';
import {action as logoutAction} from "./pages/Logout.jsx"
import { checkAuthLoader, tokenLoader } from './util/auth';
import Home from "./components/Home.jsx";
import {client} from "./util/http.js";
import Login ,{action as loginAction} from "./pages/Authentication.jsx"
import Registration from "./components/Registration/Registration.jsx";
import NotFound from "./components/NotFound.jsx";
import Secured from "./components/Secured.jsx";
import Chat from "./components/Chat/Chat.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import {QueryClientProvider} from "@tanstack/react-query";
import Profile from "./components/Profile/Profile.jsx";
import FileUpload from "./components/FileUpload.jsx";
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
                element: <Home/> },
            {
                path:"login",
                element:<Login/>,
                action : loginAction,
            },
            {
                path: 'register',
                element: <Registration />,
            },
            {
                path: 'Secured',
                element: <Secured />,
            },
            {
                path:'logout',
                action:logoutAction,
            },
            {
              path: "profile",
              element: <Profile/>
            },
            {
                path: "file",
                element: <FileUpload/>
            },
            {
                path:"*",
                element:<NotFound/>
            }

        ],
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
    return (
        <QueryClientProvider client={client}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    )
}

export default App;



