// contexts/NotificationContext.js
import { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import baseUrl from "@/utils/baseUrl";

const NotificationContext = createContext();

const socket = io(`${baseUrl}/api/users/notification`);

const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        socket.on('notification', (newNotification) => {
            setNotifications((prevNotifications) => [
                ...prevNotifications,
                newNotification,
            ]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <NotificationContext.Provider value={{ notifications }}>
            {children}
        </NotificationContext.Provider>
    );
};

export { NotificationContext, NotificationProvider };