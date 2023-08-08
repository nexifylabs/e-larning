import React, {useEffect, useState} from 'react';
import LoadingSpinner from '@/utils/LoadingSpinner';
import axios from 'axios';
import {useRouter} from 'next/router';
import {useDispatch, useSelector} from 'react-redux';
import {calculateCartTotal} from '@/utils/calculateCartTotal';
import baseUrl from 'utils/baseUrl.js';

import {v4 as uuidv4} from "uuid";


const PlaceOrderBtn = ({user, cartItems, disabled, inner, btnColor}) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const {purchase} = useSelector(state => state.cart)
    const router = useRouter();


    const fetchAccessToken = async () => {

        const script1 = document.getElementById('script-getnet');
        if (script1) {
            script1.remove()
        }

        const formData = new URLSearchParams();
        formData.append('scope', 'oob')
        formData.append('grant_type', 'client_credentials')

        const data = (await axios.post(`${process.env.GETNET_CHECKOUT_ENDPOINT}`,
            formData.toString()
            , {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': process.env.BASIC_AUTH_GETNET
                }
            }
        )).data

        try {

            const script1 = document.getElementById('script-getnet');
            if (script1) {
                script1.remove()
            }

            const {cartTotal} = calculateCartTotal(cartItems)

            const getnetItems = cartItems.map(e => {

                return {
                    "name": e.title,
                    "description": e.slug,
                    "value": e.price,
                    "quantity": 1,
                    "id": e.id,
                    "sku": "",
                    "image": e.image,
                    "instructor": e.instructor,
                    "type": e.type && e.type
                }
            })

            // console.log(user)

            const token = uuidv4();


            const script2 = document.getElementById('script-getnet');
            if (script2) {
                script2.remove()
            }


            const script = document.createElement('script');
            script.src = 'https://checkout.getnet.com.br/loader.js';
            script.async = true;
            script.id = "script-getnet"
            script.dataset.getnetSellerid = '39ee6be0-a7fb-43b7-b799-5f45d8d87bdd';
            // script.dataset.getnetSellerid = '38cf0122-9285-4645-9e1e-a8ffa4f89cb2';
            script.dataset.getnetToken = `${data.token_type} ${data.access_token}`
            script.dataset.getnetAmount = cartTotal;
            script.dataset.getnetOrderid = token;
            script.dataset.getnetPaymentMethodsDisabled = '["credito-autenticado", "debito-autenticado", "pix", "boleto", "qr-code"]';
            script.dataset.getnetButtonClass = 'pay-button-getnet';
            script.dataset.getnetInstallments = '12';
            script.dataset.getnetCustomerid = user && user.id;
            script.dataset.getnetCustomerFirstName = user && user.first_name;
            script.dataset.getnetCustomerLastName = user && user.last_name;
            script.dataset.getnetCustomerEmail = user && user.email;
            script.dataset.getnetItems = JSON.stringify(getnetItems);
            script.dataset.getnetUrlCallback = `${baseUrl}/api/purchases/update?orderId=${token}`;
            script.dataset.getnetPreAuthorizationCredit = '';

            // script.onload = () => {
            //     const checkoutElements = window.checkoutElements.init('overlayCheckout');
            //     checkoutElements.attach('.pay-button-getnet');
            // }

            document.body.appendChild(script);
        } catch (err) {
            // console.log(err)
        }


    }


    useEffect(() => {

        const script = document.getElementById('script-getnet');
        if (script) {
            script.remove()
        }


        fetchAccessToken()
            .then(e => {
                // console.log(e)
            })
            .catch(err => {
                // console.log(err)
            })
    }, [])

    useEffect(() => {

        const script = document.getElementById('script-getnet');
        if (script) {
            script.remove()
        }

        setLoading(true)

        setTimeout(() => {

            setLoading(false)

        }, 6000)

    }, [])

    const handleSubmit = () => {

        // console.log(purchase)

        purchase["paymentType"] = 'get-net credito/debito'

        dispatch({
            type: "PURCHASE_SEND",
            data: purchase
        })
    }

    return (
        <div>
            <button onClick={handleSubmit} disabled={loading ? true : disabled}
                    className={`default-btn-style-${btnColor} d-block w-100 mt-3 pay-button-getnet`}>
                {inner} <span></span> {loading && <LoadingSpinner/>}
            </button>
        </div>
    );
};

export default PlaceOrderBtn;
