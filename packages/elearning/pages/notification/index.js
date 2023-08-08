import React from 'react';
import Navbar from '@/components/_App/Navbar';
import Footer from '@/components/_App/Footer';
import SupportButton from '@/components/ContactUs/SupportBtn';
import TopBanner from '@/components/TopBanner/TopBanner';
import NotificationsList from "@/components/Notification/NotificationsList";

export default function NotificationPage({ user }) {
    return (
        <>
            <SupportButton />

            <TopBanner />

            <Navbar user={user} />

            <NotificationsList user={user} />

            <Footer />
        </>
    );
}
