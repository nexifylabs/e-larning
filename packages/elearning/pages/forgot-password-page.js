import React from 'react';
import Navbar from '@/components/_App/Navbar';
import ForgotPassComponent from '@/components/Authentication/ForgotPassComponent';
import Footer from '@/components/_App/Footer';
import SupportButton from '@/components/ContactUs/SupportBtn';
import TopBanner from '@/components/TopBanner/TopBanner';
import SubscribeForm from '@/components/Common/SubscribeForm';

export default function ForgotPasswordPage({ user }) {
    return (
        <>
            <SupportButton />

            <TopBanner />

            <Navbar user={user} />

            <ForgotPassComponent />

            <Footer />
        </>
    );
}
