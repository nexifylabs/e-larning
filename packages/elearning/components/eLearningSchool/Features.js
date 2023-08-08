import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const Features = () => {
    const { t } = useTranslation();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <>
            {isMounted && (
                <div className='features-area pt-100 pb-70'>
                    <div className='container'>
                        <div className='section-title'>
                            <span className='sub-title'>
                                {t('features-subtitle', {
                                    defaultValue: 'Much more than ice cream',
                                })}
                            </span>
                            <h2>
                                {t('features-h2', {
                                    defaultValue:
                                        'Dynamic learning from wherever you are',
                                })}
                            </h2>
                            <p>
                                {t('features-text', {
                                    defaultValue:
                                        'Master the necessary tools to become a successful entrepreneur',
                                })}
                            </p>
                        </div>

                        <div className='row justify-content-center'>
                            <div className='col-lg-4 col-sm-6 col-md-6'>
                                <div className='single-features-box'>
                                    <div className='icon'>
                                        <i className='flaticon-brain-process'></i>
                                    </div>
                                    <h3>
                                        {t('features-box-title', {
                                            defaultValue: 'Mindset change',
                                        })}
                                    </h3>
                                    <p>
                                        {t('features-box-text', {
                                            defaultValue:
                                                'The shortest path is not always the easiest, we will teach you this and other golden rules of the ice cream shop',
                                        })}
                                    </p>
                                </div>
                            </div>

                            <div className='col-lg-4 col-sm-6 col-md-6'>
                                <div className='single-features-box'>
                                    <div className='icon'>
                                        <i className='flaticon-computer'></i>
                                    </div>
                                    <h3>
                                        {t('features-box-title2', {
                                            defaultValue:
                                                'Learn at your own pace',
                                        })}
                                    </h3>
                                    <p>
                                        {t('features-box-text2', {
                                            defaultValue:
                                                'Study your way on any device',
                                        })}
                                    </p>
                                </div>
                            </div>

                            <div className='col-lg-4 col-sm-6 col-md-6'>
                                <div className='single-features-box'>
                                    <div className='icon'>
                                        <i className='flaticon-shield-1'></i>
                                    </div>
                                    <h3>
                                        {t('features-box-title3', {
                                            defaultValue:
                                                'Learn from those who are in the market',
                                        })}
                                    </h3>
                                    <p>
                                        {t('features-box-text3', {
                                            defaultValue:
                                                'Your journey will be guided by someone who has been in the ice cream and education market for more than 20 years',
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Features;
