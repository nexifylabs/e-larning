import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoadingSpinner from '@/utils/LoadingSpinner';
import baseUrl from '@/utils/baseUrl';
import { useTranslation } from 'next-i18next';

const INITIAL_STATE = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
};

const ContactForm = () => {
    const { t } = useTranslation();
    const [isMounted, setIsMounted] = React.useState(false);

    const [contact, setContact] = useState(INITIAL_STATE);
    const [disabled, setDisabled] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [emailError, setEmailError] = useState('');

    useEffect(() => {
        setIsMounted(true);
    }, []);

    React.useEffect(() => {
        const isContact = Object.values(contact).every((el) => Boolean(el));
        isContact ? setDisabled(false) : setDisabled(true);
    }, [contact]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact((prevState) => ({ ...prevState, [name]: value }));

        if (name === 'email') {
            validateEmail(value);
        }
    };

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(email)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (emailError) return;

        // ... rest of the handleSubmit function
        try {
            setLoading(true);
            const url = `${baseUrl}/api/contact`;
            const payload = { ...contact };
            const response = await axios.post(url, payload);
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
            setContact(INITIAL_STATE);
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
                <div className='contact-form'>
                    <h2>
                        {t('contactform-text1', {
                            defaultValue: 'Ready to Get Started?',
                        })}
                    </h2>
                    <p>
                        {t('contactform-text2', {
                            defaultValue:
                                'Your email address will not be published. Required fields are marked *',
                        })}
                    </p>

                    <form id='contactForm' onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className='col-lg-6 col-md-6'>
                                <div className='form-group'>
                                    <input
                                        type='text'
                                        placeholder='Seu nome'
                                        name='name'
                                        value={contact.name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className='col-lg-6 col-md-6'>
                                <div className='form-group'>
                                    <input
                                        type='text'
                                        placeholder='Seu endereço de email'
                                        name='email'
                                        value={contact.email}
                                        onChange={handleChange}
                                    />
                                    {emailError && (
                                        <div className='error'>
                                            {emailError}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className='col-lg-12 col-md-6'>
                                <div className='form-group'>
                                    <input
                                        type='text'
                                        placeholder='Seu número de telefone'
                                        name='phone'
                                        value={contact.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className='col-lg-12 col-md-12'>
                                <div className='form-group'>
                                    <input
                                        type='text'
                                        name='subject'
                                        value={contact.subject}
                                        onChange={handleChange}
                                        placeholder='Assunto'
                                    />
                                </div>
                            </div>

                            <div className='col-lg-12 col-md-12'>
                                <div className='form-group'>
                                    <textarea
                                        cols='30'
                                        rows='5'
                                        placeholder='Escreva sua mensagem...'
                                        name='message'
                                        value={contact.message}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className='col-lg-12 col-sm-12 text-center'>
                                <button
                                    type='submit'
                                    className='default-btn'
                                    disabled={disabled}
                                >
                                    {t('contactform-text3', {
                                        defaultValue: 'Send Message',
                                    })}{' '}
                                    {loading ? <LoadingSpinner /> : ''}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default ContactForm;
