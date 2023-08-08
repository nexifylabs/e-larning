import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '@/utils/baseUrl';
import { parseCookies } from 'nookies';

const BannerRow = ({
    id,
    code,
    discount,
    active_for_full_site,
    onDelete,
    onCheck,
    isNavBar,
}) => {
    const [isHome, setIsHome] = useState(isNavBar);

    function setHomeDiscountBanner(id) {
        const { elarniv_users_token } = parseCookies();

        axios
            .put(
                `${baseUrl}/api/banners/set-home`,
                {
                    bannerId: id,
                },
                {
                    headers: { Authorization: elarniv_users_token },
                }
            )
            .then((json) => {
                console.log('done');

                setIsHome(json.data.isHome);
            })
            .catch((err) => console.log(err.message));
    }

    useEffect(() => {}, [isHome]);

    return (
        <tr>
            <td>{code}</td>

            <td>
                <button
                    onClick={() => onDelete(id)}
                    type='button'
                    className='btn btn-sm fs-12'
                >
                    Delete
                </button>
            </td>
            <td>
                <button
                    disabled={isHome}
                    onClick={() => setHomeDiscountBanner(id)}
                    type='button'
                    className='btn btn-sm fs-12'
                >
                    {isHome ? 'Home' : 'Set Home'}
                </button>
            </td>
        </tr>
    );
};

export default BannerRow;
