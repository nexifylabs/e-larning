import React, { useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Router from 'next/router';
import LoadingSpinner from '@/utils/LoadingSpinner';
import baseUrl from '@/utils/baseUrl';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';

const INITIAL_USER = {
    email: '',
    token: '',
};

const ForgotPassComponent = () => {
    const [user, setUser] = React.useState(INITIAL_USER);
    const [disabled, setDisabled] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [tokenLoading, setTokenLoading] = React.useState(false);
    const [tokenSent, setTokenSent] = React.useState(false);

    const { t } = useTranslation();
    const [isMounted, setIsMounted] = React.useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    React.useEffect(() => {
        const isUser = Object.values(user).every((el) => Boolean(el));
        isUser ? setDisabled(false) : setDisabled(true);
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSendToken = async (e) => {
        e.preventDefault();
        setTokenLoading(true);

        console.log(user.email);

        try {
            const response = await axios.get(
                `${baseUrl}/api/users/password-reset/token-send?userEmail=${user.email}`
            );

            toast.success(response.data.message);
        } catch (err) {
            toast.error(err.message);
        }

        setTokenSent(true);
        setTokenLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const url = `${baseUrl}/api/users/password-reset?userEmail=${user.email}&token=${user.token}`;
            const response = await axios.put(url);
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
            Router.push('/');
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
                <div className='ptb-100'>
                    <div className='container'>
                        <div className='row justify-content-center'>
                            <div className='col-lg-6'>
                                <div className='login-form'>
                                    <p>
                                        {t('forgotpasspage-textone', {
                                            defaultValue:
                                                'Please enter your email and the token that you received in your email address.',
                                        })}
                                    </p>

                                    <form onSubmit={handleSubmit}>
                                        <div className='form-group input-group align-items-center'>
                                            <input
                                                type='email'
                                                className='form-control flex-grow-1'
                                                placeholder='Email'
                                                name='email'
                                                value={user.email}
                                                onChange={handleChange}
                                                required
                                            />
                                            <div className='input-group-append'>
                                                <button
                                                    type='button'
                                                    className='btn btn-secondary'
                                                    onClick={handleSendToken}
                                                    disabled={tokenLoading}
                                                    style={{
                                                        position: 'relative',
                                                        bottom: '11px',
                                                        marginLeft: '10px',
                                                    }}
                                                >
                                                    {tokenLoading ? (
                                                        <LoadingSpinner />
                                                    ) : tokenSent ? (
                                                        'Enviado'
                                                    ) : (
                                                        'Enviar token'
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        <div className='form-group'>
                                            <label>Token</label>
                                            <input
                                                type='text'
                                                className='form-control'
                                                placeholder='Token'
                                                name='token'
                                                value={user.token}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <motion.button
                                            type='submit'
                                            disabled={disabled}
                                            // onClick={}
                                            whileTap={{ scale: 0.9 }}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {t('forgotpasspage-reset-pass', {
                                                defaultValue: 'Reset Password',
                                            })}

                                            {loading ? <LoadingSpinner /> : ''}
                                        </motion.button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ForgotPassComponent;
