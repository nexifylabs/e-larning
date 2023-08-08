import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/_App/Navbar';
import Footer from '@/components/_App/Footer';
import AdminSideNav from '@/components/_App/AdminSideNav';
import axios from 'axios';
import baseUrl from '@/utils/baseUrl';
import LoadingSpinner from '@/utils/LoadingSpinner';
import toast from 'react-hot-toast';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import TopBanner from '@/components/TopBanner/TopBanner';

const create = ({ user }) => {
    const router = useRouter();
    const { elarniv_users_token } = parseCookies();
    const [banner, setBanner] = useState({ banner: '', discount: 0.1 });
    const [loading, setLoading] = React.useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBanner((prevState) => ({
            ...prevState,
            [name]: value.toUpperCase(),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const url = `${baseUrl}/api/banners/new`;
            const payload = {
                headers: { Authorization: elarniv_users_token },
            };
            const payloadData = { ...banner };
            const response = await axios.post(url, payloadData, payload);
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
            router.push('/admin/banners');
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
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <TopBanner />

            <Navbar user={user} />

            <div className='main-content'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-lg-3 col-md-4'>
                            <AdminSideNav user={user} />
                        </div>

                        <div className='col-lg-9 col-md-8'>
                            <div className='main-content-box'>
                                {/* Nav */}
                                <ul className='nav-style1'>
                                    <li>
                                        <Link href='/admin/banners/'>
                                            <a>Banners</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href='/admin/banners/create/'>
                                            <a className='active'>Create</a>
                                        </Link>
                                    </li>
                                </ul>

                                <form onSubmit={handleSubmit}>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label className='form-label fw-semibold'>
                                                    Text banner
                                                </label>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    name='banner'
                                                    value={banner.banner}
                                                    onChange={handleChange}
                                                    placeholder='Curso Sorvete 50%OFF!'
                                                />
                                            </div>
                                        </div>

                                        <div className='col-12'>
                                            <button
                                                type='submit'
                                                className='default-btn'
                                            >
                                                Save <span></span>
                                                {loading ? (
                                                    <LoadingSpinner />
                                                ) : (
                                                    ''
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default create;
