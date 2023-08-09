import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const SupportButton = () => {
    const handleWhatsAppClick = () => {
        window.open('https://wa.me/+5511974025414', '_blank');
    };

    return (
        <div className='support-button'>
            <button onClick={handleWhatsAppClick}>
                <FaWhatsapp size={30} />
            </button>
            <style jsx>{`
                @keyframes bounceIn {
                    0% {
                        transform: scale(0.5);
                        opacity: 0;
                    }
                    50% {
                        transform: scale(1.2);
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                @keyframes pulsate {
                    0% {
                        transform: scale(1);
                        box-shadow: 0 0 0 0 #042241;
                    }
                    70% {
                        transform: scale(1.05);
                        box-shadow: 0 0 0 10px rgba(37, 211, 102, 0);
                    }
                    100% {
                        transform: scale(1);
                        box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
                    }
                }

                .support-button {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 9999999;
                    animation: bounceIn 0.5s ease-in-out;
                }
                button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 60px;
                    height: 60px;
                    background-color: #042241;
                    color: #ffffff;
                    border: none;
                    border-radius: 50%;
                    cursor: pointer;
                    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
                    padding: 0;
                    transition: all 0.2s ease-in-out;
                    animation: pulsate 1.5s infinite ease-in-out;
                }
                button:hover {
                    background-color: #042241;
                    transform: scale(1.1);
                }
            `}</style>
        </div>
    );
};

export default SupportButton;
