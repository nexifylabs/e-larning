import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import CoursesDetailsSidebar from './CoursesDetailsSidebar';
import CourseOverview from '../Learning/CourseOverview';
import CourseVideo from '../Course/CourseVideo';
import WhatYouWillLearn from '../Course/WhatYouWillLearn';
import Requirements from '../Course/Requirements';
import WhoIsThisCourseFor from '../Course/WhoIsThisCourseFor';
import InstructorProfile from '../Course/InstructorProfile';
import { formatDate } from '@/utils/helper';
import BuyCourseBtn from './BuyCourseBtn';
import { useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';
//

const CoursesDetailsContent = ({ user: current_user, course }) => {
    const {
        slug,
        short_desc,
        image,
        overview,
        what_you_will_learn,
        who_is_this_course_for,
        requirements,
        latest_price,
        is_class,
        updated_at,
        category,
        user,
        enrolments,
    } = course;
    const discount = useSelector((state) => state.cart.discount);

    const { t } = useTranslation();
    const [isMounted, setIsMounted] = React.useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <>
            {isMounted && (
                <div className='courses-details-area ptb-100'>
                    <div className='container'>
                        <div className='courses-details-header'>
                            <div className='row align-items-center'>
                                <div className='col-lg-8 col-md-12'>
                                    <div className='courses-title'>
                                        <p
                                            style={{
                                                color: '#CE417D',
                                                textTransform: 'uppercase',
                                                fontWeight: 'bold',
                                                fontSize: '14px',
                                                textDecoration: 'underline',
                                            }}
                                        >
                                            {short_desc}
                                        </p>
                                    </div>
                                    {/* <div className='courses-meta'>
                                        <ul>
                                            <li>
                                                <i className='bx bx-folder-open'></i>
                                                <span>
                                                    {t('course-page-span', {
                                                        defaultValue:
                                                            'Category',
                                                    })}
                                                </span>
                                                {category && (
                                                    <Link
                                                        href={`/category/${category.slug}`}
                                                    >
                                                        <a>{category.name}</a>
                                                    </Link>
                                                )}
                                            </li>

                                            <li>
                                                <i className='bx bx-calendar'></i>
                                                <span>
                                                    {t('course-page-span3', {
                                                        defaultValue:
                                                            'Last Updated',
                                                    })}
                                                </span>
                                                <Link href='#'>
                                                    <a>
                                                        {formatDate(updated_at)}
                                                    </a>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div> */}
                                </div>

                                <div className='col-lg-4 col-md-12'>
                                    <div className='courses-price'>
                                        <div className='price'>
                                            $
                                            {discount > 0
                                                ? discount
                                                : latest_price}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-lg-8 col-md-12'>
                                <div className='courses-details-image-style-two text-center'>
                                    <img src={image} alt='image' />
                                </div>

                                <div className='courses-details-desc-style-two'>
                                    <h3>
                                        {t('course-page-h3', {
                                            defaultValue: 'Description',
                                        })}
                                    </h3>
                                    <CourseOverview overview={overview} />

                                    {/* {!is_class && (
                                        <>
                                            <h3>
                                                {t('course-page-h31', {
                                                    defaultValue:
                                                        'Courses Video',
                                                })}
                                            </h3>
                                            {slug && (
                                                <CourseVideo
                                                    courseSlug={slug}
                                                />
                                            )}
                                        </>
                                    )} */}

                                    <WhatYouWillLearn
                                        what_you_will_learn={
                                            what_you_will_learn
                                        }
                                    />

                                    <Requirements requirements={requirements} />

                                    <WhoIsThisCourseFor
                                        who_is_this_course_for={
                                            who_is_this_course_for
                                        }
                                    />
                                    {user && (
                                        <InstructorProfile instructor={user} />
                                    )}
                                </div>
                            </div>

                            <div className='col-lg-4 col-md-12'>
                                <CoursesDetailsSidebar
                                    current_user={current_user}
                                    course={course}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CoursesDetailsContent;
