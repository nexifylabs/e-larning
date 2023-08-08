import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const ShortingDropdown = () => {
    const [short, setShort] = useState('');
    const router = useRouter();

    const { t } = useTranslation();
    const [isMounted, setIsMounted] = React.useState(false);

    useEffect(() => {
        const query = router.query;
        router.push({
            pathname: '/courses',
            query: { ...query, short: short },
        });
    }, [short]);

    return (
        <>
            {isMounted && (
                <div className='elearniv-grid-sorting row align-items-center mb-5'>
                    <div className='col-lg-4 col-md-6 ordering'>
                        <div className='select-box'>
                            <select
                                className='form-select'
                                name='short'
                                value={short}
                                onChange={(e) => setShort(e.target.value)}
                            >
                                <option value=''>
                                    {t('shorting-one', {
                                        defaultValue: 'Sort By',
                                    })}
                                </option>
                                <option value='ASC'>
                                    {t('shorting-two', {
                                        defaultValue: 'Price: low to high',
                                    })}
                                </option>
                                <option value='DESC'>
                                    {t('shorting-three', {
                                        defaultValue: 'Price: high to low',
                                    })}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ShortingDropdown;
