import React from 'react';
import baseUrl from '@/utils/baseUrl';
import axios from 'axios';

const NotificationModal = ({
    onClose,
    notifications,
    userToken,
    onClearAll,
    onViewAll,
    isLoading
}) => {
    async function onClickNotification(notificationId) {
        // console.log(notification)
        console.log(userToken);

        const url = `${baseUrl}/api/users/notification?notificationId=${notificationId}`;
        const payload = {
            headers: { Authorization: userToken },
        };
        try {
            await axios.put(url, {}, payload);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='notification-modal'>
            <button
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: '6px',
                    right: '14px',
                    background: 'none',
                    border: 'none',
                    padding: '0',
                    cursor: 'pointer',
                    color: '#888888',
                    fontSize: '20px',
                }}
            >
                X
            </button>
            <h3
                style={{
                    textAlign: 'center',

                    color: '#CD4B85',
                    fontWeight: 'bold',
                }}
            >
                Notifications
            </h3>
            <hr
                className='payment-field-border'
                style={{ width: '80%', margin: '0 auto' }}
            />


            {isLoading && 'cargando'}


            <ul className='notification-list'>


                {notifications.map((notification) =>
                    !notification.read ? (
                        <li key={notification.id} className='notification-item'>
                            <a
                                onClick={() =>
                                    onClickNotification(notification.id)
                                }
                                href={notification.link}
                                style={{
                                    color: '#333333',
                                    textDecoration: 'none',
                                    fontWeight: 'bold',
                                }}
                            >
                                {notification.message}
                            </a>

                            <div
                                style={{
                                    color: '#CD4F88',
                                    fontSize: '13px',
                                }}
                            >
                                No leida
                            </div>
                        </li>
                    ) : (
                        <li key={notification.id} className='notification-item'>
                            <a
                                onClick={() =>
                                    onClickNotification(notification.id)
                                }
                                href={notification.link}
                                style={{
                                    color: '#333333',
                                    textDecoration: 'none',
                                    fontWeight: 'bold',
                                }}
                            >
                                {notification.message}
                            </a>
                            <div
                                style={{
                                    color: '#CD4F88',
                                    fontSize: '13px',
                                }}
                            >
                                ✓ Leida
                            </div>
                        </li>
                    )
                )}
            </ul>

            <div className='button-container-notis'>
                {/* <button
                    onClick={onClearAll}
                    className='clear-button'
                    style={{ color: '#CD4F88' }}
                >
                    Clear All
                </button> */}
                <button
                    onClick={onViewAll}
                    className='view-all-button'
                    style={{ color: '#CD4F88' }}
                >
                    All Notifications
                </button>
            </div>
        </div>
    );
};
export default NotificationModal;
