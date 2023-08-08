// EXTERNAL IMPORTS
import React, { useState, useEffect } from 'react';

// INTERNAL IMPORTS
import Navbar from '@/components/_App/Navbar';
import MainBanner from '@/components/eLearningSchool/MainBanner';
import Features from '@/components/eLearningSchool/Features';
import AboutUs from '@/components/eLearningSchool/AboutUs';
import PopularCourses from '@/components/eLearningSchool/PopularCourses';
import GetInstantCourses from '@/components/eLearningSchool/GetInstantCourses';
import ViewAllCourses from '@/components/eLearningSchool/ViewAllCourses';
import SubscribeForm from '@/components/Common/SubscribeForm';
import Footer from '@/components/_App/Footer';
import baseUrl from '@/utils/baseUrl';
import PopUp from '@/components/PopUp/PopUp';
import SupportButton from '@/components/ContactUs/SupportBtn';
import TopBanner from '@/components/TopBanner/TopBanner';
import FunFacts from '@/components/eLearningSchool/FunFacts';

function Index({ courses, user }) {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!sessionStorage.getItem('popupShown')) {
                setShowPopup(true);
                sessionStorage.setItem('popupShown', true);
            }
        }, 30000);

        return () => clearTimeout(timeout);
    }, []);

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <>
            {/* POP UP HOME, DISCOUNT CODE FORM */}
            {showPopup && <PopUp onClose={handleClosePopup} />}

            {/* TOP BANNER */}
            <TopBanner />

            {/* WHATSAPP BUTTON */}
            <SupportButton />

            {/* NAVBAR */}
            <Navbar user={user} />

            {/* MAINBANNER */}
            <MainBanner user={user} courses={courses} />

            {/* CARDS WITH INFO */}
            <Features />

            {/* PIC SLIDER */}
            <AboutUs />

            {/* POPULAR COURSES */}
            <PopularCourses user={user} />

            {/* EXPERIMENTAL CLASS FORM */}
            <GetInstantCourses user={user} />

            {/* IN THE MEDIA */}
            <ViewAllCourses />

            {/* +1500 STUDENTS */}
            <FunFacts />

            {/* NEWSLETTER SUBS */}
            <SubscribeForm />

            {/* FOOTER */}
            <Footer />
        </>
    );
}

export async function getServerSideProps() {
    const res = await fetch(`${baseUrl}/api/home-banner`);
    const { courses } = await res.json();

    return { props: { courses } };
}

export default Index;
