import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

const FranciscoComponent = () => {
    const { t } = useTranslation();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <>
            {isMounted && (
                <div className='about-area francisco-area ptb-100'>
                    <div className='container'>
                        <div className='video-container'>
                            <iframe
                                width='560'
                                height='315'
                                src='https://www.youtube.com/embed/WO-suAVDztk'
                                title='YouTube video player'
                                frameborder='0'
                                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                                allowfullscreen
                            ></iframe>
                        </div>
                        <hr
                            className='payment-field-border'
                            style={{
                                marginBottom: '70px',
                                marginTop: '70px',
                            }}
                        />
                        <div className='row align-items-center'>
                            <div className='col-lg-6 col-md-12'>
                                <div className='about-image'>
                                    <div className='image'>
                                        <img
                                            src='/images/Francisco-Santana.webp'
                                            alt='image'
                                            style={{
                                                borderRadius: '10px',
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='col-lg-6 col-md-12'>
                                <div className='about-content'>
                                    <span className='sub-title'>
                                        Francisco Santana
                                    </span>
                                    <h2>
                                        {t('francisco-h2', {
                                            defaultValue: 'His Story',
                                        })}
                                    </h2>
                                    <p>
                                        {t('francisco-text1', {
                                            defaultValue:
                                                'Born in São Paulo and raised in Cajamar, in the metropolitan region of São Paulo, Chef Glacier Francisco SantAna is a reference in Brazil when it comes to ice cream. Graduated from the National Superior School of Confectionery in France, he was the first Brazilian to receive the CAP - Certificat dAptitude Professionnelle en Pâtisserie title and the first foreign assistant of the institution, where he also taught classes. In Spain, he studied at the Sant Pol de Mar University School of Hospitality and Tourism.',
                                        })}
                                    </p>

                                    <p>
                                        {t('francisco-text2', {
                                            defaultValue:
                                                'With a background in Geography, the decision to change professions was made out of the pleasure of doing something he really enjoyed, becoming the respected Master Ice Cream Maker with an international reputation. He is a teacher not only in his own country but also in France, Spain, Argentina, and Italy.',
                                        })}
                                    </p>

                                    <p>
                                        {t('francisco-text3', {
                                            defaultValue:
                                                'SantAna makes a point of encouraging the flavors of Brazilian tropical fruits, as well as promoting the democratization of a quality product, without preservatives or chemicals. His motto? No powder, no paste, real ice cream.',
                                        })}
                                    </p>

                                    <p>
                                        {t('francisco-text4', {
                                            defaultValue:
                                                'Currently, he travels around Brazil and the world providing consultancy services in the professional ice cream industry, teaching courses for entrepreneurs at the Escola Sorvete, and is one of Callebauts ambassadors in Brazil.',
                                        })}
                                    </p>

                                    <p>
                                        {t('francisco-text5', {
                                            defaultValue:
                                                'He has taught courses and installed gelaterias and ice cream shops in more than 13 countries and in more than 12 Brazilian states.',
                                        })}
                                    </p>

                                    <div className='francisco-links'>
                                        <ul className='francisco-ullinks'>
                                            <li>
                                                <a
                                                    href='https://www.instagram.com/franciscosantanasorvete/'
                                                    className='d-block'
                                                    target='_blank'
                                                    rel='noreferrer'
                                                >
                                                    <i className='bx bxl-instagram'></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href='https://www.linkedin.com/in/francisco-santana-aa80a8138/'
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
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FranciscoComponent;
