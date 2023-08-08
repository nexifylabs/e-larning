import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const iceCreams = [
    { id: 1, width: 50, duration: 8, left: '20%', top: '10%' },
    { id: 2, width: 60, duration: 10, left: '60%', top: '20%' },
    { id: 3, width: 25, duration: 30, left: '10%', top: '30%' },
    { id: 4, width: 40, duration: 18, left: '40%', top: '15%' },
    { id: 5, width: 50, duration: 20, left: '15%', top: '70%' },
    { id: 6, width: 40, duration: 20, left: '25%', top: '70%' },
    // { id: 7, width: 30, duration: 20, left: '45%', top: '70%' },
    { id: 8, width: 25, duration: 20, left: '65%', top: '70%' },
    { id: 9, width: 30, duration: 20, left: '75%', top: '70%' },
    { id: 10, width: 25, duration: 20, left: '85%', top: '70%' },
    { id: 11, width: 30, duration: 20, left: '90%', top: '70%' },
    { id: 12, width: 20, duration: 20, left: '95%', top: '70%' },
    { id: 13, width: 30, duration: 20, left: '2%', top: '70%' },
    { id: 14, width: 70, duration: 20, left: '5%', top: '30%' },
    { id: 15, width: 30, duration: 20, left: '97%', top: '20%' },
    { id: 16, width: 25, duration: 20, left: '8%', top: '10%' },
];

const PaymentStatus = () => {
    const { t } = useTranslation();
    const [isMounted, setIsMounted] = React.useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <>
            {isMounted && (
                <div className='bluemoon'>
                    <div className='content-container'>
                        <img src='/logo-horizontal.png' />
                        <p class='title'>
                            {t('paymentStatusPage-Title', {
                                defaultValue: 'Gracias por tu compra!',
                            })}
                        </p>
                        <br />
                        <p class='subtitle'>
                            {t('paymentStatusPage-SubTitle1', {
                                defaultValue:
                                    'En el mail te tiene que estar llegando la info del curso que compraste porfavor revisalo.',
                            })}
                        </p>
                        <p class='subtitle'>
                            {t('paymentStatusPage-SubTitle2', {
                                defaultValue:
                                    'Para continuar con tu compra, porfavor revisa tu correo electronico.',
                            })}
                        </p>{' '}
                        {/* Added text */}
                        <div align='center'>
                            <Link href='/learning/my-courses/'>
                                <a class='btn-back' href='#'>
                                    {t('paymentStatusPage-Button', {
                                        defaultValue: 'Ir a mis cursos',
                                    })}
                                </a>
                            </Link>
                            <Link href='/checkout/'>
                                <a class='btn-back' href='#'>
                                    {t('paymentStatusPage-Button2', {
                                        defaultValue: 'Volver al checkout',
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

export default PaymentStatus;
