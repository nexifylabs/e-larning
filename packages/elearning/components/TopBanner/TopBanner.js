import React, { useState, useEffect } from 'react';
import styles from './TopBanner.module.css';
import axios from 'axios';
import baseUrl from '@/utils/baseUrl';

import { parseCookies } from 'nookies';

const TopBanner = () => {
    const [showBanner, setShowBanner] = useState(false);
    const [message, setMessage] = useState([]);
    const { elarniv_users_token } = parseCookies();

    const fetchData = async () => {
        try {
            const payload = {
                headers: { Authorization: elarniv_users_token },
            };
            const response = await axios.get(`${baseUrl}/api/banners`, payload);
            setMessage(response.data.banners);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        fetchData().then();

        if (message) {
            setShowBanner(true);
        }
    }, []);

    return (
        <div
            className={`${styles.topBanner} ${
                showBanner ? styles.visible : ''
            }`}
        >
            {message[0] && <p>{message.find((e) => e.isNavBar).code}</p>}
        </div>
    );
};

export default TopBanner;
