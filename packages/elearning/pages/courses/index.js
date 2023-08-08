import React from 'react';
import Navbar from '@/components/_App/Navbar';
import PageBanner from '@/components/Common/PageBanner';
import CoursesList from '@/components/Courses/CoursesList';
import Footer from '@/components/_App/Footer';
import SupportButton from '@/components/ContactUs/SupportBtn';
import SubscribePlanComponent from '../../components/SubscribePlan/SubscribePlanComponent';
import TopBanner from '@/components/TopBanner/TopBanner';
import GetInstantCourses from '@/components/eLearningSchool/GetInstantCourses';
import SubscribeForm from '@/components/Common/SubscribeForm';

export default function CoursesPage({ user }) {
    return (
        <>
            <SupportButton />

            <TopBanner />

            <Navbar user={user} />

            {/* <SubscribePlanComponent />

            <hr /> */}

            <CoursesList user={user} />

            {/* <GetInstantCourses user={user} /> */}

            {/* <SubscribeForm /> */}

            <Footer />
        </>
    );
}
