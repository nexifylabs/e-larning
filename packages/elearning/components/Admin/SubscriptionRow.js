import React from 'react';
import Link from 'next/link';

const SubscriptionRow = ({
                       id,
                       title,
                       slug,
                       price,
                       instructor,
                       duration,
                       access_time,
                       // approved,
                       in_home_page,
                   }) => {
    return (
        <tr>
            <td>
                <Link href={"/learning/sub-form/"}>
                    <a>{title}</a>
                </Link>
            </td>
            <td>${price}</td>
            <td>{instructor}</td>
            <td>{duration}</td>
            <td>{access_time}</td>
        </tr>
    );
};

export default SubscriptionRow;
