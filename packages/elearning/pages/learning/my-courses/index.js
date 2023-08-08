import React, {useEffect, useState} from 'react';
import Navbar from '@/components/_App/Navbar';
import Footer from '@/components/_App/Footer';
import Link from 'next/link';
import toast from 'react-hot-toast';
import axios from 'axios';
import {parseCookies} from 'nookies';
import baseUrl from '@/utils/baseUrl';
import GeneralLoader from '@/utils/GeneralLoader';
import CourseCard from '@/components/Learning/CourseCard';
import SupportButton from '@/components/ContactUs/SupportBtn';
import TopBanner from '@/components/TopBanner/TopBanner';
import DisabledCourseCard from "@/components/Learning/DisabledCourseCard";
import {progress} from "@/utils/helper";
import {useTranslation} from 'next-i18next';

const Index = ({user}) => {
    const {elarniv_users_token} = parseCookies();
    const [enrolments, setEnrolments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [progresses, setProgresses] = useState([]);


    const {t} = useTranslation();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const fetchEnrols = async () => {
            setLoading(true);
            const payload = {
                headers: {Authorization: elarniv_users_token},
            };
            const response = await axios.get(`${baseUrl}/api/learnings`, payload);

            const array = []

            // console.log(response.data.enrolments)
            for (const enrol of response.data.enrolments.sort((a, b) => a.course.orderNumber - b.course.orderNumber)) {
                const payload = {
                    params: {userId: user.id, courseId: enrol.course.id},
                };
                const url = `${baseUrl}/api/learnings/progress`;
                const response = await axios.get(url, payload);


                array.push({
                    courseProgresses: response.data.courseProgress.length, totalVideos: response.data.totalVideos
                })


            }
            setProgresses(array)

            setEnrolments(response.data.enrolments);

            setLoading(false);
        };

        fetchEnrols();
    }, []);


    return (<>
            <SupportButton/>

            <TopBanner/>

            <Navbar user={user}/>
            {isMounted && (<div className='ptb-100'>
                    <div className='container'>
                        <h2 className='fw-bold mb-4'>
                            {t('my-learning-page-my-learning', {
                                defaultValue: 'My learning',
                            })}
                        </h2>

                        <ul className='nav-style1 hover-mylearning'>
                            <li>
                                <Link href='/learning/my-courses/'>
                                    <a className='active'>
                                        {t('my-learning-page-all-courses', {
                                            defaultValue: 'All Courses',
                                        })}
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href='/learning/wishlist/'>
                                    <a>
                                        {t('my-learning-page-wishlist', {
                                            defaultValue: 'Wishlist',
                                        })}
                                    </a>
                                </Link>
                            </li>
                        </ul>

                        <div className='row'>
                            {loading ? (<GeneralLoader/>) : (<>
                                {enrolments && enrolments
                                    .sort((a, b) => a.course.orderNumber - b.course.orderNumber)
                                    .map((enrol) => {

                                        // console.log(progresses[0].courseProgresses)

                                        return user.isSub && enrol.course.orderNumber > 1 && progress(progresses[enrol.course.orderNumber - 2].courseProgresses, progresses[enrol.course.orderNumber - 2].totalVideos) < 100 ?
                                            <DisabledCourseCard
                                                key={enrol.id}
                                                {...enrol}
                                            /> : <CourseCard
                                                key={enrol.id}
                                                {...enrol}
                                            />
                                    })}
                            </>)}
                        </div>
                    </div>
                </div>
            )}

            <Footer/>
        </>
    )
}

export default Index;
