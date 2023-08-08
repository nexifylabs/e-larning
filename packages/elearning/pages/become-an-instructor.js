import React, { useEffect } from 'react';
import Navbar from '@/components/_App/Navbar';
import PageBanner from '@/components/Common/PageBanner';
import SubscribeForm from '@/components/Common/SubscribeForm';
import FunFactsThree from '@/components/Common/FunFactsThree';
import ApplyAsInstructor from '@/components/BecomeAInstructor/ApplyAsInstructor';
import RegisterForm from '@/components/BecomeAInstructor/RegisterForm';
import Footer from '@/components/_App/Footer';
import { useRouter } from 'next/router';
import SupportButton from '@/components/ContactUs/SupportBtn';
import TopBanner from '@/components/TopBanner/TopBanner';

export default function BecomeAInstructorPage({ user }) {
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/authentication');
        }
    }, []);

    return (
        <>
            <SupportButton />

            <TopBanner />

            <Navbar user={user} />

            <PageBanner
                pageTitle='Na Mídia'
                homePageUrl='/'
                homePageText='Home'
                activePageText='Na Mídia'
            />

            <RegisterForm user={user} />

            <ApplyAsInstructor />

            <div className='pb-100'>
                <FunFactsThree />
            </div>

            <SubscribeForm />

            <Footer />
        </>
    );
}
