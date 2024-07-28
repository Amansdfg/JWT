import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import NotFound from "./components/NotFound.jsx";
import Secured from "./components/Secured.jsx";
import Chat from "./components/Chat/Chat.jsx";
import Registration from "./components/Registration/Registration.jsx";
function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/secured" element={<Secured />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/chat" element={<Chat/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;
