import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import baseUrl from '@/utils/baseUrl';
import { useTranslation } from 'next-i18next';

const SocialShareBtns = () => {
    const router = useRouter();
    const { slug } = router.query;

    const { t } = useTranslation();
    const [isMounted, setIsMounted] = React.useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <>
            {isMounted && (
                <div className='courses-share'>
                    <div className='share-info'>
                        <span>
                            {t('course-page-details-share-this-course', {
                                defaultValue: 'Share This Course',
                            })}{' '}
                            <i className='flaticon-share'></i>
                        </span>

                        <ul className='social-link'>
                            <li>
                                <a
                                    href='https://www.facebook.com/escolasorvete'
                                    className='d-block'
                                    target='_blank'
                                >
                                    <i className='bx bxl-facebook'></i>
                                </a>
                            </li>
                            <li>
                                <a
                                    href='https://www.instagram.com/escolasorvete/'
                                    className='d-block'
                                    target='_blank'
                                >
                                    <i className='bx bxl-instagram'></i>
                                </a>
                            </li>

                            <li>
                                <a
                                    href='https://www.linkedin.com/company/escola-sorvete/mycompany/'
                                    className='d-block'
                                    target='_blank'
                                >
                                    <i className='bx bxl-linkedin'></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};

export default SocialShareBtns;
