import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'next-i18next';

const PopUp = ({ onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [nameError, setNameError] = useState('');
    const { t } = useTranslation();
    const [isMounted, setIsMounted] = React.useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const addToMailchimp = async (email, name, audienceId) => {
        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, name, audienceId }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Email submitted successfully!');
                setTimeout(() => {
                    onClose();
                }, 2000);
            } else {
                console.error('Response JSON:', data); // Add this line to log the JSON response
                toast.error(
                    data.error || 'An error occurred. Please try again.'
                );
            }
        } catch (error) {
            console.error('Mailchimp error:', error);
            toast.error('An error occurred. Please try again.');
        }
    };

    const handleNameChange = (e) => {
        const inputName = e.target.value;
        setName(inputName);

        const namePattern = /^[a-zA-Z\s]+$/;
        if (!namePattern.test(inputName)) {
            setNameError(
                'Please enter a valid name without special characters.'
            );
        } else {
            setNameError('');
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!e.target.checkValidity() || nameError) {
            toast.error('Please fill out all fields correctly.');
            return;
        }

        const audienceId = '508bd65738';
        await addToMailchimp(email, name, audienceId);
    };

    return (
        <>
            {isMounted && (
                <>
                    <div className='overlaypopup'></div>
                    <div className='popup'>
                        <button className='popup__close' onClick={onClose}>
                            X
                        </button>
                        <div className='popup-content'>
                            <img
                                className='popup-image'
                                src='/sorvete-logo.png'
                                alt='Ice cream course'
                            />
                            <div>
                                <h2 className='color-changing'>
                                    {t('popup-h2', {
                                        defaultValue: 'Your lucky day',
                                    })}
                                </h2>
                                <p>
                                    {t('popup-p', {
                                        defaultValue:
                                            'Subscribe to our newsletter and get a 10% discount code',
                                    })}
                                </p>

                                <form
                                    action='https://escolasorvete.us17.list-manage.com/subscribe/post'
                                    method='POST'
                                >
                                    <input
                                        type='hidden'
                                        name='u'
                                        value='861af04770adfc24846742c1c'
                                    />
                                    <input
                                        type='hidden'
                                        name='id'
                                        value='be824b0afb'
                                    />
                                    <label>
                                        {t('popup-label1', {
                                            defaultValue: 'Type your name:',
                                        })}

                                        <input
                                            type='text'
                                            name='MERGE1'
                                            value={name}
                                            onChange={handleNameChange}
                                            required
                                        />
                                    </label>
                                    {nameError && (
                                        <p style={{ color: 'red' }}>
                                            {nameError}
                                        </p>
                                    )}
                                    <label>
                                        {t('popup-label2', {
                                            defaultValue: 'Type your e-mail:',
                                        })}

                                        <input
                                            type='email'
                                            name='EMAIL'
                                            value={email}
                                            onChange={handleEmailChange}
                                            required
                                        />
                                    </label>
                                    <button
                                        type='submit'
                                        onClick={handleSubmit}
                                    >
                                        {t('popup-btn', {
                                            defaultValue: 'I want the coupon',
                                        })}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default PopUp;
