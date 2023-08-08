import React from 'react';
import Navbar from '../components/_App/Navbar';
import PageBanner from '../components/Common/PageBanner';
import FranciscoComponent from '../components/Francisco/FranciscoComponent';
import CourseAdvisor from '../components/Common/CourseAdvisor';
import Footer from '../components/_App/Footer';
import SupportButton from '@/components/ContactUs/SupportBtn';
import TopBanner from '@/components/TopBanner/TopBanner';
import SubscribeForm from '@/components/Common/SubscribeForm';

export default function Francisco({ user }) {
    return (
        <>
            {/* WHATSAPP BUTTON  */}
            <SupportButton />
            {/* TOP BANNER */}
            <TopBanner />

            <Navbar user={user} />

            {/* <PageBanner
                pageTitle='Francisco Santana'
                homePageUrl='/'
                homePageText='Home'
                activePageText='Francisco Santana'
            /> */}

            {/* FRANCISCO HISTORIA */}
            <FranciscoComponent />

            {/* EQUIPO */}
            {/* ESPERANDO A MALU QUE ENVIE DATOS DEL TEAM */}
            {/* <CourseAdvisor /> */}
            <SubscribeForm />

            <Footer />
        </>
    );
}
