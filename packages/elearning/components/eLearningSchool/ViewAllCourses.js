import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const ViewAllCourses = () => {
    const { t } = useTranslation();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <>
            {isMounted && (
                <div className='view-all-courses-area ptb-100 bg-F6F1ED'>
                    <div className='container'>
                        <div className='row align-items-center'>
                            <div className='col-lg-6 col-md-12'>
                                <div className='view-all-courses-content'>
                                    <span className='sub-title'>
                                        {t('viewall-span', {
                                            defaultValue: 'In the Media',
                                        })}
                                    </span>
                                    <h2>
                                        {t('viewall-h2', {
                                            defaultValue:
                                                'Follow our participation on TV and other channels',
                                        })}
                                    </h2>
                                    <p>
                                        {t('viewall-text', {
                                            defaultValue:
                                                'We are on communication channels sharing content and analyzing scenarios that impact the ice cream market. Follow our official channels and TV news',
                                        })}
                                    </p>

                                    <hr
                                        className='payment-field-border'
                                        style={{
                                            marginTop: '50px',
                                            marginBottom: '50px',
                                        }}
                                    />

                                    <div>
                                        <a
                                            href='https://www.youtube.com/channel/UCBk5AcuUG7mIsO9RETL9iGw'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            style={{
                                                marginRight: '32px',
                                                color: '#042241',
                                            }}
                                        >
                                            <i
                                                className='bx bxl-youtube'
                                                style={{ fontSize: '26px' }}
                                            ></i>
                                        </a>
                                        <a
                                            href='https://www.instagram.com/escolasorvete/'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            style={{
                                                marginRight: '32px',
                                                color: '#042241',
                                            }}
                                        >
                                            <i
                                                className='bx bxl-instagram'
                                                style={{ fontSize: '26px' }}
                                            ></i>
                                        </a>

                                        <a
                                            href='https://pin.it/1WALa0x'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            style={{
                                                marginRight: '32px',
                                                color: '#042241',
                                            }}
                                        >
                                            <i
                                                className='bx bxl-pinterest'
                                                style={{ fontSize: '26px' }}
                                            ></i>
                                        </a>
                                        <a
                                            href='https://www.linkedin.com/company/escola-sorvete'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            style={{
                                                marginRight: '32px',
                                                color: '#042241',
                                            }}
                                        >
                                            <i
                                                className='bx bxl-linkedin'
                                                style={{ fontSize: '26px' }}
                                            ></i>
                                        </a>
                                        <a
                                            href='https://es-la.facebook.com/escolasorvete/'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            style={{
                                                marginRight: '32px',
                                                color: '#042241',
                                            }}
                                        >
                                            <i
                                                className='bx bxl-facebook'
                                                style={{ fontSize: '26px' }}
                                            ></i>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className='col-lg-6 col-md-12'>
                                <div className='view-all-courses-image'>
                                    <img
                                        src='/images/unnamed.webp'
                                        alt='image'
                                        style={{ borderRadius: '10px' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='shape1'>
                        <img src='/images/shape1.png' alt='image' />
                    </div>
                    <div className='shape9'>
                        <img src='/images/shape8.svg' alt='image' />
                    </div>
                </div>
            )}
        </>
    );
};

export default ViewAllCourses;
