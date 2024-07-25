import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            console.log(token)
            console.log(`Bearer ${token}`);
            if (!token) {
                console.log(token)
                setMessage('No token found. Please log in.');
                return;
            }
            try {
                const response = await axios.get('http://localhost:8080/aman/info', {

                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMessage(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setMessage('Error fetching data.');

            }
        };

        fetchData();
    }, []);

    return <div>{message}</div>;
};

export default Home;
