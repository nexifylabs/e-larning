import React, { useState } from 'react';
import Navbar from '@/components/_App/Navbar';
import Footer from '@/components/_App/Footer';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoadingSpinner from '@/utils/LoadingSpinner';
import { useRouter } from 'next/router';
import baseUrl from '@/utils/baseUrl';
import styles from './ProfileSettings.module.css';
import SupportButton from '@/components/ContactUs/SupportBtn';
import TopBanner from '@/components/TopBanner/TopBanner';
import SubscribeForm from '@/components/Common/SubscribeForm';

const ChangePassword = ({ user }) => {
    const { elarniv_users_token } = parseCookies();
    const [avatar, setAvatar] = useState(user);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleChange = (e, field) => {
        if (field === 'currentPassword') {
            setCurrentPassword(e.target.value);
        } else if (field === 'newPassword') {
            setNewPassword(e.target.value);
        } else if (field === 'confirmNewPassword') {
            setConfirmNewPassword(e.target.value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Validate new password and confirm new password
            if (newPassword !== confirmNewPassword) {
                toast.error(
                    'New password and confirm new password do not match.'
                );
                setLoading(false);
                return;
            }

            const url = `${baseUrl}/api/users/password-change`;
            const payload = {
                oldPw: currentPassword,
                password1: newPassword,
                password2: confirmNewPassword,
            };
            const response = await axios.put(url, payload, {
                headers: { Authorization: elarniv_users_token },
            });

            setLoading(false);
            toast.success(response.data.message);
            router.push('/');
        } catch (err) {
            let {
                response: {
                    data: { message },
                },
            } = err;
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SupportButton />

            <TopBanner />

            <Navbar user={user} />

            <div className={styles.container}>
                <div className='container'>
                    <h2 className='fw-bold mb-4' style={{ marginTop: '50px' }}>
                        Profile & Settings
                    </h2>

                    <ul className='nav-style1'>
                        <li>
                            <Link href='/profile/basic-information'>
                                <a>Profile</a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/profile/photo'>
                                <a>Profile Picture</a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/profile/change-password'>
                                <a className='active'>Change Password</a>
                            </Link>
                        </li>
                    </ul>

                    <div className={styles.basicProfileInformationForm}>
                        <div className='w-full md:w-1/2 mx-auto'>
                            <h2 className='text-2xl font-semibold mb-5'>
                                Change Password
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className='mb-4'>
                                    <label
                                        htmlFor='currentPassword'
                                        className='form-label fw-semibold'
                                    >
                                        Current Password
                                    </label>
                                    <input
                                        type='password'
                                        id='currentPassword'
                                        value={currentPassword}
                                        onChange={(e) =>
                                            handleChange(e, 'currentPassword')
                                        }
                                        className='form-control'
                                        style={{ maxWidth: '300px' }}
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label
                                        htmlFor='newPassword'
                                        className='form-label fw-semibold'
                                    >
                                        New Password
                                    </label>
                                    <input
                                        type='password'
                                        id='newPassword'
                                        value={newPassword}
                                        onChange={(e) =>
                                            handleChange(e, 'newPassword')
                                        }
                                        className='form-control'
                                        style={{ maxWidth: '300px' }}
                                    />
                                </div>
                                <div className='mb-6'>
                                    <label
                                        htmlFor='confirmNewPassword'
                                        className='form-label fw-semibold'
                                    >
                                        Confirm New Password
                                    </label>
                                    <input
                                        type='password'
                                        id='confirmNewPassword'
                                        value={confirmNewPassword}
                                        onChange={(e) =>
                                            handleChange(
                                                e,
                                                'confirmNewPassword'
                                            )
                                        }
                                        className='form-control'
                                        style={{ maxWidth: '300px' }}
                                    />
                                </div>
                                <button
                                    type='submit'
                                    disabled={loading}
                                    className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                                    style={{
                                        marginTop: '50px',
                                        marginBottom: '50px',
                                        background: '#CE417D',
                                    }}
                                >
                                    {loading ? (
                                        <LoadingSpinner />
                                    ) : (
                                        'Change Password'
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <SubscribeForm />

            <Footer />
        </>
    );
};

export default ChangePassword;
