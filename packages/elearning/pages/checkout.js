import React, { useState, useEffect } from 'react';

// INTERNALS
import Navbar from '@/components/_App/Navbar';
import CheckoutForm from '@/components/Checkout/CheckoutForm';
import PaymentField from '@/components/PaymentField/PaymentField';
import TopBanner from '@/components/TopBanner/TopBanner';
import SubscribeForm from '@/components/Common/SubscribeForm';
import Footer from '@/components/_App/Footer';
import SnackBar from '@/components/SnackBar/SnackBar';
import SupportButton from '@/components/ContactUs/SupportBtn';

export default function CheckoutPage({ user }) {
    const [showChackoutPopUp, setShowChackoutPopUp] = useState(true);
    const [isPaymentFormComplete, setIsPaymentFormComplete] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleCloseCheckOutPopUP = () => {
        setShowChackoutPopUp(false);
    };

    const handleShowCheckOutPopUP = () => {
        setShowChackoutPopUp(true);
    };

    return (
        <>
            <TopBanner />

            <Navbar user={user} />

            <SupportButton />

            <SnackBar />

            <div
                style={{
                    display: isMobile ? 'block' : 'flex',
                }}
            >
                <PaymentField
                    user={user}
                    onFormComplete={setIsPaymentFormComplete}
                />

                <hr className='payment-field-border' />

                <CheckoutForm
                    user={user}
                    onButtonClick={handleShowCheckOutPopUP}
                    isPaymentFormComplete={isPaymentFormComplete}
                />
            </div>

            <Footer />
        </>
    );
}
