import React from 'react';
import Navbar from '@/components/_App/Navbar';
import Footer from '@/components/_App/Footer';
import Link from 'next/link';
import CourseCreateForm from '@/components/Instructor/CourseCreateForm';
import SupportButton from '@/components/ContactUs/SupportBtn';
import TopBanner from '@/components/TopBanner/TopBanner';
import SubscribeForm from '@/components/Common/SubscribeForm';

const Create = ({ user }) => {
    return (
        <>
            <SupportButton />

            <TopBanner />

            <Navbar user={user} />

            <div className='ptb-100'>
                <div className='container'>
                    <h2 className='fw-bold mb-4'>Create the Course</h2>

                    <ul className='nav-style1'>
                        <li>
                            <Link href='/instructor/courses/'>
                                <a>Courses</a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/instructor/course/create/'>
                                <a className='active'>Create a Course</a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/instructor/subscriptions/subscriptioncreate/'>
                                <a>Create Subscription</a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/instructor/course/create-class/'>
                                <a>Create Class Room</a>
                            </Link>
                        </li>
                    </ul>

                    <div className='create-course-form'>
                        <CourseCreateForm />
                    </div>
                </div>
            </div>

            <SubscribeForm />

            <Footer />
        </>
    );
};

export default Create;
