import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import SupportButton from '@/components/ContactUs/SupportBtn';
import { useRouter } from 'next/router';
import baseUrl from '@/utils/baseUrl';
import { parseCookies } from 'nookies';
import axios from 'axios';

const iceCreams = [
    { id: 1, width: 50, duration: 8, left: '20%', top: '10%' },
    { id: 2, width: 60, duration: 10, left: '60%', top: '20%' },
    { id: 3, width: 25, duration: 30, left: '10%', top: '30%' },
    { id: 4, width: 40, duration: 18, left: '40%', top: '15%' },
    { id: 5, width: 50, duration: 20, left: '15%', top: '70%' },
    { id: 6, width: 40, duration: 20, left: '25%', top: '70%' },
    { id: 8, width: 25, duration: 20, left: '65%', top: '70%' },
    { id: 9, width: 30, duration: 20, left: '75%', top: '70%' },
    { id: 10, width: 25, duration: 20, left: '85%', top: '70%' },
    { id: 13, width: 30, duration: 20, left: '2%', top: '70%' },
    { id: 14, width: 70, duration: 20, left: '5%', top: '30%' },
    { id: 16, width: 25, duration: 20, left: '8%', top: '10%' },
];

const PaymentSuccessful = ({ user }) => {
    const { t } = useTranslation();
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();
    const { elarniv_users_token } = parseCookies();
    const [hasRun, setHasRun] = useState(false);
    const hasRunRef = useRef(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <>
            <SupportButton />
            {isMounted && (
                <div className='bluemoon2'>
                    <div className='content-container'>
                        <img src='/logo-horizontal.png' />
                        <p class='title'>
                            {t('paymentSuccess-Title', {
                                defaultValue: 'Thanks for your purchase!',
                            })}
                        </p>
                        <br />
                        <p class='subtitle'>
                            {t('paymentSuccess-SubTitle1', {
                                defaultValue:
                                    'You can now see your purchased courses on My Learnings tab.',
                            })}
                        </p>
                        <p class='subtitle'>
                            {t('paymentSuccess-SubTitle2', {
                                defaultValue:
                                    'To see your courses enter the button below.',
                            })}
                        </p>{' '}
                        {/* Added text */}
                        <div align='center'>
                            <Link href='/learning/my-courses/'>
                                <a class='btn-back' href='#'>
                                    {t('paymentSuccess-Button', {
                                        defaultValue: 'My Courses',
                                    })}
                                </a>
                            </Link>
                            <Link href='/checkout/'>
                                <a class='btn-back' href='#'>
                                    {t('paymentSuccess-Button2', {
                                        defaultValue: 'Back to home',
                                    })}
                                </a>
                            </Link>
                        </div>
                    </div>

                    {iceCreams.map((iceCream) => (
                        <img
                            key={iceCream.id}
                            src='https://media.discordapp.net/attachments/1076613189795586122/1083484472491655319/sorvete-logo.png'
                            alt={`Ice Cream ${iceCream.id}`}
                            className='falling-ice-cream'
                            style={{
                                width: iceCream.width,
                                animationDuration: `${iceCream.duration}s`,
                                left: iceCream.left,
                                top: iceCream.top,
                            }}
                        />
                    ))}
                </div>
            )}
        </>
    );
};

export default PaymentSuccessful;
