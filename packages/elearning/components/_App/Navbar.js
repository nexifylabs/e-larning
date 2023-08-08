import React, { useEffect, useRef, useState } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import { motion } from 'framer-motion';
import Link from '@/utils/ActiveLink';
import ProfileDropdown from './ProfileDropdown';
import Cart from './Cart';
import SearchForm from './SearchForm';
import { useTranslation } from 'next-i18next';
import NotificationIcon from './NotificationIcon';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const Navbar = ({ user }) => {
    const { t } = useTranslation();
    const [menu, setMenu] = React.useState(true);
    const [isMounted, setIsMounted] = React.useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const toggleNavbar = () => {
        setMenu(!menu);
    };

    const navbarRef = useRef(null);

    React.useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 170) {
                navbarRef.current.classList.add('is-sticky');
            } else {
                navbarRef.current.classList.remove('is-sticky');
            }
        };
        document.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const classOne = menu
        ? 'collapse navbar-collapse'
        : 'collapse navbar-collapse show';
    const classTwo = menu
        ? 'navbar-toggler navbar-toggler-right collapsed'
        : 'navbar-toggler navbar-toggler-right';

    return (
        <>
            {isMounted && (
                <div id='navbar' className='navbar-area' ref={navbarRef}>
                    <div className='edemy-nav'>
                        <div className='container-fluid'>
                            <div className='navbar navbar-expand-lg navbar-light'>
                                <Link href='/'>
                                    <a
                                        onClick={toggleNavbar}
                                        className='navbar-brand'
                                    >
                                        <img
                                            src='/logo07.png'
                                            alt='logo'
                                            className='navbar-logo'
                                        />
                                    </a>
                                </Link>

                                <button
                                    onClick={toggleNavbar}
                                    className={classTwo}
                                    type='button'
                                >
                                    <span className='icon-bar top-bar'></span>
                                    <span className='icon-bar middle-bar'></span>
                                    <span className='icon-bar bottom-bar'></span>
                                </button>

                                <div
                                    className={classOne}
                                    id='navbarSupportedContent'
                                >
                                    {/* Creo que el component de search seria mas util cuando haya mas cursos */}
                                    {/* <SearchForm /> */}

                                    <ul className='navbar-nav'>
                                        <motion.li
                                            className='nav-item'
                                            whileHover={{
                                                scale: 1.1,
                                                transition: { duration: 0.5 },
                                            }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <Link
                                                href='/'
                                                activeClassName='active'
                                            >
                                                <a
                                                    onClick={toggleNavbar}
                                                    className='nav-link'
                                                >
                                                    {t('navHome', {
                                                        defaultValue: 'Home',
                                                    })}
                                                </a>
                                            </Link>
                                        </motion.li>

                                        <motion.li
                                            className='nav-item'
                                            whileHover={{
                                                scale: 1.1,
                                                transition: { duration: 0.5 },
                                            }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <Link
                                                href='/courses'
                                                activeClassName='active'
                                            >
                                                <a
                                                    onClick={toggleNavbar}
                                                    className='nav-link'
                                                >
                                                    {t('navCourses', {
                                                        defaultValue: 'Courses',
                                                    })}
                                                </a>
                                            </Link>
                                        </motion.li>

                                        {/* FRANCISCO */}
                                        <motion.li
                                            className='nav-item'
                                            whileHover={{
                                                scale: 1.1,
                                                transition: { duration: 0.5 },
                                            }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <Link
                                                href='/francisco'
                                                activeClassName='active'
                                            >
                                                <a
                                                    onClick={toggleNavbar}
                                                    className='nav-link'
                                                >
                                                    {t('navTeacher', {
                                                        defaultValue:
                                                            'Chef Francisco',
                                                    })}
                                                </a>
                                            </Link>
                                        </motion.li>

                                        {/* Subscriptions */}
                                        <motion.li
                                            className='nav-item'
                                            whileHover={{
                                                scale: 1.1,
                                                transition: { duration: 0.5 },
                                            }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <Link
                                                href='/learning/sub-form/'
                                                activeClassName='active'
                                            >
                                                <a
                                                    onClick={toggleNavbar}
                                                    className='nav-link'
                                                >
                                                    {t('navSubscriptions', {
                                                        defaultValue:
                                                            'Subscriptions',
                                                    })}
                                                </a>
                                            </Link>
                                        </motion.li>
                                    </ul>
                                </div>

                                <div className='others-option d-flex align-items-center '>
                                    {/* NOTIFICATIONS COMPONENT */}
                                    {user && <NotificationIcon />}

                                    <Cart />

                                    <div className='option-item'>
                                        {user ? (
                                            <ProfileDropdown {...user} />
                                        ) : (
                                            <Link href='/authentication'>
                                                <a className='default-btn'>
                                                    <i className='flaticon-user'></i>{' '}
                                                    {t('navLoginRegister', {
                                                        defaultValue:
                                                            'Login/Register',
                                                    })}
                                                    <span></span>
                                                </a>
                                            </Link>
                                        )}
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

export default Navbar;
