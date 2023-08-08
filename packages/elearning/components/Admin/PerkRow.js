import React from 'react';
import Link from 'next/link';

const PerkRow = ({
                     id,
                     text,
                     subscriptionId,
                     value,
                     subscriptions
                 }) => {
    // console.log(subscriptions)

    return (
        <tr>
            <td>{subscriptions.length > 0 && subscriptions.find(sub => sub.id === subscriptionId).title}</td>
            <td>
                <Link href={"/learning/sub-form/"}>
                    <a>{text}</a>
                </Link>
            </td>
            <td>{value ? "Si" : "No"}</td>

        </tr>
    );
};

export default PerkRow;
