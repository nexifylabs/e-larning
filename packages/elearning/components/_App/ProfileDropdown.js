import React, { useEffect, useState } from 'react';
import Link from '@/utils/ActiveLink';
import { handleLogout } from '@/utils/auth';
import { useTranslation } from 'next-i18next';

const ProfileDropdown = ({
    userId,
    first_name,
    email,
    role,
    profile_photo,
}) => {
    const isAdmin = role === 'admin';
    const isInstructor = role === 'instructor';
    const isStudent = role === 'student';

    const { t } = useTranslation();
    const [isMounted, setIsMounted] = React.useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <>
            {isMounted && (
                <div className='dropdown profile-dropdown'>
                    <div className='img ptb-15'>
                        {profile_photo ? (
                            <img src={profile_photo} alt={first_name} />
                        ) : (
                            <img src='/images/avatar.jpg' alt={first_name} />
                        )}
                    </div>
                    <ul className='dropdown-menu'>
                        <li>
                            <Link href='/profile/basic-information/'>
                                <a className='dropdown-item author-dropdown-item'>
                                    <div className='d-flex align-items-center'>
                                        <div className='img'>
                                            {profile_photo ? (
                                                <img
                                                    src={profile_photo}
                                                    alt={first_name}
                                                />
                                            ) : (
                                                <img
                                                    src='/images/avatar.jpg'
                                                    alt={first_name}
                                                />
                                            )}
                                        </div>

                                        <span className='ps-3'>
                                            <span className='fw-semibold fs-16 mb-1 d-block'>
                                                {first_name}
                                            </span>
                                            <span className='d-block fs-13 mt-minus-2'>
                                                {email}
                                            </span>
                                        </span>
                                    </div>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <hr className='dropdown-divider' />
                        </li>

                        {isInstructor && (
                            <>
                                <li>
                                    <Link href='/instructor/courses'>
                                        <a className='dropdown-item'>
                                            <i className='bx bx-book'></i>
                                            {t('profile-dropdown-nav-courses', {
                                                defaultValue: 'My Courses',
                                            })}
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/instructor/course/create'>
                                        <a className='dropdown-item'>
                                            <i className='bx bx-folder-plus'></i>
                                            {t(
                                                'profile-dropdown-nav-create-new',
                                                {
                                                    defaultValue:
                                                        'Create New Course',
                                                }
                                            )}
                                        </a>
                                    </Link>
                                </li>
                            </>
                        )}
                        {isAdmin && (
                            <li>
                                <Link href='/admin'>
                                    <a className='dropdown-item'>
                                        <i className='bx bxs-dashboard'></i>
                                        {t('profile-dropdown-nav-my-dash', {
                                            defaultValue: 'My Dashboard',
                                        })}
                                    </a>
                                </Link>
                            </li>
                        )}

                        <li>
                            <Link href='/learning/my-courses/'>
                                <a className='dropdown-item'>
                                    <i className='bx bx-book'></i>
                                    {t('profile-dropdown-nav-my-lear-student', {
                                        defaultValue: 'My learning',
                                    })}
                                </a>
                            </Link>
                        </li>

                        <li>
                            <Link href='/learning/wishlist/'>
                                <a className='dropdown-item'>
                                    <i className='bx bxs-heart'></i>
                                    {t('profile-dropdown-nav-my-wishlist', {
                                        defaultValue: 'Wishlist',
                                    })}
                                </a>
                            </Link>
                        </li>

                        <li>
                            <Link href='/profile/basic-information/'>
                                <a className='dropdown-item'>
                                    <i className='bx bxs-user-account'></i>{' '}
                                    {t('profile-dropdown-nav-acc-settings', {
                                        defaultValue: 'Account settings',
                                    })}
                                </a>
                            </Link>
                        </li>
                        <li>
                            <hr className='dropdown-divider' />
                        </li>
                        <li>
                            <button
                                type='submit'
                                onClick={handleLogout}
                                className='dropdown-item'
                            >
                                <i className='bx bx-log-out'></i>{' '}
                                {t('profile-dropdown-nav-log-out', {
                                    defaultValue: 'Log out',
                                })}
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
};

export default ProfileDropdown;
