import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const { t } = useTranslation();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <>
            {isMounted && (
                <footer className='footer-area'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-4 col-md-6 col-sm-6'>
                                <div className='single-footer-widget'>
                                    <Link href='/'>
                                        <a className='logo'>
                                            <img
                                                src='/mainlogo.png'
                                                alt='logo'
                                                className='newsletter-img'
                                                style={{ width: '140px' }}
                                            />
                                        </a>
                                    </Link>

                                    <p style={{ color: 'black' }}>
                                        {t('footer-text', {
                                            defaultValue:
                                                'We work to train entrepreneurs with autonomy, who build sustainable businesses, who care about the environment, and highlight Brazilian diversity.',
                                        })}
                                    </p>

                                    <ul className='social-link'>
                                        <li>
                                            <a
                                                href='https://es-la.facebook.com/escolasorvete/'
                                                className='d-block'
                                                target='_blank'
                                                rel='noreferrer'
                                            >
                                                <i className='bx bxl-facebook'></i>
                                            </a>
                                        </li>

                                        <li>
                                            <a
                                                href='https://www.instagram.com/escolasorvete/'
                                                className='d-block'
                                                target='_blank'
                                                rel='noreferrer'
                                            >
                                                <i className='bx bxl-instagram'></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href='https://www.linkedin.com/company/escola-sorvete'
                                                className='d-block'
                                                target='_blank'
                                                rel='noreferrer'
                                            >
                                                <i className='bx bxl-linkedin'></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className='col-lg-2 col-md-6 col-sm-6 offset-lg-1'>
                                <div className='single-footer-widget'>
                                    <h3>
                                        {t('footer-h3', {
                                            defaultValue: 'Know more',
                                        })}
                                    </h3>
                                    <ul className='footer-links-list'>
                                        <li>
                                            <Link href='/'>
                                                <a style={{ color: 'black' }}>
                                                    {t('footer-link1', {
                                                        defaultValue: 'Home',
                                                    })}
                                                </a>
                                            </Link>
                                        </li>

                                        <li>
                                            <Link href='/courses'>
                                                <a style={{ color: 'black' }}>
                                                    {t('footer-link3', {
                                                        defaultValue: 'Courses',
                                                    })}
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href='/contact-us'>
                                                <a style={{ color: 'black' }}>
                                                    {t('footer-link4', {
                                                        defaultValue: 'Contact',
                                                    })}
                                                </a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className='col-lg-4 col-md-6 col-sm-6'>
                                <div className='single-footer-widget'>
                                    <h3>
                                        {t('footer-contact-title', {
                                            defaultValue: 'Address',
                                        })}
                                    </h3>
                                    <ul className='footer-contact-info'>
                                        <li>
                                            <i className='bx bx-map'></i>
                                            Rua Barra Funda, 209 - Barra Funda,
                                            São Paulo - SP. 01152-000
                                        </li>
                                        <li>
                                            <i className='bx bx-phone-call'></i>
                                            <a
                                                href='https://wa.me/+551138621698'
                                                target='_BLANK'
                                            >
                                                +55 (11) 3862-1698
                                            </a>
                                        </li>
                                        <li>
                                            <i className='bx bx-envelope'></i>
                                            <a href='mailto:contato@escolasorvete.com.br'>
                                                contato@escolasorvete.com.br
                                            </a>
                                        </li>
                                        <li>
                                            <i className='bx bxs-inbox'></i>
                                            <a
                                                href='https://www.instagram.com/escolasorvete/'
                                                target='_BLANK'
                                            >
                                                @escolasorvete
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className='footer-bottom-area'>
                            <div className='row align-items-center'>
                                <div className='col-lg-6 col-md-6'>
                                    <p>
                                        Copyright{' '}
                                        <i className='bx bx-copyright'></i>{' '}
                                        {currentYear}-2024 NexifyLabs. All
                                        rights reserved.
                                    </p>
                                </div>

                                <div className='col-lg-6 col-md-6'>
                                    <ul>
                                        <li>
                                            <Link href='/privacy-policy'>
                                                <a>
                                                    {t('footer-politica', {
                                                        defaultValue:
                                                            'Política de Privacidade',
                                                    })}
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href='/terms-conditions'>
                                                <a>
                                                    {t('footer-terminos', {
                                                        defaultValue:
                                                            'Termos e Condições',
                                                    })}
                                                </a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='lines'>
                        <div className='line'></div>
                        <div className='line'></div>
                        <div className='line'></div>
                    </div>
                </footer>
            )}
        </>
    );
};

export default Footer;
