import React from 'react';
import Navbar from '@/components/_App/Navbar';
import PageBanner from '@/components/Common/PageBanner';
import ForgotPasswordForm from '@/components/Authentication/ForgotPasswordForm';
import Footer from '@/components/_App/Footer';
import SupportButton from '@/components/ContactUs/SupportBtn';
import TopBanner from '@/components/TopBanner/TopBanner';
import SubscribeForm from '@/components/Common/SubscribeForm';

export default function ForgotPasswordPage() {
    return (
        <>
            <SupportButton />

            <TopBanner />

            <Navbar user={user} />

            <PageBanner
                pageTitle='Forgot Password'
                homePageUrl='/'
                homePageText='Home'
                activePageText='Forgot Password'
            />

            <ForgotPasswordForm />

            <SubscribeForm />

            <Footer />
        </>
    );
}
