import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import BannerCourses from './BannerCourses';

const MainBanner = ({ user, courses }) => {
    const { t } = useTranslation();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <>
            {isMounted && (
                <div className='main-banner'>
                    <div className='container-fluid'>
                        <div className='row align-items-center'>
                            <div className='col-lg-6 col-md-12'>
                                <div className='main-banner-content'>
                                    <h1>
                                        {t('main-banner-title', {
                                            defaultValue:
                                                'The easiest way to make real ice cream.',
                                        })}
                                    </h1>
                                    <p>
                                        {t('main-banner-text', {
                                            defaultValue:
                                                'Entrepreneurial practical and technical training to teach you how to produce natural and artisanal ice creams from scratch, valuing Brazilian regionalities and teaching you to have autonomy in your business.',
                                        })}
                                    </p>

                                    <motion.div whileTap={{ scale: 0.9 }}>
                                        {user ? (
                                            <Link href='/courses'>
                                                <a className='default-btn'>
                                                    <i className='flaticon-user'></i>{' '}
                                                    {t(
                                                        'main-banner-button-one',
                                                        {
                                                            defaultValue:
                                                                'Access your free class',
                                                        }
                                                    )}{' '}
                                                    <span></span>
                                                </a>
                                            </Link>
                                        ) : (
                                            <Link href='/authentication'>
                                                <a className='default-btn'>
                                                    <i className='flaticon-user'></i>{' '}
                                                    {t(
                                                        'main-banner-button-two',
                                                        {
                                                            defaultValue:
                                                                'Join for free',
                                                        }
                                                    )}{' '}
                                                    <span></span>
                                                </a>
                                            </Link>
                                        )}
                                    </motion.div>
                                </div>
                            </div>

                            <div className='col-lg-6 col-md-12'>
                                <div className='main-banner-courses-list'>
                                    <div className='row'>
                                        {courses &&
                                            courses.map((course) => (
                                                <BannerCourses
                                                    key={course.id}
                                                    {...course}
                                                />
                                            ))}
                                    </div>

                                    <div className='banner-shape1'>
                                        <img
                                            src='/planeta-removebg-preview.png'
                                            alt='image'
                                            className='navbar-logo shape-moving'
                                        />
                                    </div>
                                    <div className='banner-shape2'>
                                        <img
                                            src='/planet2.png'
                                            alt='image'
                                            className='navbar-logo shape-moving'
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

export default MainBanner;
