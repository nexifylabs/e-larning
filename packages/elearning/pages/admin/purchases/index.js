import React, { useState, useEffect } from 'react';
import Navbar from '@/components/_App/Navbar';
import Footer from '@/components/_App/Footer';
import AdminSideNav from '@/components/_App/AdminSideNav';
import Link from 'next/link';
import toast from 'react-hot-toast';
import axios from 'axios';
import baseUrl from '@/utils/baseUrl';
import { parseCookies } from 'nookies';
import GeneralLoader from '@/utils/GeneralLoader';
import TopBanner from '@/components/TopBanner/TopBanner';
import SearchUser from '@/components/_App/SearchUser';
import SearchPurchase from "@/components/_App/SearchPurchase";

const Index = ({ user }) => {
    const { elarniv_users_token } = parseCookies();
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const payload = {
                headers: { Authorization: elarniv_users_token },
            };
            const response = await axios.get(
                `${baseUrl}/api/instructor/instructors`,
                payload
            );
            setInstructors(response.data.instructors);
            setLoading(false);
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

    useEffect(() => {
        fetchData();
    }, []);

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
                                <ul className='nav-style1'>
                                    <li>
                                        <Link href='/admin/manageusers/'>
                                            <a className='active'>Search</a>
                                        </Link>
                                    </li>
                                </ul>
                                {loading ? (
                                    <GeneralLoader />
                                ) : (
                                    <>
                                        <h1>Search Suscriber</h1>
                                        <SearchPurchase />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Index;
