import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { parseCookies } from 'nookies';
import GeneralLoader from '@/utils/GeneralLoader';
import ManageRaw from '@/components/Admin/ManageRaw';
import axios from 'axios';
import baseUrl from '@/utils/baseUrl';
import toast from "react-hot-toast";

const SearchUser = () => {
    const [search, setSearch] = useState('');
    const router = useRouter();
    const { t } = useTranslation();
    const [isMounted, setIsMounted] = useState(false);

    const { elarniv_users_token } = parseCookies();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${baseUrl}/api/students`);
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

    const handleAdmin = async (userId) => {
        try {
            const payload = {
                headers: { Authorization: elarniv_users_token },
            };

            const payloadData = { userId, admin: true };
            const response = await axios.put(
                `${baseUrl}/api/admin/make-admin`,
                payloadData,
                payload
            );
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
            fetchData();
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
            fetchData();
        }
    };

    const filterUsers = (users, search) => {
        if (!search) {
            return users;
        }

        const lowercaseSearch = search.toLowerCase();
        return users.filter((user) => {
            const { name, email, phone } = user;
            return (
                (name ? name.toLowerCase().includes(lowercaseSearch) : false) ||
                (email
                    ? email.toLowerCase().includes(lowercaseSearch)
                    : false) ||
                (phone ? phone.toLowerCase().includes(lowercaseSearch) : false)
            );
        });
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.get(
                `${baseUrl}/api/students?search=${search}`
            );
            setUsers(response.data.students);
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
            setLoading(false);
        }
    };
    return (
        <>
            {isMounted && (
                <div>
                    <form className='search-box' onSubmit={handleSearch}>
                        <input
                            type='text'
                            className='input-search'
                            placeholder={t('search-user-students', {
                                defaultValue: 'Search Students',
                            })}
                            name='search'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                border: '2px solid #ccc',
                                borderRadius: '5px',
                                padding: '10px 20px',
                                fontSize: '16px',
                                width: '30%',
                                boxSizing: 'border-box',
                            }}
                        />

                        <button
                            type='submit'
                            style={{
                                backgroundColor: '#CE4F88',
                                border: 'none',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                marginLeft: '10px',
                                cursor: 'pointer',
                            }}
                        >
                            <i className='flaticon-search'></i>
                        </button>
                    </form>
                    <hr className='payment-field-border' />
                    {loading ? (
                        <GeneralLoader />
                    ) : (
                        <div className='table-responsive'>
                            <table style={{marginBottom: '20%'}} className='table align-middle table-hover fs-14'>
                                <thead>
                                    <tr>
                                        <th scope='col'>Name</th>
                                        <th scope='col'>Email</th>
                                        <th scope='col'>Phone</th>
                                        <th scope='col'>Email Confirmed</th>
                                        {/* <th scope='col'>Text</th> */}
                                        <th scope='col'>Planos</th>
                                        <th scope='col'>Cursos</th>
                                        <th scope='col'>Submit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length > 0 ? (
                                        filterUsers(users, search).map(
                                            (user) => (
                                                <ManageRaw
                                                    key={user.id}
                                                    {...user}
                                                />
                                            )
                                        )
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan='7'
                                                className='text-center py-3'
                                            >
                                                Empty!
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default SearchUser;
