import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const BannerCourses = ({
    title,
    slug,
    short_desc,
    latest_price,
    before_price,
    lessons,
    image,
    user,
    enrolments,
}) => {
    const { t } = useTranslation();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <>
            {isMounted && (
                <div className='col-md-6'>
                    <div className='single-courses-box'>
                        <div className='courses-image'>
                            <Link href={`/course/${slug}`}>
                                <a className='d-block image'>
                                    <img src={image} alt={title} />
                                </a>
                            </Link>

                            <>
                                {before_price > 0 && (
                                    <div className='price shadow discount-price'>
                                        <del>${before_price}</del>
                                    </div>
                                )}
                                <div className='price shadow'>
                                    <span>${latest_price}</span>
                                </div>
                            </>
                        </div>

                        <div className='courses-content'>
                            <div className='course-author d-flex align-items-center'>
                                <img
                                    src={
                                        user.profile_photo
                                            ? user.profile_photo
                                            : '/images/user6.jpg'
                                    }
                                    className='rounded-circle'
                                    alt='image'
                                />
                                <span>{`${user.first_name} ${user.last_name}`}</span>
                            </div>

                            <h3>
                                <Link href={`/course/${slug}`}>
                                    <a title={title}>{title.slice(0, 40)}...</a>
                                </Link>
                            </h3>

                            <p>{short_desc.slice(0, 108)}</p>

                            <ul className='courses-box-footer d-flex justify-content-between align-items-center'>
                                <li>
                                    <i className='flaticon-agenda'></i>{' '}
                                    {lessons}{' '}
                                    {t('bannercourses-lessons', {
                                        defaultValue: 'Lessons',
                                    })}
                                </li>
                                <li>
                                    <i className='flaticon-people'></i>{' '}
                                    {/* {enrolments && enrolments.length}{' '} */}
                                    200+{' '}
                                    {t('bannercourses-students', {
                                        defaultValue: 'Students',
                                    })}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BannerCourses;
