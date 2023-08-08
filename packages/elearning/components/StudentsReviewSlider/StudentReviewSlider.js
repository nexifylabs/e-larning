import React from 'react';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import styles from './StudentReviewSlider.module.css';

SwiperCore.use([Pagination, Autoplay]);

const studentReviews = [
    {
        name: 'John Doe',
        review: 'This course is amazing! I learned so much in such a short time.',
    },
    {
        name: 'Jane Smith',
        review: 'The instructors are very knowledgeable and always willing to help.',
    },
    // Add more reviews here
];

const StudentReviewSlider = () => {
    return (
        <Swiper
            spaceBetween={30}
            centeredSlides
            slidesPerView={1}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            className='swiper'
        >
            {studentReviews.map((review, index) => (
                <SwiperSlide
                    key={index}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div className={styles.reviewContainer}>
                        <h3 className={styles.reviewName}>{review.name}</h3>
                        <p className={styles.reviewText}>{review.review}</p>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default StudentReviewSlider;
