import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import baseUrl from '@/utils/baseUrl';
import CourseCard from '../Courses/CourseCard';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'next-i18next';

const PopularCourses = ({ user }) => {
    const { t } = useTranslation();
    const [isMounted, setIsMounted] = useState(false);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const fetchCourses = async () => {
        const payload = {
            params: {
                page: 1,
                limit: 3,
                short: '',
                search: '',
            },
        };

        const response = await axios.get(`${baseUrl}/api/all-courses`, payload);
        setCourses(response.data.courses);
        // console.log(response.data.courses);
    };
    useEffect(() => {
        fetchCourses();
    }, []);

    const handleFav = async (courseId, fav) => {
        if (!user) {
            toast.error('Need to login first.', {
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
            return;
        }
        try {
            const payload = {
                userId: user.id,
                courseId: courseId,
                fav: fav,
            };
            const url = `${baseUrl}/api/favourites/new`;
            const response = await axios.post(url, payload);

            toast.success(response.data.message, {
                style: {
                    border: '1px solid #42ba96',
                    padding: '16px',
                    color: '#42ba96',
                },
                iconTheme: {
                    primary: '#42ba96',
                    secondary: '#ffffff',
                },
            });
        } catch (err) {
            console.log(err.response);
        }
    };

    return (
        <>
            {isMounted && (
                <div className='courses-area ptb-100'>
                    <div className='container'>
                        <div className='section-title'>
                            <span className='sub-title'>
                                {t('popular-span', {
                                    defaultValue: 'Start here',
                                })}
                            </span>
                            <h2>
                                {t('popular-title', {
                                    defaultValue: 'Dont know where to start?',
                                })}
                            </h2>
                            <p>
                                {t('popular-text', {
                                    defaultValue:
                                        'Discover our basic courses to become an ice cream maker. We guarantee you wont want to stop.',
                                })}
                            </p>
                        </div>

                        <div className='row'>
                            {courses &&
                                courses.map((course) => (
                                    <CourseCard
                                        key={course.id}
                                        {...course}
                                        onFav={() => handleFav(course.id, true)}
                                        onUnFav={() =>
                                            handleFav(course.id, false)
                                        }
                                        userId={user && user.id}
                                    />
                                ))}

                            {/* <div className='col-lg-12 col-md-12'>
                                <div className='courses-info'>
                                    <p style={{ fontSize: '20px' }}>
                                        {t('popular-text-2', {
                                            defaultValue:
                                                'Dive deep into a specific topic or explore the entire universe of ice cream making. Here, you can customize your curriculum and choose what is best for your business.',
                                        })}{' '}
                                        {!user && (
                                            <Link href='/authentication'>
                                                <a>
                                                    {t('popular-register', {
                                                        defaultValue:
                                                            'Register Free Now!',
                                                    })}
                                                </a>
                                            </Link>
                                        )}
                                    </p>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PopularCourses;
