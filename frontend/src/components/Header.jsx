import sun from "../assets/sun.svg";
import menu from "../assets/menu.svg";
import menuDark from "../assets/menuDark.svg";
import close from "../assets/close.svg";
import closeDark from "../assets/closeDark.svg";
import { useEffect, useState } from "react";
import axios from "axios";

function Header() {
    const [header, setHeader] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchHeaderData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/header');
                setHeader(response.data);
            } catch (error) {
                console.error("Error fetching header data:", error);
            }
        };

        fetchHeaderData();
    }, []);

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <header>
            <h1>Aman Kalabay</h1>
            <ul className={`nav ${isOpen ? 'open' : ''}`}>
                {header.map((item) => (
                    <li key={item.name}><a href={item.href}>{item.name}</a></li>
                ))}
            </ul>
            <button id="darkmode"><img src={sun} alt="aman" /></button>
            <button onClick={toggleMenu} className="menu">
                <img className="btn-menu" src={isOpen ? close : menu} alt="aman" />
            </button>
        </header>
    );
}

export default Header;
