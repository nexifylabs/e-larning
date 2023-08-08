import React, { useState, useEffect } from 'react';
import controls from '@/utils/RTEControl';
import dynamic from 'next/dynamic';
const RichTextEditor = dynamic(() => import('@mantine/rte'), {
    ssr: false,
    loading: () => null,
});
import axios from 'axios';
import { parseCookies } from 'nookies';
import baseUrl from '@/utils/baseUrl';
import LoadingSpinner from '@/utils/LoadingSpinner';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

const INITIAL_VALUE = {
    title: '',
    slug: '',
    price: 0.0,
    image: '',
    duration: '',
    instructor: '',
    type: '',
    perks: '',
};

const SubscriptionCreateForm = ({ btnText, is_class }) => {
    const { elarniv_users_token } = parseCookies();
    const [subscription, setSubscription] = useState(INITIAL_VALUE);
    const [disabled, setDisabled] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [imagePreview, setImagePreview] = React.useState('');
    const router = useRouter();

    useEffect(() => {
        const isSubscription = Object.values(subscription).every((el) =>
            Boolean(el)
        );
        isSubscription ? setDisabled(false) : setDisabled(true);
    }, [subscription]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'image') {
            const image = files[0].size / 1024 / 1024;
            if (image > 2) {
                toast.error(
                    'The photo size greater than 2 MB. Make sure less than 2 MB.',
                    {
                        style: {
                            border: '1px solid #ff0033',
                            padding: '16px',
                            color: '#ff0033',
                        },
                        iconTheme: {
                            primary: '#ff0033',
                            secondary: '#FFFAEE',
                        },
                    }
                );
                e.target.value = null;
                return;
            }
            setSubscription((prevState) => ({
                ...prevState,
                image: files[0],
            }));
            setImagePreview(window.URL.createObjectURL(files[0]));
        } else {
            setSubscription((prevState) => ({ ...prevState, [name]: value }));
        }
    };

    const handleImageUpload = async () => {
        const data = new FormData();
        data.append('file', subscription.image);
        data.append('upload_preset', process.env.UPLOAD_PRESETS);
        data.append('cloud_name', process.env.CLOUD_NAME);
        let response;
        if (subscription.image) {
            response = await axios.post(process.env.CLOUDINARY_URL, data);
        }
        const imageUrl = response.data.url;

        return imageUrl;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let photo;
            if (subscription.image) {
                photo = await handleImageUpload();

                photo = photo.replace(/^http:\/\//i, 'https://');
            }

            const {
                title,
                short_desc,
                overview,
                latest_price,
                before_price,
                lessons,
                duration,
                image,
                access_time,
                requirements,
                what_you_will_learn,
                who_is_this_course_for,
                catId,
            } = subscription;
            const payloadData = {
                title,
                short_desc,
                overview,
                latest_price,
                before_price,
                lessons,
                duration,
                image: photo,
                access_time,
                requirements,
                what_you_will_learn,
                who_is_this_course_for,
                catId,
                is_class,
            };

            const payloadHeader = {
                headers: { Authorization: elarniv_users_token },
            };

            const url = `${baseUrl}/api/subscriptions`;
            const response = await axios.post(url, payloadData, payloadHeader);
            setLoading(false);

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

            if (is_class) {
                router.push(`/instructor/courses`);
            } else {
                router.push(
                    `/instructor/course/upload/${response.data.course.id}`
                );
            }
        } catch (err) {
            console.error(err);
            let message = err.response?.data?.message;
            if (message) {
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
            } else {
                toast.error('An error occurred.', {
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
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='row'>
                <div className='col-md-6'>
                    <div className='form-group'>
                        <label className='form-label fw-semibold'>
                            Subscription Title
                        </label>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Subscription Title'
                            name='title'
                            value={subscription.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label className='form-label fw-semibold'>
                            Subscription Slug
                        </label>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Slug'
                            name='slug'
                            value={subscription.slug}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='form-group'>
                        <label className='form-label fw-semibold'>
                            Subscription Price
                        </label>
                        <input
                            type='number'
                            className='form-control'
                            placeholder='0.0'
                            name='price'
                            value={subscription.price}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label className='form-label fw-semibold'>
                            Subscription Image
                        </label>
                        <input
                            type='file'
                            className='form-control file-control'
                            name='image'
                            onChange={handleChange}
                            required={true}
                        />
                        <div className='form-text'>
                            Upload image size 750x500!
                        </div>

                        <div className='mt-2'>
                            <img
                                src={
                                    imagePreview
                                        ? imagePreview
                                        : '/images/courses/courses15.jpg'
                                }
                                alt='image'
                                className='img-thumbnail w-100px me-2'
                            />
                        </div>
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='form-group'>
                        <label className='form-label fw-semibold'>
                            Subscription Duration
                        </label>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Duration'
                            name='duration'
                            value={subscription.duration}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label className='form-label fw-semibold'>
                            Instructor
                        </label>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Instructor'
                            name='instructor'
                            value={subscription.instructor}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='form-group'>
                        <label className='form-label fw-semibold'>
                            Subscription Type
                        </label>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Type'
                            name='type'
                            value={subscription.type}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label className='form-label fw-semibold'>
                            Subscription Perks
                        </label>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Perks'
                            name='perks'
                            value={subscription.perks}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className='col-12'>
                    <button type='submit' className='default-btn'>
                        {btnText || 'Create Subscription'} <span></span>
                        {loading ? <LoadingSpinner /> : ''}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default SubscriptionCreateForm;
