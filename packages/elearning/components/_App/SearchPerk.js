import React, {useEffect, useRef, useState} from 'react';
import {useRouter} from 'next/router';
import {useTranslation} from 'next-i18next';
import {parseCookies} from 'nookies';
import GeneralLoader from '@/utils/GeneralLoader';
import ManageRaw from '@/components/Admin/ManageRaw';
import axios from 'axios';
import baseUrl from '@/utils/baseUrl';
import toast from "react-hot-toast";

const SearchPerk = ({setPerks, subs, fetchData}) => {
    const [search, setSearch] = useState('');
    const {t} = useTranslation();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {

            if (!e.target[0].value) {
                return fetchData()
            }
            const subFound = subs.find(sub => sub.title.toLowerCase()
                .includes(e.target[0].value.toLowerCase())).id

            const response = await axios.get(
                `${baseUrl}/api/subscriptions/find-perks-by-sub?subscriptionId=${subFound}`
            );
            setPerks(response.data)

            setSearch("")

        } catch (err) {
            console.log(err)
            let {
                response: {
                    data: {message},
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
                <div>
                    <form className='search-box' onSubmit={handleSearch}>
                        <input
                            type='text'
                            className='input-search'
                            placeholder={t('Search', {
                                defaultValue: 'Search',
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
                    <hr className='payment-field-border'/>
                </div>
            )}
        </>
    );
};

export default SearchPerk;
