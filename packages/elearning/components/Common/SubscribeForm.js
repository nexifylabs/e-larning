import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
// hola
const SubscribeForm = () => {
    const [email, setEmail] = useState('');

    const { t } = useTranslation();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const audienceId = '69cfcfd45d';
        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, audienceId }),
            });

            const data = await response.json();

            setEmail('');

            if (!response.ok) {
                toast.error(data.error, {
                    style: {
                        border: '1px solid #ff0033',
                        padding: '16px',
                        color: '#ff0033',
                    },
                    iconTheme: {
                        primary: '#ff0033',
                        secondary: '#FFFAEE',
                    },
                });
            } else {
                toast.success('Email submitted successfully!', {
                    style: {
                        border: '1px solid #4BB543',
                        padding: '16px',
                        color: '#4BB543',
                    },
                    iconTheme: {
                        primary: '#4BB543',
                        secondary: '#FFFAEE',
                    },
                });
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.', {
                style: {
                    border: '1px solid #ff0033',
                    padding: '16px',
                    color: '#ff0033',
                },
                iconTheme: {
                    primary: '#ff0033',
                    secondary: '#FFFAEE',
                },
            });
        }
    };

    return (
        <>
            {isMounted && (
                <div className='subscribe-area bg-f9f9f9 ptb-100'>
                    <div className='container'>
                        <div className='subscribe-content'>
                            <span className='sub-title'>
                                {t('subscribe-span', {
                                    defaultValue: 'If you like news...',
                                })}
                            </span>
                            <h2>
                                {t('subscribe-h2', {
                                    defaultValue: 'Subscribe to our Newsletter',
                                })}
                            </h2>
                            <p>
                                {t('subscribe-text', {
                                    defaultValue:
                                        'Here we share news, tips, promotions, and ice cream world news first-hand. Subscribe.',
                                })}
                            </p>

                            <form
                                className='newsletter-form'
                                onSubmit={handleSubmit}
                            >
                                <input
                                    type='email'
                                    className='input-newsletter'
                                    placeholder='Email'
                                    name='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />

                                <motion.button
                                    type='submit'
                                    className='default-btn'
                                    whileTap={{ scale: 0.5 }}
                                >
                                    <i className='flaticon-user'></i>
                                    {t('subscribe-btn', {
                                        defaultValue: 'Subscribe',
                                    })}
                                    <span></span>
                                </motion.button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SubscribeForm;
