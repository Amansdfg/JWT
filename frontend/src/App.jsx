import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import NotFound from "./components/NotFound.jsx";
import Secured from "./components/Secured.jsx";
import Chat from "./components/Chat/Chat.jsx";
import Registration from "./components/Registration/Registration.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [user, setUser] = useState({ username: "Aman", friends: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                window.location.href="http://localhost:8080/login"
                // return;
            }
            try {
                const responseData = await axios.get('http://localhost:8080/aman/info', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(responseData.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    console.log(user)
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home user={user} />} />
                <Route path="/secured" element={<Secured />} />
                <Route path="/chat/:id" element={<Chat user={user} />} />
                <Route path="/chat" element={<Chat user={user} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
