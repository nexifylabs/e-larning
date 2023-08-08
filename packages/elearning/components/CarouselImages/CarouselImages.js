import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CarouselImages = () => {
    return (
        <>
            <Carousel className='carousel-settings'>
                <img
                    src='/images/carousel/sorvete-aboutus_1.webp'
                    alt='Escola Sorvete'
                    className='payment-field-border'
                    style={{ borderRadius: '10px' }}
                />
                <img
                    src='/images/carousel/imgcarousel2.webp'
                    alt='Escola Sorvete'
                    className='payment-field-border'
                    style={{ borderRadius: '10px' }}
                />
                <img
                    src='/images/carousel/imgcarousel3.webp'
                    alt='Escola Sorvete'
                    className='payment-field-border'
                    style={{ borderRadius: '10px' }}
                />
                <img
                    src='/images/carousel/imgcarousel4.webp'
                    alt='Escola Sorvete'
                    className='payment-field-border'
                    style={{ borderRadius: '10px' }}
                />
                <img
                    src='/images/carousel/imgcarousel5.webp'
                    alt='Escola Sorvete'
                    className='payment-field-border'
                    style={{ borderRadius: '10px' }}
                />
            </Carousel>
        </>
    );
};

export default CarouselImages;
