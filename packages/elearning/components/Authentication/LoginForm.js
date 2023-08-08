import React, { useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { handleLogin } from '@/utils/auth';
import LoadingSpinner from '@/utils/LoadingSpinner';
import baseUrl from '@/utils/baseUrl';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';

const INITIAL_USER = {
    email: '',
    password: '',
};

const LoginForm = () => {
    const [user, setUser] = React.useState(INITIAL_USER);
    const [disabled, setDisabled] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [isMounted, setIsMounted] = React.useState(false);
    const { t } = useTranslation();
    const router = useRouter();

    React.useEffect(() => {
        const isUser = Object.values(user).every((el) => Boolean(el));
        isUser ? setDisabled(false) : setDisabled(true);
    }, [user]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user.email || !user.password) {
            toast.error('Please fill in all fields', {
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
            return;
        }

        try {
            setLoading(true);
            const url = `${baseUrl}/api/users/signin`;
            const payload = { ...user };
            const response = await axios.post(url, payload);
            handleLogin(response.data.elarniv_users_token, router);
            toast.success(response.data.message, {
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
        } catch (err) {
            let {
                response: {
                    data: { message },
                },
            } = err;
            toast.error(message, {
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
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {isMounted && (
                <div className='login-form'>
                    <h2>
                        {t('loginpage-login', {
                            defaultValue: 'Login',
                        })}
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label>Email</label>
                            <input
                                type='text'
                                className='form-control'
                                name='email'
                                value={user.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='form-group'>
                            <label>
                                {t('loginpage-password', {
                                    defaultValue: 'Password',
                                })}
                            </label>
                            <input
                                type='password'
                                className='form-control'
                                name='password'
                                value={user.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <motion.button
                            type='submit'
                            disabled={disabled}
                            whileTap={{ scale: 0.9 }}
                        >
                            {t('loginpage-logintwo', {
                                defaultValue: 'Log In',
                            })}

                            {loading ? <LoadingSpinner /> : ''}
                        </motion.button>

                        <div
                            className='row align-items-center'
                            style={{
                                marginTop: '20px',
                            }}
                        >
                            <div className='col-lg-12 col-md-12 col-sm-12 remember-me-wrap'>
                                <Link href='/send-confirmation-email'>
                                    <a className='lost-your-password'>
                                        {t('loginpage-confirmationemail', {
                                            defaultValue:
                                                'Didnt receive a confirmation email?',
                                        })}
                                    </a>
                                </Link>
                            </div>

                            <div className='col-lg-6 col-md-6 col-sm-12 forgot-password-wrap'>
                                <Link href='/forgot-password-page'>
                                    <a
                                        className='forgot-password'
                                        style={{
                                            color: 'blue',
                                        }}
                                    >
                                        {t('loginpage-forgotpassword', {
                                            defaultValue: 'Forgot password?',
                                        })}
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default LoginForm;
