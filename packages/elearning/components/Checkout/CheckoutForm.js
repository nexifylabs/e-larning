import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    calculateCartTotal,
    calculateCartTotalMinus,
} from '@/utils/calculateCartTotal';
import CheckoutList from './CheckoutList';
import PlaceOrderBtn from './PlaceOrderBtn';
import Link from 'next/link';
import PlaceOrderBtnDisabled from '@/components/Checkout/PlaceOrderBtnDisabled';
import { useTranslation } from 'next-i18next';

const CheckoutForm = ({ user, isPaymentFormComplete }) => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const [cartAmout, setCartAmaount] = React.useState(0);
    const [cartAmoutMinus, setCartAmaountMinus] = React.useState(0);
    const [isMobile, setIsMobile] = React.useState(false);
    const { t } = useTranslation();
    const [isMounted, setIsMounted] = React.useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const { cartTotal } = calculateCartTotal(cartItems);
        const { cartTotalMinus } = calculateCartTotalMinus(cartItems);
        setCartAmaount(cartTotal);
        setCartAmaountMinus(cartTotalMinus);
    }, [cartItems]);

    const handleRemove = async (cartId) => {
        dispatch({
            type: 'REMOVE_CART',
            id: cartId,
        });
    };

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

    return (
        <>
            {isMounted && (
                <div
                    style={{
                        maxWidth: isMobile ? '100%' : '33%',
                        height: isMobile ? 'auto' : '100%',
                        display: 'flex',
                    }}
                    className='checkout-area ptb-100'
                >
                    <div className='container'>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignContent: 'center',
                            }}
                            className='row justify-content-center'
                        >
                            <div className='col-lg-9 col-md-12'>
                                <div className='shopping-cart'>
                                    <p>
                                        {cartItems.length}{' '}
                                        {t('checkout-form-coursecart', {
                                            defaultValue: 'Course in Cart',
                                        })}
                                    </p>

                                    <div className='shopping-cart-list'>
                                        <div className='row align-items-center'>
                                            {cartItems.length > 0 ? (
                                                cartItems.map((cart) => (
                                                    <CheckoutList
                                                        key={cart.id}
                                                        {...cart}
                                                        onRemove={() =>
                                                            handleRemove(
                                                                cart.id
                                                            )
                                                        }
                                                    />
                                                ))
                                            ) : (
                                                <>
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection:
                                                                'column',
                                                            justifyContent:
                                                                'center',
                                                            alignItems:
                                                                'center',
                                                            height: '100%',
                                                            width: '100%',
                                                        }}
                                                        className='col-lg-12 text-center'
                                                    >
                                                        <h3
                                                            style={{
                                                                textAlign:
                                                                    'center',
                                                                fontWeight:
                                                                    'bold',
                                                                color: '#0000001f',
                                                                fontSize:
                                                                    '50px',
                                                            }}
                                                        >
                                                            {t(
                                                                'checkout-form-empty',
                                                                {
                                                                    defaultValue:
                                                                        'Empty',
                                                                }
                                                            )}
                                                        </h3>
                                                        <Link href='/courses'>
                                                            <a className='default-btn'>
                                                                <i className='flaticon-shopping-cart'></i>
                                                                {t(
                                                                    'checkout-form-continueshopping',
                                                                    {
                                                                        defaultValue:
                                                                            'Continue Shopping',
                                                                    }
                                                                )}
                                                            </a>
                                                        </Link>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {cartItems.length > 0 && (
                                <div
                                    style={{
                                        // backgroundColor: "red",
                                        padding: '5px',
                                    }}
                                    className='col-lg-6 col-md-12'
                                >
                                    <p className='fs-18 mb-2'>Subtotal:</p>
                                    <h1 className='fw-bold'>
                                        ${cartAmout}
                                        {cartAmoutMinus > 0 && (
                                            <del className='d-block fs-18 text-muted mt-2'>
                                                ${cartAmoutMinus}
                                            </del>
                                        )}
                                    </h1>
                                    {isPaymentFormComplete ? (
                                        <PlaceOrderBtn
                                            user={user}
                                            cartItems={cartItems}
                                            disabled={false}
                                            inner={'Proceed to checkout'}
                                            btnColor={'3'}
                                        />
                                    ) : (
                                        <PlaceOrderBtnDisabled />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CheckoutForm;
