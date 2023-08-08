import React from 'react';
import Navbar from '../components/_App/Navbar';
import PageBanner from '../components/Common/PageBanner';
import AboutUs from '../components/AboutUs/AboutUs';
import FeedbackSliderWithFunFacts from '@/components/eLearningSchool/FeedbackSliderWithFunFacts';
import Partner from '@/components/eLearningSchool/Partner';
import Footer from '../components/_App/Footer';
import SupportButton from '@/components/ContactUs/SupportBtn';
import TopBanner from '@/components/TopBanner/TopBanner';
import SubscribeForm from '@/components/Common/SubscribeForm';

export default function AbourUsPage({ user }) {
    return (
        <>
            <SupportButton />

            <TopBanner />

            <Navbar user={user} />

            <AboutUs />

            <FeedbackSliderWithFunFacts />

            <Partner />

            <SubscribeForm />

            <Footer />
        </>
    );
}
