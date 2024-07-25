import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/SignUp.jsx';
import Home from './components/Home';
import NotFound from "./components/NotFound.jsx";
import Header from "./components/Header.jsx";
import Secured from "./components/Secured.jsx";
function App() {
    return (
        <>
            <Header/>
            <Router>
                <Routes>
                    <Route path="/secured" element={<Secured />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;
