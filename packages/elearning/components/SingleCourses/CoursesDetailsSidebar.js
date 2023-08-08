import React, { useEffect, useState } from 'react';
import StickyBox from 'react-sticky-box';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import toast from 'react-hot-toast';
import baseUrl from '@/utils/baseUrl';
import axios from 'axios';
import { useRouter } from 'next/router';
import SocialShareBtns from './SocialShareBtns';
import { calculateDiscount } from '@/utils/helper';
import { useTranslation } from 'next-i18next';
import BuyCourseBtn from './BuyCourseBtn';

const CoursesDetailsSidebar = ({ current_user, course, onCoupon }) => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const discount = useSelector((state) => state.cart.discount);
    const dispatch = useDispatch();
    const [add, setAdd] = useState(false);
    const [alreadyBuy, setAlreadyBuy] = useState(false);
    const router = useRouter();
    const [apply, setApplyCoupon] = useState(false);
    const [coupon, setCoupon] = useState({ coupon: '' });

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

    const addToCart = (courseCart) => {
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
    };

    const handleCoupon = async (e) => {
        e.preventDefault();
        try {
            const payload = { coupon: coupon };

            const response = await axios.post(
                `${baseUrl}/api/coupons/get-coupon`,
                payload
            );

            dispatch({
                type: 'GET_DISCOUNT',
                data: calculateDiscount(
                    response.data.discount.discount,
                    course.latest_price
                ),
            });

            toast.success(response.data.message, {
                style: {
                    border: '1px solid #4BB543',
                    padding: '16px',
                    color: '#4BB543',
                },
                iconTheme: {
                    primary: '#4BB543',
                    secondary: '#FFFAEE',
                },
            });
        } catch (err) {
            let {
                response: {
                    data: { message },
                },
            } = err;
            toast.error(message, {
                style: {
                    border: '1px solid #ff0033',
                    padding: '16px',
                    color: '#ff0033',
                },
                iconTheme: {
                    primary: '#ff0033',
                    secondary: '#FFFAEE',
                },
            });
        }
    };

    return (
        <>
            {isMounted && (
                <StickyBox
                    className='sticky-box'
                    offsetTop={100}
                    offsetBottom={20}
                >
                    <div className='courses-sidebar-sticky'>
                        <div className='courses-sidebar-information'>
                            <ul className='info'>
                                <li>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <span>
                                            <i className='flaticon-play'></i>{' '}
                                            {t('course-page-liveclass', {
                                                defaultValue: 'Live Class',
                                            })}
                                        </span>
                                        {course.is_class ? (
                                            <div className='live-class-icon'></div>
                                        ) : (
                                            'No'
                                        )}
                                    </div>
                                </li>
                                <li>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <span>
                                            <i className='flaticon-teacher'></i>{' '}
                                            {t(
                                                'course-page-details-instructor',
                                                {
                                                    defaultValue: 'Instructor',
                                                }
                                            )}
                                        </span>
                                        {course.user && course.user.first_name}{' '}
                                        {course.user && course.user.last_name}
                                    </div>
                                </li>

                                <li>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <span>
                                            <i className='flaticon-distance-learning'></i>{' '}
                                            {t('course-page-details-lessons', {
                                                defaultValue: 'Lessons',
                                            })}
                                        </span>
                                        {course.lessons}
                                    </div>
                                </li>

                                {/* <li>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <span>
                                            <i className='flaticon-html'></i>{' '}
                                            {t('course-page-details-language', {
                                                defaultValue: 'Language',
                                            })}
                                        </span>
                                        English
                                    </div>
                                </li> */}

                                <li>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <span>
                                            <i className='flaticon-lock'></i>{' '}
                                            {t('course-page-details-access', {
                                                defaultValue: 'Access',
                                            })}
                                        </span>
                                        {course.access_time}
                                    </div>
                                </li>
                                <li>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <span>
                                            <i className='flaticon-certification'></i>{' '}
                                            {t(
                                                'course-page-details-certificate',
                                                {
                                                    defaultValue: 'Certificate',
                                                }
                                            )}
                                        </span>
                                        Yes
                                    </div>
                                </li>
                            </ul>

                            <div className='coupon'>
                                <h4 onClick={() => setApplyCoupon(!apply)}>
                                    {t('course-page-details-applycoupon', {
                                        defaultValue: 'Apply Coupon',
                                    })}
                                </h4>
                                {apply && (
                                    <form onSubmit={handleCoupon}>
                                        <input
                                            type='text'
                                            className='input-search'
                                            placeholder='Enter Coupon'
                                            name='search'
                                            value={coupon.coupon}
                                            onChange={(e) =>
                                                setCoupon(e.target.value)
                                            }
                                        />
                                        <button type='submit'>
                                            <b>
                                                {t(
                                                    'course-page-details-applybtn',
                                                    {
                                                        defaultValue: 'Apply',
                                                    }
                                                )}
                                            </b>
                                        </button>
                                    </form>
                                )}
                            </div>

                            <div className='btn-box'>
                                {alreadyBuy ? (
                                    <button
                                        onClick={() =>
                                            router.push('/learning/my-courses')
                                        }
                                        className='default-btn'
                                    >
                                        <i className='flaticon-shopping-cart'></i>{' '}
                                        {t(
                                            'course-page-details-viewmycourses',
                                            {
                                                defaultValue: 'View My Courses',
                                            }
                                        )}
                                        <span></span>
                                    </button>
                                ) : (
                                    <>
                                        {add ? (
                                            <Link href='/checkout'>
                                                <a className='default-btn'>
                                                    {' '}
                                                    {t(
                                                        'course-page-details-viewmycart',
                                                        {
                                                            defaultValue:
                                                                'View Cart',
                                                        }
                                                    )}
                                                </a>
                                            </Link>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        addToCart(course)
                                                    }
                                                    className='default-btn'
                                                    disabled={add}
                                                >
                                                    {' '}
                                                    <i className='flaticon-shopping-cart'></i>{' '}
                                                    {t(
                                                        'course-page-details-addtomycart',
                                                        {
                                                            defaultValue:
                                                                'Add to cart',
                                                        }
                                                    )}
                                                    <span></span>
                                                </button>
                                                <BuyCourseBtn
                                                    current_user={current_user}
                                                    course={course}
                                                />
                                            </>
                                        )}
                                    </>
                                )}
                            </div>

                            <SocialShareBtns />
                        </div>
                    </div>
                </StickyBox>
            )}
        </>
    );
};

export default CoursesDetailsSidebar;
