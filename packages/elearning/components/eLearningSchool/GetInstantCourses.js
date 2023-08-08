import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';

const GetInstantCourses = ({ user }) => {
    const [email, setEmail] = useState('');
    const { t } = useTranslation();
    const [isMounted, setIsMounted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        window.open(
            'https://www.youtube.com/watch?v=WO-suAVDztk',
            '_blank',
            'noopener noreferrer'
        );
        const audienceId = '30ec86df3b'; // Clase Gratuita Audience
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

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <>
            {isMounted && (
                <div className='get-instant-courses-area ptb-100'>
                    <div className='container'>
                        <div className='get-instant-courses-inner-area'>
                            <div className='row align-items-center'>
                                <div className='col-lg-8 col-md-12'>
                                    <div className='get-instant-courses-content'>
                                        <span className='sub-title'>
                                            {t('instant-span', {
                                                defaultValue:
                                                    'Free Registration',
                                            })}
                                        </span>
                                        <h2>
                                            {t('instant-h2', {
                                                defaultValue:
                                                    'Experimental Class',
                                            })}
                                        </h2>
                                        <p>
                                            {t('instant-text', {
                                                defaultValue:
                                                    'Watch a totally free experimental class to understand our methodology. Subscribe to a plan to keep learning more.',
                                            })}
                                        </p>

                                        <form
                                            className='newsletter-form-instant-courses'
                                            onSubmit={handleSubmit}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    width: '100%',
                                                    marginBottom: '15px',
                                                    flexWrap: 'wrap',
                                                }}
                                            >
                                                <input
                                                    type='email'
                                                    className='input-newsletter'
                                                    style={{
                                                        flex: 1,
                                                        padding: '10px',
                                                        fontSize: '16px',
                                                        lineHeight: '24px',
                                                        border: '1px solid #ccc',
                                                        borderRadius: '5px',
                                                        backgroundColor: '#fff',
                                                        minWidth: '200px',
                                                        marginBottom: '10px',
                                                    }}
                                                    placeholder='Email'
                                                    name='email'
                                                    value={email}
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                    required
                                                />

                                                <motion.button
                                                    type='submit'
                                                    className='default-btn'
                                                    whileTap={{
                                                        scale: 0.5,
                                                    }}
                                                    style={{
                                                        marginLeft: '10px',
                                                        marginTop: '0',
                                                        marginBottom: '10px',
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    <i className='flaticon-user'></i>
                                                    {t('subscribe-btn', {
                                                        defaultValue:
                                                            'Subscribe',
                                                    })}
                                                    <span></span>
                                                </motion.button>
                                            </div>
                                            <style jsx>{`
                                                @media screen and (max-width: 767px) {
                                                    .input-newsletter {
                                                        width: 100%;
                                                        margin-bottom: 10px;
                                                    }

                                                    .default-btn {
                                                        margin-left: 0;
                                                        width: 100%;
                                                    }
                                                }
                                            `}</style>
                                        </form>
                                    </div>
                                </div>

                                <div className='col-lg-4 col-md-12'>
                                    <div className='get-instant-courses-image'>
                                        <img
                                            src='/images/sorvete-3.webp'
                                            alt='image'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default GetInstantCourses;
