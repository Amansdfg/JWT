import React, { useEffect, useState } from 'react';
import sun from "../../assets/sun.svg"
import moon from "../../assets/moon.svg"
const DarkModeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Check for user.svg's theme preference in localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        }
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        if (!isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <button
            onClick={toggleDarkMode}
            className="w-8"
        >
           <img src={isDarkMode ? sun : moon} alt={isDarkMode?"moon.svg":'sun'}/>
        </button>
    );
};

export default DarkModeToggle;
