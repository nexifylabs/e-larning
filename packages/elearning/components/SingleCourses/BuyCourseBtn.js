import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import baseUrl from '@/utils/baseUrl';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const BuyCourseBtn = ({ current_user, course }) => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const discount = useSelector((state) => state.cart.discount);
    const dispatch = useDispatch();
    const [add, setAdd] = useState(false);
    const [alreadyBuy, setAlreadyBuy] = useState(false);
    const router = useRouter();

    const { t } = useTranslation();
    const [isMounted, setIsMounted] = React.useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const courseExist = cartItems.find((cart) => {

            return course.id === cart.id;

        });
        courseExist && setAdd(true);
        if (current_user && course && course.id) {
            const payload = {
                params: { userId: current_user.id, courseId: course.id },
            };
            const url = `${baseUrl}/api/courses/course/exist`;
            axios.get(url, payload).then((result) => {
                setAlreadyBuy(result.data.enroll);
            });
        }
    }, [cartItems, course]);

    const buyCourse = (courseCart) => {
        let courseObj = {};
        courseObj['id'] = courseCart.id;
        courseObj['title'] = courseCart.title;
        courseObj['slug'] = courseCart.slug;
        courseObj['price'] = discount > 0 ? discount : courseCart.latest_price;
        courseObj['regular_price'] = courseCart.before_price;
        courseObj['image'] = courseCart.image;
        courseObj['lessons'] = courseCart.lessons;
        courseObj['duration'] = courseCart.duration;
        courseObj['access_time'] = courseCart.access_time;
        courseObj['quantity'] = 1;
        courseObj['hotmartId'] = courseCart.hotmartId;

        courseObj[
            'instructor'
        ] = `${courseCart.user.first_name} ${courseCart.user.last_name}`;
        dispatch({
            type: 'ADD_TO_CART',
            data: courseObj,
        });
        router.push('/checkout');
    };

    return alreadyBuy ? (
        <>
            {isMounted && (
                <button
                    className='default-btn'
                    onClick={() => router.push('/checkout')}
                >
                    <i className='flaticon-user'></i>{' '}
                    {t('course-btn-view-my-couses', {
                        defaultValue: 'View My Courses',
                    })}{' '}
                    <span></span>
                </button>
            )}
        </>
    ) : (
        <>
            {isMounted && (
                <>
                    {add ? (
                        <button
                            onClick={() => router.push('/checkout')}
                            className='default-btn'
                        >
                            {t('course-btn-view-my-couses-view-cart', {
                                defaultValue: 'View Cart',
                            })}
                        </button>
                    ) : (
                        <button
                            className='default-btn'
                            onClick={() => {

                                buyCourse(course)
                            }}
                        >
                            <i className='flaticon-shopping-cart'></i>{' '}
                            {t('course-btn-view-my-couses-buycourse', {
                                defaultValue: 'Buy Course',
                            })}
                            <span></span>
                        </button>
                    )}
                </>
            )}
        </>
    );
};

export default BuyCourseBtn;
