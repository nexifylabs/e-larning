import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import baseUrl from '@/utils/baseUrl';
import { useTranslation } from 'next-i18next';

const CourseCard = ({
    id,
    title,
    slug,
    short_desc,
    latest_price,
    before_price,
    lessons,
    image,
    user,
    enrolments = [],
    onFav,
    onUnFav,
    userId,
}) => {
    const [fav, setfavs] = useState(false);
    const [studentCount, setStudentCount] = useState(0);
    const { t } = useTranslation();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const randomStudents = Math.floor(Math.random() * 100) + 300;
        setStudentCount(enrolments.length + randomStudents);
    }, [enrolments.length]);

    useEffect(() => {
        if (userId) {
            const payload = {
                params: {
                    userId: userId,
                    courseId: id,
                },
            };

            const url = `${baseUrl}/api/favourites/new`;
            axios.get(url, payload).then((result) => {
                setfavs(result.data);
                // console.log(result.data);
            });
        }
    }, []);
    return (
        <>
            {isMounted && (
                <div className='col-lg-4 col-md-6'>
                    <div className='single-courses-box'>
                        <div className='courses-image'>
                            <Link href={`/course/${slug}`}>
                                <a className='d-block image'>
                                    <img src={image} alt={title} />
                                </a>
                            </Link>

                            {fav ? (
                                <button
                                    className='btn fav'
                                    onClick={() => {
                                        onUnFav(id);
                                        setfavs(!fav);
                                    }}
                                >
                                    <i className='bx bxs-heart'></i>
                                </button>
                            ) : (
                                <button
                                    className='btn fav'
                                    onClick={() => {
                                        onFav(id);
                                        setfavs(!fav);
                                    }}
                                >
                                    <i className='bx bx-heart'></i>
                                </button>
                            )}

                            <>
                                {before_price > 0 && (
                                    <div className='price shadow discount-price'>
                                        <del>R${before_price}</del>
                                    </div>
                                )}
                                <div className='price shadow'>
                                    <span
                                        style={{
                                            fontSize: '14px',
                                            textAlign: 'center',
                                        }}
                                    >
                                        R${latest_price}
                                    </span>
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
                                    {t('coursecard-lessons', {
                                        defaultValue: 'Lessons',
                                    })}
                                </li>
                                <li>
                                    <i className='flaticon-people'></i>{' '}
                                    {studentCount}{' '}
                                    {t('coursecard-students', {
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

export default CourseCard;
