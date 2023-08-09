import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CarouselImages from '../CarouselImages/CarouselImages';
import { useTranslation } from 'next-i18next';

const AboutUs = () => {
    const { t } = useTranslation();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <>
            {isMounted && (
                <div className='about-area bg-fef8ef ptb-100'>
                    <div className='container'>
                        <div className='row align-items-center'>
                            <div className='col-lg-6 col-md-12'>
                                <div className='about-image'>
                                    <CarouselImages />
                                </div>
                            </div>

                            <div className='col-lg-6 col-md-12'>
                                <div className='about-content'>
                                    <span className='sub-title'>
                                        {t('about-us-title', {
                                            defaultValue: 'Online Learning',
                                        })}
                                    </span>
                                    <h2>
                                        {t('about-us-title-long', {
                                            defaultValue:
                                                'Learn from wherever you are about all types of ice cream and if you want more, you get an in-person practical class! Check out our plans',
                                        })}
                                    </h2>
                                    <p>
                                        {t('about-us-text', {
                                            defaultValue:
                                                'We believe that online learning can democratize knowledge and contribute to the transformation that the ice cream market so desperately needs. Are you ready to join us in this revolution?',
                                        })}
                                    </p>

                                    <ul className='features-list'>
                                        <li>
                                            <span>
                                                <i className='flaticon-experience'></i>{' '}
                                                {t('about-us-span1', {
                                                    defaultValue:
                                                        'Specialized teachers',
                                                })}
                                            </span>
                                        </li>
                                        <li>
                                            <span>
                                                <i className='flaticon-time-left'></i>{' '}
                                                {t('about-us-span2', {
                                                    defaultValue:
                                                        'Certificate upon completion',
                                                })}
                                            </span>
                                        </li>
                                        <li>
                                            <span>
                                                <i className='flaticon-tutorials'></i>{' '}
                                                {t('about-us-span3', {
                                                    defaultValue:
                                                        'Remote Learning',
                                                })}
                                            </span>
                                        </li>
                                        <li>
                                            <span>
                                                <i className='flaticon-self-growth'></i>{' '}
                                                {t('about-us-span4', {
                                                    defaultValue:
                                                        'Self Development',
                                                })}
                                            </span>
                                        </li>
                                    </ul>

                                    <Link href='/courses'>
                                        <a className='default-btn'>
                                            <i className='flaticon-user'></i>{' '}
                                            {t('about-us-button', {
                                                defaultValue:
                                                    'View all courses',
                                            })}{' '}
                                            <span></span>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='shape4'>
                        <img
                            src='/planet2.png'
                            alt='image'
                            className='navbar-logo'
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default AboutUs;
