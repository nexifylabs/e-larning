import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Pricing} from 'react-pricing';
import styles from './SubscribePlanComponent.module.css';
import {useRouter} from 'next/router';
import {useTranslation} from 'next-i18next';
import axios from "axios";
import baseUrl from "@/utils/baseUrl";

const SubscribePlanComponent = () => {
    const {t} = useTranslation();
    const [isMounted, setIsMounted] = React.useState(false);
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const router = useRouter();
    const [subs, setSubs] = useState(null);

    let [yr, setYr] = useState({
        xpathResult1: '',
    })

    function fetchData() {
        axios.get(`${baseUrl}/api/subscriptions`)
            .then(res => {
                // setPerks(res.data.perks);
                // console.log(subs)
                const subs1 = res.data.subs
                const perks = res.data.perks

                subs1.forEach(sub => {
                    sub["perks"] = []
                    perks.forEach(perk => {
                        if (perk.subscriptionId === sub.id) {
                            sub.perks.push(perk)
                        }
                    })
                })

                // console.log(subs1)
                setSubs(subs1);

            })
            .catch(err => console.error('Error fetching data:', err))
    }

    useEffect(() => {

        fetchData();
        // Clean up function (optional)
        return () => {
            setSubs(null)
        };

    }, [])

    useEffect(() => {
        setIsMounted(true);

        setTimeout(() => {
            getElementsWithXPath()
        }, 1200);
// Check if the element was found


        setTimeout(() => {
            if (yr.xpathResult1.singleNodeValue) {
                // Access the element
                const element = yr.xpathResult1.singleNodeValue;
                const spans = Array.from(element.querySelectorAll('div span')).map(e => {
                    if (e.innerHTML === ' / yr') {
                        return e
                    }
                })

                for (const span of spans) {
                    if (span) {
                        span.innerHTML = '/x mès'
                    }
                }

            } else {
                console.log("Element not found.");
            }
        }, 1600)

    }, []);


    function getElementsWithXPath() {
        yr = {xpathResult1: document.evaluate("//*[@id=\"__next\"]/div[4]/div/div", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)}
    }

    const subscribePlan1 = (sub) => {

        console.log(sub)

        const planObj = {
            id: sub.id,
            title: sub.title,
            slug: sub.slug,
            price: sub.price,
            image: sub.image,
            duration: sub.duration,
            quantity: 1,
            hotmartId: 'bwwp449q',
            instructor: sub.instructor,
            discount: 0,
            type: sub.type,
        };

        dispatch({
            type: 'RESET_CART',
        });

        dispatch({
            type: 'ADD_TO_CART', data: planObj,
        });

        router.push('/checkout');
    };

    const alreadySubscribe = cartItems.some((item) => {
        return item.slug === 'subscription-plan';
    });

    return (<>
        {isMounted && (<div className={styles['main-component-background']}>
            <div className={styles.wrapper}>
                <h2>
                    {t('subcomponent-h2', {
                        defaultValue: 'Subscribe to our plans',
                    })}
                    <br/>
                </h2>
                <br/>

                {subs && <div className={styles['pricing-table']}>
                    {subs.map(sub => <Pricing
                            id='custom-pricing-component'
                            data={sub.perks}

                            price={sub.price / 12}
                            duration='ano'
                            background={sub.background}
                            shadow='#F5BCD7'
                            currency='R$'
                            buttonContent={alreadySubscribe ? (<a
                                onClick={() => router.push('/checkout')}
                            >
                                {t('subcomponent-already-subscribe', {
                                    defaultValue: 'View My Subscription',
                                })}
                            </a>) : (<a onClick={() => subscribePlan1(sub)}>
                                {t('subcomponent-subscribe-btn', {
                                    defaultValue: 'INSCREVER',
                                })}
                            </a>)}
                            priceText={``}
                            headerText={sub.slug}
                        />
                    )}
                </div>
                }
            </div>
        </div>)}
    </>);
};

export default SubscribePlanComponent;
