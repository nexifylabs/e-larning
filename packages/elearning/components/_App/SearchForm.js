import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const SearchForm = () => {
    const [search, setSearch] = useState('');
    const router = useRouter();
    const { t } = useTranslation();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const query = router.query;
        router.push({
            pathname: '/courses',
            query: { ...query, search: search },
        });
    };
    return (
        <>
            {isMounted && (
                <form className='search-box' onSubmit={handleSearch}>
                    <input
                        type='text'
                        className='input-search'
                        placeholder={t('searchCourses', {
                            defaultValue: 'Search Course',
                        })}
                        name='search'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type='submit'>
                        <i className='flaticon-search'></i>
                    </button>
                </form>
            )}
        </>
    );
};

export default SearchForm;
